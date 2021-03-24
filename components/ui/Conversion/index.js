export default function Conversion(props) {
  return (
    <div className="py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 space-y-8 sm:px-6 lg:px-8">
        <div className="text-secondary max-w-prose mx-auto lg:max-w-none">
          <h2 className="text-secondary-2 font-semibold tracking-wide uppercase">
            More DMs, more conversions
          </h2>
          <p className="mt-2 text-3xl text-secondary-2 leading-8 font-extrabold tracking-tight  sm:text-4xl">
            Using DMs to power your growth
          </p>
        </div>
        <div className="relative z-10 text-base max-w-prose mx-auto lg:max-w-5xl lg:mx-0 lg:pr-72">
          <p className="text-lg">
            Do you write a paid newsletter, sell a course, or offer consulting
            services? If you spend time on Twitter, you're going to bump into
            potential customers. Convert your Twitter audience into buyers of
            your product.
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          <div className="relative z-10">
            <div className="prose prose-cyan mx-auto lg:max-w-none">
              <h3 className="text-2xl text-secondary-2 leading-8 font-extrabold tracking-tight  sm:text-3xl">
                Create an automated DM welcome message.
              </h3>
              <p className="pt-4">
                Stay in touch with your audience and let them know where they
                can go to hear more from you.
              </p>
            </div>
            <div className="mt-10 flex text-base max-w-prose mx-auto lg:max-w-none">
              <div className="rounded-md shadow">
                <a
                  href="/"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan hover:bg-hover-3"
                >
                  Use this template
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 relative text-base max-w-prose mx-auto lg:mt-0 lg:max-w-none">
            {/* <svg
              className="absolute top-0 right-0 -mt-20 -mr-20 lg:top-auto lg:right-auto lg:bottom-1/2 lg:left-1/2 lg:mt-0 lg:mr-0 xl:top-0 xl:right-0 xl:-mt-20 xl:-mr-20"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="bedc54bc-7371-44a2-a2bc-dc68d819ae60"
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
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="384"
                fill="url(#bedc54bc-7371-44a2-a2bc-dc68d819ae60)"
              />
            </svg> */}
            <div className="-mx-6 md:mx-auto relative bg-white rounded-lg shadow-lg">
              <div className="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
                <div className="w-full inline-flex">
                  <img
                    className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-indigo-300 "
                    src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=160&h=160&q=80"
                    alt=""
                  />
                  <div className="pl-4">
                    <h3 className="text-black text-xl font-bold">
                      Drew Bredvick
                    </h3>
                    <p className="text-accents-2 text-sm">@DBredvick</p>
                  </div>
                </div>
                <hr className="mt-4" />
                <div className="w-full flex flex-wrap justify-center">
                  <div className="mt-4">
                    <span className="text-black text-sm font-semibold">
                      Drew Bredvick
                    </span>
                    <span className="ml-2 text-accents-0 text-sm">
                      @DBredvick
                    </span>
                  </div>
                  <div className="px-2 md:px-24 lg:px-12">
                    <p className="text-black text-sm text-center">
                      Bootstrapping products as a solo-founder plzdm.me. Also
                      finance, early stage marketing, and a little bit of
                      javascript.
                    </p>
                  </div>
                  <div>
                    <span className="text-black text-sm">
                      <span className="font-semibold">402</span>{' '}
                      <span>Following</span>
                    </span>
                    <span className="ml-4 text-black text-sm">
                      <span className="font-semibold">749</span>{' '}
                      <span>Followers</span>
                    </span>
                  </div>
                </div>
                <hr className="mt-4" />
                <div className="animate-fadeIn relative text-lg flex flex-wrap font-medium mt-8">
                  <img
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-300 self-end"
                    src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=160&h=160&q=80"
                    alt=""
                  />
                  <div className=" flex flex-wrap relative bg-accents-6 p-4 rounded-t-lg text-black font-normal w-3/4 ml-2">
                    <p>
                      If you're interested in checking out some of my
                      longer-form content, I write a free newsletter each week.
                      Check it out below!
                      <br />
                      <br />
                      Btw if you need anything I'm happy to help.
                    </p>
                  </div>
                  <div className="flex w-3/4 ml-14 justify-evenly md:ml-16 py-4 border-l-2 border-r-2 border-b-2">
                    <div className="text-blue text-sm bg-white">
                      Sign up for my newsletter
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative flex items-center sm:items-start bg-gradient-to-r from-cyan to-blue rounded-b-lg not-italic py-5 px-6 sm:py-5 sm:pl-12 sm:pr-10 sm:mt-10">
                <span className="relative ml-4 text-indigo-300 font-semibold leading-6 sm:ml-24 sm:pl-1">
                  <p className="text-white font-semibold sm:inline">
                    Read more about Twitter{' '}
                    <a
                      className="underline"
                      href="https://blog.twitter.com/en_us/topics/product/2016/speed-up-customer-service-with-quick-replies-welcome-messages.html"
                    >
                      welcome messages
                    </a>
                    .
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
