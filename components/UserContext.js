import { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '../utils/initSupabase';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [userLoaded, setUserLoaded] = useState(false);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [receipts, setReceipts] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [twitterAccounts, setTwitterAccounts] = useState([]);

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get the user details.
  const getUserDetails = () => supabase.from('users').select('*').single();

  // Get the user's trialing or active subscription.
  const getSubscription = () =>
    supabase.from('purchases').select('*, prices(*, products(*))');
  // supabase
  //   .from('subscriptions')
  //   .select('*, prices(*, products(*))')
  //   .in('status', ['trialing', 'active'])
  //   .single();

  const getTwitterAccounts = () =>
    supabase
      .from('twitter_tokens')
      .select('created_at, user_name, twitter_user_id, user_id')
      .not('user_name', 'is', null);

  const getReceipts = () => supabase.from('receipts').select('*');

  useEffect(() => {
    if (user) {
      Promise.allSettled([
        getUserDetails(),
        getSubscription(),
        getTwitterAccounts(),
        getReceipts()
      ]).then((results) => {
        setUserDetails(results[0].value.data);
        setSubscription(results[1].value.data);
        setTwitterAccounts(results[2].value.data);
        setReceipts(results[3].value.data);
        setUserLoaded(true);
      });
    }
  }, [user]);

  const value = {
    session,
    user,
    userDetails,
    userLoaded,
    subscription,
    twitterAccounts,
    receipts,
    signIn: (options) => supabase.auth.signIn(options),
    signUp: (options) => supabase.auth.signUp(options),
    signOut: () => {
      setUserDetails(null);
      setSubscription(null);
      return supabase.auth.signOut();
    }
  };
  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }
  return context;
};
