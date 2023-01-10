import { Database } from '@inc/database';
import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { useQuery } from 'react-query';

/**
 *Returns the images for categories
 *
 * @param {Array<Categories>} categories The array of categories
 * @param {SupabaseClient} supabaseClient Supabase client
 * @return {Array<Categories & {imageUrl: string | null}} The array of categories with an added imageUrl property, if null, there is no image, otherwise, it is the image url
 */
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

const useCategoriesData = () => {
  const supabase = useSupabaseClient();
  const [categoriesData, setCategoriesData] = useState([]);

  const {
    isLoading: categoriesAPILoading,
    error: categoriesAPIError,
    status: categoriesAPIStatus,
  } = useQuery(
    ['categories'],
    async () => supabase.from(Database.TABLES.CATEGORY.CATEGORY).select('*').eq('active', true),
    {
      onSuccess: async (data) => {
        if (data.error) {
          throw new Error('Problem fetching categories data from the database.');
        }

        const categoriesWithImages = await getCategoriesImage(data.data, supabase);

        setCategoriesData(categoriesWithImages);
      },
    }
  );

  // ! Category useEffect
  // useEffect(() => {
  //   (async () => {
  //     if (categoriesAPIStatus === 'success') {
  //       const { data } = categoriesAPIData;

  //       // Loop through data and add image from storage bucket
  //       const d = await data.map(async (item) => {
  //         let imageLink = null;

  //         if (item.image) {
  //           const imageRes = await supabase.storage
  //             .from('category-image-bucket')
  //             .getPublicUrl(item.image);

  //           imageLink = imageRes.data.publicUrl;
  //         }

  //         return {
  //           ...item,
  //           imageUrl: imageLink,
  //         };
  //       });

  //       // Fulfill all promises and set the categories data to be the result

  //       const resolvedData = await Promise.all(d);

  //       setCategoriesData(resolvedData);
  //     }
  //   })();
  // }, [categoriesAPIStatus, categoriesAPIData]);

  return { categoriesData, categoriesAPILoading, categoriesAPIError, categoriesAPIStatus };
};

export default useCategoriesData;
