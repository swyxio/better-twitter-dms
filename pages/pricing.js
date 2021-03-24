import PricingUpdate from '../components/PricingUpdate';
import { supabase } from '../utils/initSupabase';

export default function Prices({ products }) {
  return (
    <>
      {/* rewrite this as hard coded, lol */}
      <PricingUpdate products={products} showBrands={false} />
    </>
  );
}
export async function getStaticProps() {
  // Load all active products and prices at build time.
  const { data: products, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });
  if (error) console.log(error.message);
  console.log(products);

  return {
    props: {
      products: products ?? []
    },
    // Refetch and rebuild pricing page every minute.
    revalidate: 60
  };
}
