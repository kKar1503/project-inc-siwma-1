import { Database } from '@inc/database';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useCategoriesData = () => {
  const supabase = useSupabaseClient();
  const [categoriesData, setCategoriesData] = useState([]);

  const {
    data: categoriesAPIData,
    isLoading: categoriesAPILoading,
    error: categoriesAPIError,
    status: categoriesAPIStatus,
  } = useQuery(['categories'], () =>
    supabase.from(Database.TABLES.CATEGORY.CATEGORY).select('*').eq('active', true)
  );

  // ! Category useEffect
  useEffect(() => {
    (async () => {
      if (categoriesAPIStatus === 'success') {
        const { data } = categoriesAPIData;

        // Loop through data and add image from storage bucket
        const d = await data.map(async (item) => {
          let imageLink = null;

          if (item.image) {
            const imageRes = await supabase.storage
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

        const resolvedData = await Promise.all(d);

        setCategoriesData(resolvedData);
      }
    })();
  }, [categoriesAPIStatus, categoriesAPIData]);

  return { categoriesData, categoriesAPILoading, categoriesAPIError, categoriesAPIStatus };
};

export default useCategoriesData;
