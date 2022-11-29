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
import User from '../../components/listing/User';
import CardBackground from '../../components/CardBackground';
import Carousel from '../../components/marketplace/carousel/Carousel';
import sampleProductImage from '../../public/sample-product-image.jpg';

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
    ['get_listing_by_id', query.id],
    async () => client.rpc('get_listing_by_id', { listing_id: parseInt(query.id, 10) }),
    {
      enabled: isReady,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const {
    data: listingImageData,
    isError: listingImageError,
    error: listingImageErrorData,
    isLoading: listingImageLoading,
    status: listingImageStatus,
    refetch: listingImageRefetch,
  } = useQuery(
    ['get_listing_images'],
    async () =>
      client.storage
        .from('listing-image-bucket')
        .getPublicUrl('5292cf25-72e7-4f1c-b0e1-5a1e0c2009b4'),
    {
      enabled: isReady,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  React.useEffect(() => {
    if (listingStatus === 'success') {
      Log('Listing data', listingData.data);
      setListing(listingData.data);
    }
  }, [listingData, listingStatus]);

  React.useEffect(() => {
    if (listingImageStatus === 'success') {
      Log('Listing image data', listingImageData.data);

      if (listingImageData.data) {
        setCarouselImages((previousImages) => [...previousImages, listingImageData.data.publicUrl]);
      }
    }
  }, [listingImageData, listingImageStatus]);

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
            <Breadcrumbs paths={[listing.category_name, listing.name]} />
            <Carousel>
              <div className="w-[1900px] h-[300px]">
                {carouselImages.map((image) => (
                  <div key={image} className="w-full h-full relative">
                    <Image
                      src={image}
                      alt={listing.name}
                      className="object-cover border border-white rounded-2xl"
                      fill
                    />
                  </div>
                ))}
              </div>
            </Carousel>
            <FlexContainer className="flex-row space-x-8">
              <div className="w-3/4 space-y-4">
                <Title title={listing.name}>
                  <span className="text-grey-400">
                    Posted on: {new Date(listing.created_at).getDay()}-
                    {new Date(listing.created_at).getMonth()}-
                    {new Date(listing.created_at).getFullYear()}
                  </span>
                </Title>
                <Price price={listing.price} />
                <FlexContainer className="flex-row space-x-24">
                  <Detail title="Length" detail="100m" />
                  <Detail title="Material" detail="Aluminum" />
                </FlexContainer>
                <div className="divider" />
                <Title title="Description" />
                <Description description={listing.description} />
              </div>
              <div className="w-1/4">
                <CardBackground className="text-center">
                  <User profilePicture={sampleProductImage} username="xiaoming" />
                  <button className="btn btn-primary mt-4">Chat now</button>
                </CardBackground>
              </div>
            </FlexContainer>
          </div>
        </FlexContainer>
      )}
    </main>
  );
};

export default Listing;
