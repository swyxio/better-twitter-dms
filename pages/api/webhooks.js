import { stripe } from '../../utils/initStripe';
import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange,
  manageOneTimePayment,
  addReceiptToPurchase
} from '../../utils/useDatabase';

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false
  }
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'charge.succeeded'
]);

const webhookHandler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];
    const webhookSecret =
      process.env.STRIPE_WEBHOOK_SECRET_LIVE ??
      process.env.STRIPE_WEBHOOK_SECRET;
    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log('stripe event', event);

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case 'product.created':
          case 'product.updated':
            await upsertProductRecord(event.data.object);
            break;
          case 'price.created':
          case 'price.updated':
            await upsertPriceRecord(event.data.object);
            break;
          case 'customer.subscription.created':
          case 'customer.subscription.updated':
          case 'customer.subscription.deleted':
            await manageSubscriptionStatusChange(
              event.data.object.id,
              event.data.object.customer,
              event.type === 'customer.subscription.created'
            );
            break;
          case 'checkout.session.completed':
            const checkoutSession = event.data.object;
            if (checkoutSession.mode === 'subscription') {
              const subscriptionId = checkoutSession.subscription;
              await manageSubscriptionStatusChange(
                subscriptionId,
                checkoutSession.customer,
                true
              );
            }
            if (checkoutSession.mode === 'payment') {
              await manageOneTimePayment(
                event.data.object.id,
                checkoutSession.customer,
                true,
                event.created
              );
            }
            break;
          case 'charge.succeeded':
            const receipt_url = event.data.object.receipt_url;
            const customer = event.data.object.customer;
            const created = event.data.object.created;
            console.log(
              `adding receipt ${receipt_url} for ${customer} at ${created}`
            );
            await addReceiptToPurchase(receipt_url, created, customer);
            break;
          default:
            throw new Error('Unhandled relevant event!');
        }
      } catch (error) {
        console.log(error, event);
        return res.json({ error: 'Webhook handler failed. View logs.' });
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default webhookHandler;
