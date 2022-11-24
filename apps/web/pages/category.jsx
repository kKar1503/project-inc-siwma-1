import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import CategoryCard from '../components/category/CategoryCard';

const Category = () => {
  const supabase = useSupabaseClient();
  const {
    data: categoryData,
    // status: categoryStatus,
    // isLoading: categoryIsLoading,
  } = useQuery(['get_category'], () => supabase.from('category').select('*'));
  // useEffect(() => {
  //   if (categoryStatus === 'success') {
  //     console.log(categoryData);
  //   }
  // });
  return (
    <div className="mt-10 ml-28 mr-28 mb-10 h-screen">
      <p className="font-bold text-3xl text-primary mb-5">More Metal Types</p>
      <p className="text-secondary text-xl mb-10">
        Choose from over 8,000 types of shapes and grades of metal!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:grid-cols-2 mb-10">
        {categoryData?.data.map((item) => (
          <CategoryCard
            name={item.name}
            img={item.image}
            href={`/category/${item.name}?id=${item.id}`}
            key={item.name}
          />
        ))}

        {/* image temporarily grabbed from metalsupermarkets.com */}
        {/* hardcoded values left in to see image */}
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
      </div>
    </div>
  );
};

// export async function S() {
//   const supabase = useSupabaseClient();
//   const {
//     data: categoryData,
//     status: categoryStatus,
//     isLoading: categoryIsLoading,
//   } = useQuery(['get_category'], () => supabase.from('category').select('*'));
// }

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library

//   const categories = await S();

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       categories,
//     },
//   };
// }
export default Category;
