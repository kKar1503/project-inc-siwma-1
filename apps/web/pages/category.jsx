import CategoryCard from '../components/category/CategoryCard';

const Category = () => (
  <div className="mt-10 ml-28 mr-28 mb-10 h-screen">
    <p className="font-bold text-3xl text-cyan-600 mb-5">More Metal Types</p>
    <p className="text-slate-400 text-xl mb-10">
      Choose from over 8,000 types of shapes and grades of metal!
    </p>
    <div className="flex flex-wrap mb-10">
      {/* image temporarily grabbed from metalsupermarkets.com */}
      <CategoryCard
        name="Alloy Steel"
        img="https://www.metalsupermarkets.com/wp-content/uploads/2022/09/mild-steel-round-tube-DOM-150x150.webp"
      />
      <CategoryCard
        name="Aluminium"
        img="https://www.metalsupermarkets.com/wp-content/uploads/2021/03/Mild-Steel-Angle-Metal-Supermarkets-150x150.png"
      />
      <CategoryCard
        name="Brass"
        img="https://www.metalsupermarkets.com/wp-content/uploads/2021/10/Mild-Steel-Bar-Grating-Metal-Supermarkets-150x150.png"
      />
      <CategoryCard
        name="Brass"
        img="https://www.metalsupermarkets.com/wp-content/uploads/2021/10/Mild-Steel-Bar-Grating-Metal-Supermarkets-150x150.png"
      />
      <CategoryCard
        name="Brass"
        img="https://www.metalsupermarkets.com/wp-content/uploads/2021/10/Mild-Steel-Bar-Grating-Metal-Supermarkets-150x150.png"
      />
      <CategoryCard
        name="Brass"
        img="https://www.metalsupermarkets.com/wp-content/uploads/2021/10/Mild-Steel-Bar-Grating-Metal-Supermarkets-150x150.png"
      />
      <CategoryCard
        name="Brass"
        img="https://www.metalsupermarkets.com/wp-content/uploads/2021/10/Mild-Steel-Bar-Grating-Metal-Supermarkets-150x150.png"
      />
      <CategoryCard
        name="Brass"
        img="https://www.metalsupermarkets.com/wp-content/uploads/2021/10/Mild-Steel-Bar-Grating-Metal-Supermarkets-150x150.png"
      />
    </div>
  </div>
);
export default Category;
