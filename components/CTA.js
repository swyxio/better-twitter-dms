export default function Component(props) {
  return (
    <div>
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="bg-cyan  rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
            <div className="lg:self-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Ready to improve your DMs?</span>
                <span className="block">Start for free today.</span>
              </h2>
              <p className="mt-4 text-lg leading-6 ">
                Start with the free tier and create basic welcome messages. Then
                upgrade to our{' '}
                <a href="/pricing" className="underline">
                  paid plan
                </a>{' '}
                to create custom CTAs.
              </p>
              <a
                href="/signin"
                className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center font-medium text-accents-1 hover:text-black"
              >
                Automate your DMs for free
              </a>
            </div>
          </div>
          <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
            <img
              className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
              src="/plzdmme-screenshot.png"
              alt="App screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
