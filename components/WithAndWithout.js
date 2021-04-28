import DM from './ui/DemoDM';

const messageOne = {
  status: 'sent',
  main_text:
    'Hi I really liked your podcast episode about good design practices for developers. What was the name of the book again??'
};

const messageTwo = {
  status: 'sent',
  main_text: 'Hello??? Anyone there???'
};

const messageThree = {
  status: 'recieved',
  main_text:
    'Hey sorry just now seeing this. Here is the URL: https://designbook.com'
};

const messageFour = {
  status: 'sent',
  main_text: 'Thanks (probably not buying now though, not interested anymore).'
};

const messageFive = {
  status: 'recieved',
  main_text: `Hey thanks for reaching out! I'm in the process of writing a design book for devs.`,
  label_1: 'One chapter free of DesignBook'
};

const messageSix = {
  status: 'sent',
  main_text: `Awesome! I was just going to ask you about this. I'll check it out`
};

export default function WithAndWithout() {
  return (
    <>
      <div className="pt-0 overflow-hidden lg:relative pb-8">
        <div className="mx-auto max-w-md px-4 justify-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid">
          <div className="mt-6 sm:max-w-2xl">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              Win more customers over with proactive DMs.
            </h2>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 lg:gap-12 justify-items-center flex-wrap">
        <div className="max-w-lg">
          <DM
            messages={[messageOne, messageTwo, messageThree, messageFour]}
            name="Potential Customer"
            handle="@YourCustomer72"
            bio="Hi I'm a potential customer who might buy your book depending on how you handle this DM."
            dmState="fail"
            footerText="You're losing out on potential customers because of delayed DM responses."
          />
        </div>
        <div className="max-w-lg">
          <DM
            messages={[messageFive, messageSix]}
            name="Potential Customer"
            handle="@YourCustomer72"
            bio="Hi I'm a potential customer who might buy your book depending on how you handle this DM."
            dmState="success"
            footerText="Proactively reach out to your followers when they start messaging you, all without lifting a finger."
          />
        </div>
        <div className="max-w-lg">{/* <DM dmState="success" /> */}</div>
      </div>
    </>
  );
}
