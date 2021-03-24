import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { postData } from '../../utils/helpers';
import { useUser } from '../../components/UserContext';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

export default function Messages() {
  const [loading, setLoading] = useState(false);
  const [dms, setDMs] = useState([]);
  const [rules, setRules] = useState([]);
  const [apps, setApps] = useState({});
  const router = useRouter();
  const {
    userLoaded,
    user,
    session,
    userDetails,
    subscription,
    twitterAccounts
  } = useUser();

  const loadDMs = async () => {
    setLoading(true);
    const { messages, rules, error } = await postData({
      url: '/api/twitter/welcome-messages',
      token: session.access_token
    });
    //if (error) return alert(error.message);
    setApps(messages?.apps);
    setDMs(messages?.welcome_messages || []);
    setRules(rules?.welcome_message_rules || []);
    setLoading(false);
  };

  const setNewDefaultWelcomeMessage = async (messageId) => {
    setLoading(true);
    const { rules, error } = await postData({
      url: `/api/twitter/welcome-messages/rules?messageId=${messageId}`,
      token: session.access_token
    });
    if (error) return alert(error.message);
    setLoading(false);
    setRules(rules?.welcome_message_rules);
  };
  const isDefaultWelcome = (messageId) => {
    return rules?.map((x) => x.welcome_message_id).includes(messageId);
  };
  useEffect(() => {
    if (userLoaded && !user) return router.replace('/signin');
  }, [userLoaded, user]);

  useEffect(() => {
    if (userLoaded && !user) return;
    if (session && dms?.length === 0) {
      loadDMs();
    }
  }, [userLoaded, session, user, dms]);

  useEffect(() => {
    if (!twitterAccounts) return;
  }, [twitterAccounts]);

  const userId = twitterAccounts[twitterAccounts.length - 1]?.twitter_user_id;

  return (
    <>
      <section className="bg-black mb-32">
        <div className="max-w-6xl mx-auto pt-8 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
              Your messages
            </h1>
            <p className="mt-5 text-xl text-accents-6 sm:text-center sm:text-2xl max-w-2xl m-auto">
              Create welcome messages below and become a DM super user.
            </p>
            <Button
              onClick={() => {
                router.push('/messages/new');
              }}
              className="max-w-sm m-auto mt-12"
              variant="slim"
              loading={loading}
            >
              {loading ? 'Loading' : 'Create a new message'}
            </Button>
          </div>
        </div>
        {dms?.map((dm) => (
          <div className={`pb-4 `}>
            {isDefaultWelcome(dm.id) && (
              <p className="max-w-3xl w-full rounded-md mx-auto -mb-8">
                Default welcome message
              </p>
            )}
            <Card
              className={`${isDefaultWelcome(dm.id) ? ' border-cyan' : ''}`}
              title={dm?.message_data?.text}
              description={`Created ${new Date(
                dm.created_timestamp * 1
              ).toDateString()}`}
              footer={
                <div className="flex items-start justify-between flex-col sm:flex-row sm:items-center">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-accents-7"
                    >
                      Link
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <div className="relative flex items-stretch flex-grow focus-within:z-10">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          {/* Heroicon name: solid/users */}

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          name="link"
                          id={`link-input-${dm.id}`}
                          value={`https://twitter.com/messages/compose?recipient_id=${userId}&welcome_message_id=${dm.id}`}
                          className="focus:ring-cyan focus:border-cyan block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-accents-3"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const copyText = document.getElementById(
                            `link-input-${dm.id}`
                          );
                          copyText.select();
                          copyText.setSelectionRange(
                            0,
                            99999
                          ); /* For mobile devices */

                          document.execCommand('copy');
                        }}
                        className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-accents-3 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-cyan focus:border-cyan"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                          <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                        </svg>
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      setNewDefaultWelcomeMessage(dm.id);
                    }}
                    className="mt-4"
                    variant="slim"
                    loading={loading}
                  >
                    Set as Default
                  </Button>
                  <a href={`/messages/${dm.id}`}>edit</a>
                </div>
              }
            >
              {dm?.message_data?.ctas?.map((cta, index) => (
                <div className="flex items-start justify-between flex-col sm:flex-row sm:items-center">
                  <Link
                    passHref
                    href={cta.url}
                    className=" sm:pb-0 hover:underline"
                  >
                    <a
                      className="pb-4 mt-4 sm:pb-0 hover:underline"
                      href={cta.url}
                    >
                      {`Link #${index + 1}: ${cta.label}`}
                    </a>
                  </Link>
                </div>
              ))}
            </Card>
          </div>
        ))}

        {/* <Card
            title="Your Plan"
            description={
              subscriptionName &&
              `You are currently on the ${subscriptionName} plan.`
            }
            footer={
              <div className="flex items-start justify-between flex-col sm:flex-row sm:items-center">
                <p className="pb-4 sm:pb-0">
                  Manage your subscription on Stripe.
                </p>
                <Button variant="slim" loading={loading}>
                  Button
                </Button>
              </div>
            }
          ></Card> */}
      </section>
    </>
  );
}
