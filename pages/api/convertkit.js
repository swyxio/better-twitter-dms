export default async function submitEmail(req, res) {
  try {
    const { email } = req.query;
    console.log('email', email);
    const formId = 2037043;
    const data = {
      api_key: process.env.CONVERTKIT_API_KEY,
      email
    };
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );
    return res.send(await response.json());
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
