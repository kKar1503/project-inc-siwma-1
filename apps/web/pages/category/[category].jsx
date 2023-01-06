import { useRouter } from 'next/router';
import CategoryBanner from '../../components/category/CategoryBanner';
import CategoryListings from '../../components/category/CategoryListings';

// supabase.rpc('get_category_listing', { catid: router.query.id })
// supabase.from('listing').select('*').eq('category', catId);

const Category = () => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="m-auto my-10 flex flex-col justify-center w-10/12 h-screen">
      <div className="mb-10 h-1/2">
        <CategoryBanner img="https://images.unsplash.com/photo-1563642900777-eb44ab05eaf8" />
      </div>
      <div className="h-2/3">
        <p className="font-bold text-2xl">{category} listings</p>
        <div className="mb-10">
          {/* dynamically generate each category when queried */}
          <CategoryListings CatId={router.query.id} />
        </div>
        <p className="font-bold text-2xl mb-5">Popular Brands</p>
        {/* inserted from marketplace */}
      </div>
    </div>
  );
};

export default Category;
