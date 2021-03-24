const getURL = () => {
  const url =
    process?.env?.URL && process.env.URL !== ''
      ? process.env.URL
      : process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ''
      ? process.env.VERCEL_URL
      : 'http://localhost:3000';
  return url.includes('http') ? url : `https://${url}`;
};

const postData = ({ url, token, data = {} }) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    credentials: 'same-origin',
    body: JSON.stringify({ ...data, token })
  }).then((res) => res.json());

const toDateTime = (secs) => {
  var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

const getData = ({ url, token }) =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token
    },
    credentials: 'same-origin'
  }).then((res) => res.json());

export { getURL, postData, getData, toDateTime };
