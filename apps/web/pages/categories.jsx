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
    <div className="mx-28 my-10 h-screen">
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
