import cn from 'classnames';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { postData } from '../utils/helpers';
import { getStripe } from '../utils/initStripejs';
import { useUser } from './UserContext';
import Button from './ui/Button';
import Conversion from './ui/Conversion';
import TooMany from './ui/TooMany';
import FAQ from './ui/FAQ';
import localForage from 'localforage';

export default function UseCases({}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { session, userLoaded, subscription } = useUser();
  const [useCase, setUseCase] = useState('conversion');

  const handleCheckout = async (price) => {
    setLoading(true);
    if (!session) {
      router.push('/signin');
      return;
    }
    if (subscription.length) {
      router.push('/account');
      return;
    }

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

  return (
    <section id="pricing" className="bg-black">
      <div className="max-w-6xl mx-auto py-8 sm:py-36 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Create your first automated DM
          </h1>
          <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto">
            Pick a template to get started and become a DM power user.
          </p>
          <div className="relative self-center mt-6 bg-primary-2 rounded-lg p-0.5 flex flex-wrap md:flex-nowrap sm:mt-8 border border-accents-0">
            <button
              onClick={() => {
                setUseCase('conversion');
                localForage.setItem('useCase', 'conversion');
              }}
              type="button"
              className={`${
                useCase === 'conversion'
                  ? 'relative md:w-1/2 w-full  bg-accents-1 border-accents-0 shadow-sm text-white'
                  : 'md:ml-0.5 relative md:w-1/2 w-full border border-transparent text-accents-4'
              } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
            >
              More sales
            </button>
            <button
              onClick={() => {
                setUseCase('faq');
                localForage.setItem('useCase', 'faq');
              }}
              type="button"
              className={`${
                useCase === 'faq'
                  ? 'relative md:w-1/2 w-full bg-accents-1 border-accents-0 shadow-sm text-white'
                  : 'md:ml-0.5 relative md:w-1/2 w-full border border-transparent text-accents-4'
              } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
            >
              Same questions
            </button>
            <button
              onClick={() => {
                setUseCase('bankruptcy');
                localForage.setItem('useCase', 'bankruptcy');
              }}
              type="button"
              className={`${
                useCase === 'bankruptcy'
                  ? 'relative md:w-1/2 w-full bg-accents-1 border-accents-0 shadow-sm text-white'
                  : 'md:ml-0.5 relative md:w-1/2 w-full border border-transparent text-accents-4'
              } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-opacity-50 focus:z-10 sm:w-auto sm:px-8`}
            >
              Too many DMs
            </button>
          </div>
        </div>
        {useCase === 'conversion' && <Conversion />}
        {useCase === 'faq' && <FAQ />}
        {useCase === 'bankruptcy' && <TooMany />}
      </div>
    </section>
  );
}
