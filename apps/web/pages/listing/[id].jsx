import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Skeleton from 'react-loading-skeleton';
import Log from '@inc/utils/logger';
import ErrorPage from '../../components/listing/ErrorPage';
import FlexContainer from '../../components/listing/FlexContainer';
import Breadcrumbs from '../../components/listing/Breadcrumbs';
import Title from '../../components/listing/Title';
import Price from '../../components/listing/Price';
import Detail from '../../components/listing/Detail';
import Description from '../../components/listing/Description';
import Carousel from '../../components/marketplace/carousel/Carousel';

const Listing = () => {
  const { query, isReady } = useRouter();

  const client = useSupabaseClient();

  const [listing, setListing] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [carouselImages, setCarouselImages] = React.useState(['/images/placeholder.png']);

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

  // const {
  //   data: listingImageData,
  //   isError: listingImageError,
  //   error: listingImageErrorData,
  //   isLoading: listingImageLoading,
  //   status: listingImageStatus,
  // } = useQuery(['get_listing_images'], async () => client.rpc('get_listing_images'), {
  //   enabled: isReady,
  //   refetchOnMount: false,
  //   refetchOnWindowFocus: false,
  //   refetchOnReconnect: false,
  // });

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

      {isReady && listing && !listingLoading && !listingError && listingStatus === 'success' && (
        <FlexContainer className="flex-col w-full">
          <div className="mx-20 space-y-4">
            <Breadcrumbs paths={['Bars', listing.name]} />
            <Carousel>
              {carouselImages.map((image) => (
                <div key={image} className="carousel-item w-1/3">
                  <Image
                    src={image}
                    alt={image.name}
                    className="w-full border border-white rounded-2xl"
                    fill
                  />
                </div>
              ))}
            </Carousel>
            <FlexContainer className="flex-row space-x-8">
              <div className="w-3/4 space-y-4">
                <Title title={listing.name}>
                  <span className="text-grey-400">Posted on: {listing.created_at}</span>
                </Title>
                <Price price={listing.price} />
                <FlexContainer className="flex-row justify-between">
                  <Detail title="Name" detail="lmao" />
                  <Detail title="Name" detail="lmao" />
                  <Detail title="Name" detail="lmao" />
                </FlexContainer>
                <Title title="Description" />
                <Description description={listing[0].description} />
              </div>
            </FlexContainer>
          </div>
        </FlexContainer>
      )}
    </main>
  );
};

export default Listing;
