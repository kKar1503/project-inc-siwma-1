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
        <div className="flex flex-wrap mb-10">
          {/* image temporarily grabbed from metalsupermarkets.com */}
          <CategoryCard
            name="Carbon Steel Round Tube"
            img="https://www.metalsupermarkets.com/wp-content/uploads/2022/09/mild-steel-round-tube-DOM-150x150.webp"
          />
          <CategoryCard
            name="Mild Steel Angle"
            img="https://www.metalsupermarkets.com/wp-content/uploads/2021/03/Mild-Steel-Angle-Metal-Supermarkets-150x150.png"
          />
          <CategoryCard
            name="Mild Steel Bar Grating"
            img="https://www.metalsupermarkets.com/wp-content/uploads/2021/10/Mild-Steel-Bar-Grating-Metal-Supermarkets-150x150.png"
          />
          <CategoryCard
            name="Mild Steel Bar Grating"
            img="https://www.metalsupermarkets.com/wp-content/uploads/2021/10/Mild-Steel-Bar-Grating-Metal-Supermarkets-150x150.png"
          />
          <CategoryCard
            name="Mild Steel Bar Grating"
            img="https://www.metalsupermarkets.com/wp-content/uploads/2021/10/Mild-Steel-Bar-Grating-Metal-Supermarkets-150x150.png"
          />
          <CategoryCard
            name="Mild Steel Bar Grating"
            img="https://www.metalsupermarkets.com/wp-content/uploads/2021/10/Mild-Steel-Bar-Grating-Metal-Supermarkets-150x150.png"
          />
          <CategoryCard
            name="Mild Steel Bar Grating"
            img="https://www.metalsupermarkets.com/wp-content/uploads/2021/10/Mild-Steel-Bar-Grating-Metal-Supermarkets-150x150.png"
          />
          <CategoryCard
            name="Mild Steel Bar Grating"
            img="https://www.metalsupermarkets.com/wp-content/uploads/2021/10/Mild-Steel-Bar-Grating-Metal-Supermarkets-150x150.png"
          />
        </div>
        <p className="font-bold text-2xl mb-5">Popular Brands</p>
        <p className="font-bold text-2xl">{category} listings</p>
        {/* inserted from marketplace */}
      </div>
    </div>
  );
};

export default Category;
