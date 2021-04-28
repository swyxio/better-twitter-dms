import { supabaseAdmin } from '../../utils/initSupabaseAdmin';

export default async function handleEmail(req, res) {
  try {
    const token = req.body.token;

    const { data: user, error } = await supabaseAdmin.auth.api.getUser(token);
    if (error) throw error;

    const { data: user_token, error: err } = await supabaseAdmin
      .from('twitter_tokens')
      .select('*')
      .eq('user_id', process.env.impersonate || user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const {
      data: subscriptionPriceId,
      error: subscriptionError
    } = await supabaseAdmin
      .from('purchases')
      .select('price_id')
      .eq('user_id', process.env.impersonate || user.id)
      .single();

    const email = user.email;
    const formId = 2190789;
    const data = {
      api_key: process.env.CONVERTKIT_API_KEY,
      email,
      fields: {
        twitter: user_token?.user_name,
        plan: subscriptionPriceId ? 'paid' : 'free'
      },
      tags: subscriptionPriceId ? [2308791] : [2308785]
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
    const results = await response.json();
    return res.status(200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
