import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import CategoryCard from '../../components/category/CategoryCard';
import CategoryBanner from '../../components/category/CategoryBanner';

// supabase.rpc('get_category_listing', { catid: router.query.id })
// supabase.from('listing').select('*').eq('category', catId);

const Category = () => {
  const router = useRouter();
  const { category } = router.query;
  const supabase = useSupabaseClient();

  const {
    data: categoryData,
    // status: categoryStatus,
    // isLoading: categoryIsLoading,
  } = useQuery(['fetchListings', router.query.id], async () =>
    supabase.rpc('get_category_listing', { catid: router.query.id })
  );

  return (
    <div className="m-auto my-10 flex flex-col justify-center w-10/12 h-screen">
      <div className="mb-10 h-1/2">
        <CategoryBanner img="https://images.unsplash.com/photo-1563642900777-eb44ab05eaf8" />
      </div>
      <div className="h-2/3">
        <p className="font-bold text-2xl">{category} listings</p>
        {/* dynamically generate each category when queried */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:grid-cols-2 mb-10">
          {/* image temporarily grabbed from metalsupermarkets.com */}
          <CategoryCard
            name="Carbon Steel Round Tube"
            img="https://www.metalsupermarkets.com/wp-content/uploads/2022/09/mild-steel-round-tube-DOM-150x150.webp"
          />
          <CategoryCard
            name="Mild Steel Angle"
            img="https://www.metalsupermarkets.com/wp-content/uploads/2021/03/Mild-Steel-Angle-Metal-Supermarkets-150x150.png"
          />
          {categoryData?.data?.map((item) => (
            <CategoryCard name={item.name} img={item.image} key={item.name} />
          ))}
        </div>
        <p className="font-bold text-2xl mb-5">Popular Brands</p>
        {/* inserted from marketplace */}
      </div>
    </div>
  );
};

export default Category;
