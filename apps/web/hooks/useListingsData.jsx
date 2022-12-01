import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useListingsData = (offset = 0, limit = 10, tag = '') => {
  console.log(`${tag && `${tag}: `}Use Listing Data Hook. Offset: ${offset}, Limit: ${limit}`);
  const [listingData, setListingData] = useState([]);

  const supabase = useSupabaseClient();

  const {
    data: listingAPIData,
    status: listingStatus,
    isLoading: listingIsLoading,
    error: listingError,
    refetch: listingRefetch,
  } = useQuery(['get_listings', offset, limit], async () =>
    supabase.rpc('get_listings', { item_offset: offset, item_limit: limit })
  );

  async function getImageData(listings) {
    const listingDataWithImages = listings.map(async (item) => {
      // Let imageLink be null first, we will set a value if there is an image
      let imageLink = null;

      if (item.image) {
        // Get image from supabase storage

        const imageResult = await supabase.storage
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

  useEffect(() => {
    (async () => {
      if (listingStatus === 'success') {
        const { data } = listingAPIData;
        const listingsWithImageUrls = await getImageData(data);
        setListingData(listingsWithImageUrls);
      }
    })();
  }, [listingStatus, listingAPIData]);

  return { listingData, listingStatus, listingIsLoading, listingError, listingRefetch };
};

export default useListingsData;
