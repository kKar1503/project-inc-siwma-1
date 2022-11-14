import { useRouter } from 'next/router';
import CategoryCard from '../../components/category/CategoryCard';
import CategoryBanner from '../../components/category/CategoryBanner';

const Category = () => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="mt-10 ml-28 mr-28 mb-10 h-screen">
      <div className="mb-10 h-1/2">
        <CategoryBanner img="https://images.unsplash.com/photo-1563642900777-eb44ab05eaf8" />
      </div>
      <div className="h-2/3">
        <p className="font-bold text-2xl">{category} shapes</p>
        {/* dynamically generate each category when queried */}
        <CategoryCard
          name="Carbon Steel Round Tube"
          img="https://www.metalsupermarkets.com/wp-content/uploads/2022/09/mild-steel-round-tube-DOM-150x150.webp"
        />
      </div>
    </div>
  );
};

export default Category;
