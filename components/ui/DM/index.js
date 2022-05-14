export default function DM({
  main_text,
  label_1,
  label_2,
  label_3,
  dmState,
  account
}) {
  return (
    <div className="mt-12 relative text-base max-w-prose mx-auto lg:mt-0 lg:max-w-none">
      <div className="-mx-6 md:mx-auto relative bg-white rounded-lg shadow-lg">
        <div className="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
          <div className="w-full inline-flex">
            <img
              className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-indigo-300 "
              src={account?.profile_image_url_https}
              alt=""
            />
            <div className="pl-4">
              <h3 className="text-black text-xl font-bold">{account?.name}</h3>
              <p className="text-accents-2 text-sm">{`@${account?.screen_name}`}</p>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="w-full flex flex-wrap justify-center">
            <div className="mt-4">
              <span className="text-black text-sm font-semibold">
                {account?.name}
              </span>
              <span className="ml-2 text-accents-0 text-sm">{`@${account?.screen_name}`}</span>
            </div>
            <div className="px-2 md:px-12">
              <p className="text-black text-sm text-center">
                {account?.description}
              </p>
            </div>
            <div>
              <span className="text-black text-sm">
                <span className="font-semibold">{account?.friends_count}</span>{' '}
                <span>Following</span>
              </span>
              <span className="ml-4 text-black text-sm">
                <span className="font-semibold">
                  {account?.followers_count}
                </span>{' '}
                <span>Followers</span>
              </span>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="animate-fadeIn relative text-lg flex flex-wrap font-medium mt-8">
            <img
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-300 self-end"
              src={account?.profile_image_url_https}
              alt=""
            />
            <div className=" flex flex-nowrap  bg-accents-6 p-4 rounded-t-lg text-black font-normal w-3/4 ml-2">
              {main_text ? (
                main_text
              ) : (
                <p>
                  If you're interested in checking out some of my longer-form
                  content, I write a free newsletter each week. Check it out
                  below!
                  <br />
                  <br />
                  Btw if you need anything I'm happy to help.
                </p>
              )}
            </div>
            <div className="flex w-3/4 ml-14 justify-evenly md:ml-16 py-4 border-l-2 border-r-2 border-b-2">
              <div className="text-blue text-sm bg-white">
                {label_1 ? label_1 : 'Powered by PlzDM.me'}
              </div>
            </div>
            {label_2 && (
              <div className="flex w-3/4 ml-14 justify-evenly md:ml-16 py-4 border-l-2 border-r-2 border-b-2">
                <div className="text-blue text-sm bg-white">{label_2}</div>
              </div>
            )}
            <div className="flex w-3/4 ml-14 justify-evenly md:ml-16 py-4 border-l-2 border-r-2 border-b-2">
              <div className="text-blue text-sm bg-white">
                Powered by PlzDM.me
              </div>
            </div>
          </div>
        </div>
        {/* <div
          className={`relative flex items-center sm:items-start bg-gradient-to-r  rounded-b-lg not-italic py-5 px-6 sm:py-5 sm:pl-12 sm:pr-10 sm:mt-10 ${
            dmState === 'fail'
              ? 'from-pink to-red'
              : dmState === 'success'
              ? 'from-hover-3 to-green'
              : 'from-cyan to-blue'
          }`}
        >
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
        </div> */}
      </div>
    </div>
  );
}
