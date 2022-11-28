import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const Listing = () => {
  const { query, isReady } = useRouter();

  const client = useSupabaseClient();

  const [listing, setListing] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [carouselImages, setCarouselImages] = React.useState([]);

  const {
    data: listingData,
    isError: listingError,
    isLoading: listingLoading,
    status: listingStatus,
  } = useQuery(
    ['get_listing_by_name', query.id],
    () => client.rpc('get_listing_by_name', { listing_name: query.id }),
    {
      enabled: isReady,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  React.useEffect(() => {
    if (listingStatus === 'success') {
      setListing(listingData.data);
    }
  }, [listingData, listingStatus]);

  return (
    <main>
      <h1>query.id</h1>
    </main>
  );
};

export default Listing;
