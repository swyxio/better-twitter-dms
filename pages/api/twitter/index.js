import { createTwitterToken } from '../../../utils/useDatabase';
import { supabaseAdmin } from '../../../utils/initSupabaseAdmin';
import Twitter from 'twitter-lite';

const createTwitterSession = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const token = req.body.token;
      const { data: user, error } = await supabaseAdmin.auth.api.getUser(token);
      if (error) throw error;

      const client = new Twitter({
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_API_SECRET_KEY
      });

      client
        .getRequestToken(
          `https://plzdm.me/api/twitter/callback?userId=${user.id}`
        )
        .then(async (resp) => {
          console.log({
            reqTkn: resp.oauth_token,
            reqTknSecret: resp.oauth_token_secret
          });
          await createTwitterToken({
            user_id: user.id,
            token_secret: resp.oauth_token_secret
          });
          const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${resp.oauth_token}`;
          return res.status(200).json({ url });
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: { statusCode: 500, message: err.message, trace: err.stack }
      });
    }
  }
};

export default createTwitterSession;
