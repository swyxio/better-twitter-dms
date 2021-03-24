const LoginWithTwitter = require('login-with-twitter');
import { supabaseAdmin } from '../../../utils/initSupabaseAdmin';
import Twitter from 'twitter-lite';

const handleTwitterCallback = async (req, res) => {
  const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY
  });

  try {
    const userId = req.query.userId;
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;

    const { data: twitter_token, error: err } = await supabaseAdmin
      .from('twitter_tokens')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    if (err) throw err;

    console.log(twitter_token.token_secret);

    client
      .getAccessToken({
        oauth_verifier: req.query.oauth_verifier,
        oauth_token: req.query.oauth_token
      })
      .then(async (resp) => {
        console.log({
          accTkn: resp.oauth_token,
          accTknSecret: resp.oauth_token_secret,
          userId: resp.user_id,
          screenName: resp.screen_name
        });
        const { data: update_results, error: updateError } = await supabaseAdmin
          .from('twitter_tokens')
          .update({
            ...twitter_token,
            twitter_user_id: resp.user_id,
            user_name: resp.screen_name,
            user_token: resp.oauth_token,
            user_token_secret: resp.oauth_token_secret
          })
          .eq('id', twitter_token.id);

        if (updateError) throw updateError;

        const clientTwo = new Twitter({
          subdomain: 'api', // "api" is the default (change for other subdomains)
          version: '1.1',
          consumer_key: process.env.TWITTER_API_KEY,
          consumer_secret: process.env.TWITTER_API_SECRET_KEY,
          access_token_key: resp.oauth_token, //'291449508-zxl0Pvw8IDMyOy1R56fcJS9usBpPO9R4g9axIfPT',
          access_token_secret: resp.oauth_token_secret // 'gorbJACzqzNs7RHRKzipk2HbDJIoKc3xkfn4rElTXVn9Q'
        });

        clientTwo
          .get('account/verify_credentials')
          .then((results) => {
            console.log('results', results);
            return res.status(200).json({ messages: results });
          })
          .catch(console.error);

        res.redirect(`/account?linked=${encodeURIComponent(resp.screen_name)}`);
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message, trace: err.stack });
  }
};

export default handleTwitterCallback;
