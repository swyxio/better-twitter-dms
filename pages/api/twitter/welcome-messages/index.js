import { supabaseAdmin } from '../../../../utils/initSupabaseAdmin';
import Twitter from 'twitter-lite';

const listDMs = async (req, res) => {
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

      const messages = await client.get(
        'direct_messages/welcome_messages/list'
      );
      const rules = await client.get(
        'direct_messages/welcome_messages/rules/list'
      );
      return res.status(200).json({ messages, rules });
    } catch (err) {
      console.error(err);
      let errorMessage = '';
      if ('errors' in err) {
        // Twitter API error
        if (err.errors[0].code === 88) {
          // rate limit exceeded
          (errorMessage = 'Twitter rate limit will reset on'),
            new Date(err._headers.get('x-rate-limit-reset') * 1000);
          console.log(
            'Twitter rate limit will reset on',
            new Date(err._headers.get('x-rate-limit-reset') * 1000)
          );
        }
        // some other kind of error, e.g. read-only API trying to POST
        else errorMessage = err?.errors[0]?.message;
      }
      res
        .status(500)
        .json({ error: { statusCode: 500, message: errorMessage } });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};
export default listDMs;
