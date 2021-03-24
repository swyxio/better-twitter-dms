import { useEffect } from 'react';

import { supabase } from '../utils/initSupabase';
import PricingUpdate from '../components/PricingUpdate';
import Hero from '../components/Hero';
import Info from '../components/Info';
import Features from '../components/Features';
import { useRouter } from 'next/router';
import UseCases from '../components/UseCases';
import Signup from '../components/Signup';
export default function PricingPage({ products }) {
  const router = useRouter();

  // useEffect(() => {
  //   router.push('/signin');
  // }, []);
  return (
    <>
      <Hero />
      {/* <UseCases /> */}
      <Signup />
      {/* <Info /> */}
      {/* <Features /> */}
      {/* <PricingUpdate products={products} /> */}
    </>
  );
}

export async function getStaticProps() {
  // Load all active products and prices at build time.
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*, prices(*)')
      .eq('active', true)
      .eq('prices.active', true)
      .order('metadata->index')
      .order('unit_amount', { foreignTable: 'prices' });
    if (error) console.log(error.message);

    return {
      props: {
        products: products ?? []
      },
      // Refetch and rebuild pricing page every minute.
      revalidate: 60
    };
  } catch (err) {
    return {
      props: {
        products: []
      }
    };
  }
}
