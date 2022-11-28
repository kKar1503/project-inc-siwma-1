import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Skeleton from 'react-loading-skeleton';
import Log from '@inc/utils/logger';
import ErrorPage from '../../components/listing/ErrorPage';

const Listing = () => {
  const { query, isReady } = useRouter();

  const client = useSupabaseClient();

  const [listing, setListing] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [carouselImages, setCarouselImages] = React.useState([]);

  const {
    data: listingData,
    isError: listingError,
    error: listingErrorData,
    isLoading: listingLoading,
    status: listingStatus,
  } = useQuery(
    ['get_listing_by_name', query.id],
    async () => client.rpc('get_listing_by_name', { listing_name: query.id }),
    {
      enabled: isReady,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  React.useEffect(() => {
    if (listingStatus === 'success') {
      Log('Listing data', listingData.data[0]);
      setListing(listingData.data[0]);
    }
  }, [listingData, listingStatus]);

  return (
    <main>
      {listingLoading && <Skeleton count={10} />}

      {listingError && <ErrorPage errorCode={500} errorMessage={`${listingErrorData.message}!`} />}

      {isReady && listing === undefined && (
        <ErrorPage errorCode={404} errorMessage="Listing not found!" />
      )}
    </main>
  );
};

export default Listing;
