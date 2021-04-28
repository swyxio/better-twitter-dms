import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { postData } from '../utils/helpers';
import { useUser } from '../components/UserContext';
import LoadingDots from '../components/ui/LoadingDots';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import LogRocket from 'logrocket';

export default function Account() {
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const router = useRouter();
  const {
    userLoaded,
    user,
    session,
    userDetails,
    receipts,
    subscription,
    twitterAccounts
  } = useUser();

  useEffect(() => {
    if (userLoaded && !user)
      return router.replace(`/signin?path=${router.asPath}`);
  }, [userLoaded, user]);

  useEffect(() => {
    if (router?.query?.linked) {
      setShowConfetti(true);
    }
  }, [router.query]);

  useEffect(() => {
    if (userLoaded && user) {
      try {
        LogRocket.identify(user.id, {
          email: user.email,
          twitterAccounts,
          paid: subscription.length || false
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [userLoaded, user]);

  const redirectToCustomerPortal = async () => {
    setLoading(true);
    if (!subscription) {
      return router.push('/pricing');
    }
    const { url, error } = await postData({
      url: '/api/createPortalLink',
      token: session.access_token
    });
    if (error) return alert(error.message);
    window.location.assign(url);
    setLoading(false);
  };

  const redirectToTwitter = async () => {
    setLoading(true);
    const { url, error } = await postData({
      url: '/api/twitter',
      token: session.access_token
    });
    if (error) return alert(error.message);
    window.location.assign(url);
    setLoading(false);
  };
  console.log(subscription);
  const subscriptionName =
    subscription &&
    subscription.length &&
    subscription[subscription.length - 1]?.prices?.products?.name;

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(3800 / 100);

  const account = twitterAccounts.length
    ? twitterAccounts[twitterAccounts.length - 1]
    : {};
  return (
    <>
      {showConfetti && (
        <Confetti
          recycle={false}
          height={height}
          width={width}
          numberOfPieces={500 * Math.max(width / 2000, 1)}
          gravity={0.2}
          onConfettiComplete={() => {
            setShowConfetti(false);
            router.push('/messages');
          }}
          style={{ position: 'fixed' }}
        />
      )}
      <section className="bg-black mb-32">
        <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Getting started
            </h1>
            <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto">
              Link your Twitter account below to get started, then click "Create
              a welcome message".
            </p>
          </div>
        </div>
        <div className="p-4">
          <Card
            title="Connect your Twitter account"
            description={
              twitterAccounts.length
                ? `Your existing account`
                : `Add your Twitter account`
            }
            footer={
              <div className="flex items-start justify-between flex-col sm:flex-row sm:items-center">
                <p className="pb-4 sm:pb-0">
                  To link a new account, click the button below.
                </p>
                <Button
                  variant="slim"
                  loading={loading}
                  disabled={loading}
                  onClick={redirectToTwitter}
                >
                  Connect Twitter Account
                </Button>
              </div>
            }
          >
            <div className="text-xl mt-8 mb-4 font-semibold">
              {!userLoaded ? (
                <div className="h-12 mb-6">
                  <LoadingDots />
                </div>
              ) : account?.user_name ? (
                <ul>
                  <li className="">
                    {`${account.user_name}`}
                    <span className="italic text-sm ml-2">{` added ${new Date(
                      account.created_at
                    ).toDateString()}`}</span>
                  </li>
                </ul>
              ) : (
                <p>Please add your Twitter account</p>
              )}
            </div>
          </Card>

          {/* <Card
            title="Your Email"
            description=""
            footer={
              <p>This is the account you'll use to log in to plzdm.me.</p>
            }
          >
            <p className="text-xl mt-8 mb-4 font-semibold">
              {user ? user.email : undefined}
            </p>
          </Card> */}
          <Card
            title="Your Plan"
            description={`You are currently on the <b>${
              subscriptionName ? subscriptionName : 'Free'
            }</b> plan.`}
            // footer={
            //   <div className="flex items-start justify-between flex-col sm:flex-row sm:items-center">
            //     <p className="pb-4 sm:pb-0">Manage your payment on Stripe.</p>
            //     <Button
            //       variant="slim"
            //       loading={loading}
            //       disabled={loading}
            //       onClick={redirectToCustomerPortal}
            //     >
            //       {subscriptionName ? 'View invoice' : 'Upgrade to Pro'}
            //     </Button>
            //   </div>
            // }
          >
            <div className="text-xl mt-8 mb-4 font-semibold">
              {!userLoaded ? (
                <div className="h-12 mb-6">
                  <LoadingDots />
                </div>
              ) : subscriptionName && subscriptionPrice ? (
                <>
                  <p>{`${subscriptionPrice}/life`}</p>
                  {receipts?.length !== 0 && (
                    <div className="pt-8">Receipts</div>
                  )}
                  <ul>
                    {receipts.map((receipt) => (
                      <li className="list-disc list-inside">
                        <a href={receipt.receipt_url}>
                          {new Date(receipt.created).toDateString()}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <Link passHref href="/pricing">
                    <a className="underline mt-4">Upgrade to Pro</a>
                  </Link>{' '}
                  to enable custom links and remove "powered by plzdm.me".
                </>
              )}
            </div>
          </Card>
          <div className="sm:flex sm:flex-col sm:align-center">
            <Button
              onClick={() => {
                router.push('/messages');
              }}
              className="max-w-sm m-auto mt-12"
              variant="slim"
              loading={loading}
            >
              {loading ? 'Loading' : 'Create a welcome message'}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
