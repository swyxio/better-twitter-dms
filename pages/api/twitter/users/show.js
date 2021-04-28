import { supabaseAdmin } from '../../../../utils/initSupabaseAdmin';
import Twitter from 'twitter-lite';

const showUser = async (req, res) => {
  if (req.method === 'POST') {
    const token = req.body.token;
    try {
      const { data: user, error } = await supabaseAdmin.auth.api.getUser(token);
      if (error) throw error;

      const { data: user_token, error: err } = await supabaseAdmin
        .from('twitter_tokens')
        .select('*')
        .eq('user_id', process.env.impersonate || user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      if (err) throw err;

      const client = new Twitter({
        subdomain: 'api', // "api" is the default (change for other subdomains)
        version: '1.1',
        consumer_key: process.env.TWITTER_API_KEY,
        consumer_secret: process.env.TWITTER_API_SECRET_KEY,
        access_token_key: user_token.user_token,
        access_token_secret: user_token.user_token_secret
      });

      const twitter_user = await client.get('users/show', {
        user_id: user_token.twitter_user_id
      });

      return res.status(200).json({ twitter_user });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};
export default showUser;
