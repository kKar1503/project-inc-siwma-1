import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { useQuery } from 'react-query';

/**
 *Gets the image data for listings
 *
 * @param {Array<Listing>} listings array of listings
 * @param {SupabaseClient} supabaseClient the supabase client
 * @return {*}
 */
async function getListingFirstImage(listings, supabaseClient) {
  if (!listings) return null;

  const listingDataWithImages = listings.map(async (item) => {
    // Let imageLink be null first, we will set a value if there is an image
    let imageLink = null;

    if (item.image) {
      // Get image from supabase storage

      const imageResult = await supabaseClient.storage
        .from('listing-image-bucket')
        .getPublicUrl(item.image);

      imageLink = imageResult.data.publicUrl;
    }

    return {
      ...item,
      imageUrl: imageLink,
    };
  });

  const resolvedListingDataWithImages = await Promise.all(listingDataWithImages);

  return resolvedListingDataWithImages;
}

const useListingsSearchData = (search = '', tag = '') => {
  const [listingData, setListingData] = useState([]);

  const supabase = useSupabaseClient();

  const {
    // data: listingAPIData,
    status: listingStatus,
    isLoading: listingIsLoading,
    error: listingError,
    refetch: listingRefetch,
  } = useQuery(
    ['get_listings_by_name', search],
    async () =>
      supabase.rpc('get_listings_by_name', {
        _query: search,
      }),
    {
      onSuccess: async (apiData) => {
        if (apiData.error) {
          console.log('Error getting listings');
          setListingData([]);
          return;
        }

        const { data } = apiData;
        console.log({ data });
        const listingsWithImageUrls = await getListingFirstImage(data, supabase);
        setListingData(listingsWithImageUrls);
      },
      refetchOnMount: true,
    }
  );

  return { listingData, listingStatus, listingIsLoading, listingError, listingRefetch };
};

export default useListingsSearchData;
