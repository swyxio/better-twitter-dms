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

  /* This example requires Tailwind CSS v2.0+ */
  function Example() {
    return (
      <div className="bg-cyan-200 bg-opacity-25 md:mt-12">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <h2 className="max-w-md mx-auto text-3xl font-extrabold text-white text-center lg:max-w-xl lg:text-left">
              Want to grow your Twitter account? Check out our sponsors.
            </h2>
            <div className="flow-root self-center mt-8 lg:mt-0">
              <div className="-mt-4 -ml-8 flex flex-wrap justify-between lg:-ml-4">
                <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
                  <a
                    target="_blank"
                    href="https://gumroad.com/a/81433715/PBkrO"
                  >
                    <img
                      className="h-24"
                      alt="everyone can build a twitter audience course"
                      src="https://public-files.gumroad.com/variants/slwkx1ewx2vi38la1rlop81n8ukl/3298c3eb001bbed90f1d616da66708480096a0a1b6e81bd4f8a2d6e9b831d301"
                    />
                  </a>
                </div>
                {/* <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
                  <img
                    className="h-24"
                    src="https://ilo.so//static/hero.png"
                    alt="Workcation"
                  />
                </div>
                <div className="mt-4 ml-8 flex flex-grow flex-shrink-0 justify-center lg:flex-grow-0 lg:ml-4">
                  <img
                    className="h-12"
                    src="https://tailwindui.com/img/logos/workcation-logo-white.svg"
                    alt="Workcation"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="line-through text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Pricing Plans
          </h1>
          <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto">
            Plz DM Me is now a entirely <span className="font-bold">free</span>{' '}
            and <span className="font-bold">open-source</span> project thanks to
            the following sponsors.
          </p>
        </div>
        <Example />
        <div className="relative mb-72">
          <div className="absolute top-0 left-0 h-96 w-[542px] opacity-80 bg-black z-20 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2"></div>
          <div className="absolute z-10 mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-2">
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
      </div>
    </section>
  );
}
