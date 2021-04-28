import { supabaseAdmin } from '../../../../../utils/initSupabaseAdmin';
import Twitter from 'twitter-lite';

const listDMs = async (req, res) => {
  if (req.method === 'POST') {
    const token = req.body.token;
    try {
      const { data: user, error } = await supabaseAdmin.auth.api.getUser(token);
      if (error) throw error;

      const newMessageId = req.query.messageId;

      if (!newMessageId) {
        return res.status(500).json({
          error: { statusCode: 500, message: 'please include a messageId' }
        });
      }

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

      const rules = await client.get(
        'direct_messages/welcome_messages/rules/list'
      );

      if (rules?.welcome_message_rules?.length) {
        // there already is a rule, delete it
        const ruleToDelete = rules.welcome_message_rules[0];

        await client.delete('direct_messages/welcome_messages/rules/destroy', {
          id: ruleToDelete.id
        });
      }

      const newRule = await client.post(
        'direct_messages/welcome_messages/rules/new',
        {
          welcome_message_rule: {
            welcome_message_id: newMessageId
          }
        }
      );
      const updatedRules = await client.get(
        'direct_messages/welcome_messages/rules/list'
      );
      console.log(newRule);

      return res.status(200).json({ rules: updatedRules });
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
