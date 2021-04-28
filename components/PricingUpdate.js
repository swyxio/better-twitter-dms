import cn from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { postData } from '../utils/helpers';
import { getStripe } from '../utils/initStripejs';
import { useUser } from './UserContext';
import Button from './ui/Button';

var mixpanel = require('mixpanel-browser');
mixpanel.init('a9362ffc29e332f6d4476f4695482740');

export default function Pricing({ products, showBrands = true }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { session, userLoaded, subscription } = useUser();

  // products[1] = {
  //   id: 'free_plan',
  //   active: true,
  //   name: 'Free tier',
  //   description: 'Start out for free!',
  //   image: null,
  //   metadata: {},
  //   prices: [
  //     {
  //       id: 'free_plan',
  //       product_id: 'prod_J2sr8SpjuTXS2B',
  //       active: true,
  //       description: null,
  //       unit_amount: 0,
  //       currency: 'usd',
  //       type: 'one_time',
  //       interval: null,
  //       interval_count: null,
  //       trial_period_days: null,
  //       metadata: {}
  //     }
  //   ]
  // };

  const handleCheckout = async (price) => {
    setLoading(true);
    if (!session) {
      router.push('/signin');
      return;
    }
    if (subscription.length) {
      router.push('/messages');
      return;
    }

    if (price === 'free_plan') {
      mixpanel.track('Free plan signup click');
      router.push('/signup');
      return;
    }

    mixpanel.track('Pay plan signup click');

    const { sessionId, error: apiError } = await postData({
      url: '/api/createCheckoutSession',
      data: { price },
      token: session.access_token
    });
    if (apiError) {
      console.log(apiError);
      return alert(apiError.message);
    }
    const stripe = await getStripe();
    const { error: stripeError } = stripe.redirectToCheckout({ sessionId });
    if (stripeError) alert(`stripe error`, error.message);
    setLoading(false);
  };

  if (!products.length)
    return (
      <section className="bg-black">
        <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center"></div>
          <p className="text-6xl font-extrabold text-white sm:text-center sm:text-6xl">
            No subscription pricing plans found. Create them in your{' '}
            <a
              className="text-pink underline"
              href="https://dashboard.stripe.com/products"
              rel="noopener noreferrer"
              target="_blank"
            >
              Stripe Dashboard
            </a>
            .
          </p>
        </div>
      </section>
    );

  return (
    <section id="pricing" className="bg-black">
      <div className="max-w-6xl mx-auto py-8 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Pricing Plans
          </h1>
          <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto">
            Start for free, pay a one-time fee to unlock everything. Custom
            links are a paid feature.
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
          {products.map((product) => {
            console.log(product);
            const price = product.prices.find(
              (price) => price.type === 'one_time'
            );
            const priceString = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: price.currency,
              minimumFractionDigits: 0
            }).format(price.unit_amount / 100);
            return (
              <div
                key={product.id}
                className={cn(
                  'rounded-lg shadow-sm divide-y divide-accents-2 bg-primary-2',
                  {
                    'border border-cyan': subscription
                      ? product.name === subscription?.prices?.products.name
                      : product.name === 'Freelancer'
                  }
                )}
              >
                <div className="p-6">
                  <h2 className="text-2xl leading-6 font-semibold text-white">
                    {product.name}
                  </h2>
                  <p className="mt-4 text-accents-5">{product.description}</p>
                  <p className="mt-8">
                    <span className="text-5xl font-extrabold white">
                      {priceString}
                    </span>
                    <span className="text-base font-medium text-accents-8">
                      {' '}
                      {price.unit_amount === 0
                        ? 'No cost'
                        : 'one-time purchase'}
                    </span>
                  </p>
                  <Button
                    variant="slim"
                    type="button"
                    disabled={session && !userLoaded}
                    loading={loading}
                    onClick={() => handleCheckout(price.id)}
                    className="mt-8 block w-full rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                  >
                    {product.name === subscription?.prices?.products.name
                      ? 'Manage'
                      : price.unit_amount === 0
                      ? 'Get started '
                      : 'Purchase'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className={showBrands ? '' : 'hidden'}>
        <p className="mt-24 text-xs uppercase text-accents-3 text-center font-bold tracking-widest">
          Powered by
        </p>
        <div className="flex flex-col items-center my-12 space-y-4 sm:mt-8 sm:space-y-0 md:mx-auto md:max-w-2xl sm:grid sm:gap-6 sm:grid-cols-5">
          <div className="flex items-center justify-start">
            <a href="https://nextjs.org" aria-label="Next.js Link">
              <img
                src="/nextjs.svg"
                alt="Next.js Logo"
                className="h-12 text-primary"
              />
            </a>
          </div>
          <div className="flex items-center justify-start">
            <a href="https://vercel.com" aria-label="Vercel.com Link">
              <img
                src="/vercel.svg"
                alt="Vercel.com Logo"
                className="h-6 text-primary"
              />
            </a>
          </div>
          <div className="flex items-center justify-start">
            <a href="https://stripe.com" aria-label="stripe.com Link">
              <img
                src="/stripe.svg"
                alt="stripe.com Logo"
                className="h-12 text-primary"
              />
            </a>
          </div>
          <div className="flex items-center justify-start">
            <a href="https://supabase.io" aria-label="supabase.io Link">
              <img
                src="/supabase.svg"
                alt="supabase.io Logo"
                className="h-10 text-primary"
              />
            </a>
          </div>
          <div className="flex items-center justify-start">
            <a href="https://github.com" aria-label="github.com Link">
              <img
                src="/github.svg"
                alt="github.com Logo"
                className="h-8 text-primary"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
