import { useQuery } from 'react-query';
import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Container from '../components/Container';
import CategoryCard from '../components/category/CategoryCard';

const getCategoriesImage = async (categories, supabaseClient) => {
  // Loop through data and add image from storage bucket
  const d = categories.map(async (item) => {
    let imageLink = null;

    if (item.image) {
      const imageRes = await supabaseClient.storage
        .from('category-image-bucket')
        .getPublicUrl(item.image);

      imageLink = imageRes.data.publicUrl;
    }

    return {
      ...item,
      imageUrl: imageLink,
    };
  });

  // Fulfill all promises and set the categories data to be the result

  return Promise.all(d);
};

const Category = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const supabase = useSupabaseClient();
  const {
    data: categoryData,
    // status: categoryStatus,
    // isLoading: categoryIsLoading,
  } = useQuery(['get_category'], async () => supabase.from('category').select('*'), {
    onSuccess: async (data) => {
      if (data.error) {
        setCategoriesData([]);
      }

      const categoriesWithImages = await getCategoriesImage(data.data, supabase);

      setCategoriesData(categoriesWithImages);
      console.log(categoriesData);
    },
  });
  // useEffect(() => {
  //   if (categoryStatus === 'success') {
  //     console.log(categoryData);
  //   }
  // });
  return (
    <Container>
      <div className="mx-28 my-10 h-screen">
        <p className="font-bold text-3xl text-primary mb-5">More Metal Types</p>
        <p className="text-secondary text-xl mb-10">
          Choose from over 8,000 types of shapes and grades of metal!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:grid-cols-2 mb-10">
          {categoriesData.map((item) => (
            <CategoryCard
              name={item.name}
              img={item.imageUrl}
              href={`/category/${item.id}`}
              key={item.name}
            />
          ))}

          {/* image temporarily grabbed from metalsupermarkets.com */}
          {/* hardcoded values left in to see image */}
        </div>
      </div>
    </Container>
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

Category.allowAuthenticated = true;

export default Category;
