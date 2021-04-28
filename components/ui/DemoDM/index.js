export default function DM({
  messages,
  dmState,
  name,
  handle,
  bio,
  footerText
}) {
  return (
    <div
      className={`mt-12 relative text-base max-w-prose  rounded-lg  mx-auto lg:mt-0 lg:max-w-none ${
        dmState === 'fail' ? 'ring-4 ring-red' : 'ring-4 ring-green'
      }`}
    >
      <div className="-mx-6 md:mx-auto relative bg-white rounded-lg shadow-lg">
        <div className="rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8">
          <div className="w-full inline-flex">
            <img
              className="w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-indigo-300 "
              src="https://drew.tech/drew-small-2.jpg"
              alt=""
            />
            <div className="pl-4">
              <h3 className="text-black text-xl font-bold">{name}</h3>
              <p className="text-accents-2 text-sm">{handle}</p>
            </div>
          </div>
          <hr className="mt-4" />
          <div className="w-full flex flex-wrap justify-center">
            <div className="mt-4">
              <span className="text-black text-sm font-semibold">{name}</span>
              <span className="ml-2 text-accents-0 text-sm">{handle}</span>
            </div>
            <div className="px-2 md:px-12">
              <p className="text-black text-sm text-center">{bio}</p>
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

          {messages.map(({ main_text, label_1, label_2, label_3, status }) => (
            <div className="animate-fadeIn relative text-lg flex flex-wrap font-medium mt-8">
              {status === 'sent' && (
                <>
                  <img
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-300 self-end"
                    src="https://drew.tech/drew-small-2.jpg"
                    alt=""
                  />
                  <div className=" flex flex-wrap relative bg-accents-6 p-4 rounded-t-lg text-black font-normal w-3/4 ml-2">
                    {main_text ? (
                      main_text
                    ) : (
                      <p>
                        If you're interested in checking out some of my
                        longer-form content, I write a free newsletter each
                        week. Check it out below!
                        <br />
                        <br />
                        Btw if you need anything I'm happy to help.
                      </p>
                    )}
                  </div>
                  {label_1 ? (
                    <div className="flex w-3/4 ml-14 justify-evenly md:ml-16 py-4 border-l-2 border-r-2 border-b-2">
                      <div className="text-blue text-sm bg-white">
                        {label_1 ? label_1 : 'Powered by PlzDM.me'}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              )}
              {status !== 'sent' && (
                <>
                  <div
                    style={{ backgroundColor: 'rgb(29, 161, 242)' }}
                    className={`flex flex-wrap relative p-4 text-white font-normal w-3/4 ml-8 float-right ${
                      label_1 ? 'rounded-t-lg' : 'rounded-lg'
                    }`}
                  >
                    {main_text ? (
                      main_text
                    ) : (
                      <p>
                        If you're interested in checking out some of my
                        longer-form content, I write a free newsletter each
                        week. Check it out below!
                        <br />
                        <br />
                        Btw if you need anything I'm happy to help.
                      </p>
                    )}
                  </div>
                  {label_1 ? (
                    <div className="flex w-3/4 ml-8 justify-evenly md:ml-8 py-4 border-l-2 border-r-2 border-b-2">
                      <div className="text-blue text-sm bg-white">
                        {label_1 ? label_1 : 'Powered by PlzDM.me'}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  <img
                    className="ml-2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-300 self-end"
                    src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.5&w=160&h=160&q=80"
                    alt=""
                  />
                </>
              )}
            </div>
          ))}
        </div>
        <div
          className={`relative flex justify-items-center justify-center items-center sm:items-start bg-gradient-to-r rounded-b-lg not-italic py-5  sm:py-5   sm:mt-10 ${
            dmState === 'fail'
              ? 'from-pink to-red'
              : dmState === 'success'
              ? 'from-hover-3 to-green'
              : 'from-cyan to-blue'
          }`}
        >
          <span className="relative mx-8 md:mx-12 text-indigo-300 font-semibold leading-6 ">
            <p className="text-white font-semibold sm:inline">{footerText}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
