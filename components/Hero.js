import Button from '../components/ui/Button';
import { useRouter } from 'next/router';
import DM from '../components/ui/DM';
export default function Hero() {
  const router = useRouter();
  return (
    <div>
      <div className="pt-0 overflow-hidden sm:pt-12 lg:relative pb-24">
        <div className="mx-auto max-w-md px-4 justify-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid">
          <div>
            {/* <div className="hidden flex items-baseline  justify-center gap-2">
              <svg
                height="72"
                viewBox="0 0 32 32"
                fill="none"
                className=""
                xmlns="http://www.w3.org/2000/svg"
              >
                <svg x="12" y="12">
                  <path
                    fill="var(--cyan)"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    fill="var(--cyan)"
                    d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
                  />
                </svg>
              </svg>
              <h1 className="text-4xl text-accents-0 font-extrabold tracking-tight sm:text-5xl">
                PlzDM.me
              </h1>
            </div> */}
            <div className="mt-20">
              {/* <div>
                <a href="/" className="inline-flex space-x-4">
                  <span className="rounded bg-cyan px-2.5 py-1 text-xs font-semibold tracking-wide uppercase">
                    Launching soon
                  </span>
                  <span
                    className="hidden items-center text-sm font-medium  space-x-1 hover:underline"
                    style={{ textDecorationColor: '#22b8cf' }}
                  >
                    <span>Read more</span>
                    
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </a>
              </div> */}
              <div className="mt-6 sm:max-w-2xl">
                <div>
                  <a href="/signin" className="inline-flex space-x-4">
                    <span className="rounded bg-cyan px-2.5 py-1 text-xs font-semibold tracking-wide uppercase">
                      Get started for free
                    </span>
                    <span
                      className="hidden items-center text-sm font-medium  space-x-1 hover:underline"
                      style={{ textDecorationColor: '#22b8cf' }}
                    >
                      <span>Read more</span>

                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
                <h1 className="pt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  You are missing out on opportunities in your DMs.
                </h1>
                <p className="mt-6 text-xl text-accents-5">
                  You're overwhelmed by the number of your unread messages on
                  Twitter. And let's not even talk about the "Message requests"
                  tab. <br />
                  <br />
                  Do you close your DMs? Maybe — but then you will miss out on
                  the new connections and magic that comes from spontaneous
                  communication. <br />
                  <br /> DMs are a great way to stay in touch with your
                  audience, but you don't have enough time... at least with the
                  current UI.
                </p>
                <h2 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">
                  But what if you could automate sending DMs?
                </h2>
                <p className="mt-6 text-xl text-accents-5">
                  Never miss another conversation with a promising new startup
                  founder or leave an unhappy new customer without a response.
                  Automatically prompt your followers to convert into newsletter
                  subscribers or course customers.
                  <br />
                  <br /> You're right. The Twitter DM UX is horrible... but it
                  doesn't have to be. <br />
                  <br /> Stop feeling like a jerk for not responding. Use the
                  same tools Twitter built for big brands to take control of
                  your DMs.
                  <br />
                  <br />
                  Just open your DMs and set up a welcome message with plzdm.me.
                  Then you'll be making new connections with your Twitter
                  followers stress-free in no time.
                </p>
                <h2 className="mt-6 text-2xl font-extrabold text-white sm:text-3xl">
                  So what is a welcome message?
                </h2>
                <p className="mt-6 text-xl text-accents-5">
                  If a picture is worth a thousand words, a live demo must be
                  worth millions.
                </p>
                <br />
                {' 👉  '}
                <a
                  target="_blank"
                  className="pl-2 link font-bold underline hover:text-cyan text-xl"
                  href="/signup"
                >
                  Get started
                </a>
              </div>
              {/* <form action="#" className="mt-12 sm:max-w-lg sm:w-full sm:flex">
                <div className="mt-4 sm:mt-0 sm:ml-3">
                  <Button
                    variant="slim"
                    type="button"
                    onClick={() => {
                      router.push('/#pricing', '/#pricing', { shallow: true });
                    }}
                    className="mt-1 block w-full rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                  >
                    Get started
                  </Button>
                </div>
              </form> */}
              <div className="mt-6">
                <div className="inline-flex items-center divide-x divide-gray-300">
                  <div className="hidden flex-shrink-0  pr-5">
                    {/* Heroicon name: star */}
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {/* Heroicon name: star */}
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {/* Heroicon name: star */}
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {/* Heroicon name: star */}
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {/* Heroicon name: star */}
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div className="hidden min-w-0 flex-1 pl-5 py-1 text-sm text-gray-500 sm:py-3">
                    <span className="font-medium ">Rated 5 stars</span> by over{' '}
                    <span className="font-medium ">500 beta users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
          <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="hidden sm:block">
              <div className="absolute inset-y-0 left-1/2 w-screen bg-gradient-to-r from-cyan to-blue  rounded-l-3xl lg:left-80 lg:right-0 lg:w-full"></div>
              <svg
                className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
                width="404"
                height="392"
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      className="text-accents-2"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width="404"
                  height="392"
                  fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                />
              </svg>
            </div> 
            <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-xl lg:h-full lg:pl-12">
             
               <DM /> 
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
