import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import CardBackground from '../../components/CardBackground';
import Container from '../../components/Container';
import Detail from '../../components/listing/Detail';
import Price from '../../components/listing/Price';
import Title from '../../components/listing/Title';
import User from '../../components/listing/User';
import Carousel from '../../components/marketplace/carousel/Carousel';
import BuyBadge from '../../components/marketplace/listing/BuyBadge';
import SellBadge from '../../components/marketplace/listing/SellBadge';
import sampleProductImage from '../../public/sample-product-image.jpg';

// Load env variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

const getAllListingImages = async (listingId, supabaseClient) => {
  const { data, error } = await supabaseClient.rpc('get_all_images_for_listing_by_id', {
    _id: listingId,
  });

  if (error) throw new Error("There was a problem loading this listing's images");

  const imagesPromises = data.map((imagesData) => {
    const { image: uuid } = imagesData;

    return supabaseClient.storage.from('listing-image-bucket').getPublicUrl(uuid);
  });

  return Promise.all(imagesPromises);
};

export async function getServerSideProps({ params }) {
  let images = [];

  // Get the listing details
  const { data, error } = await supabase.rpc('get_listing_by_id', {
    listing_id: parseInt(params.id, 10),
  });

  if (error || data.length === 0) {
    console.log('Error while getting listing by id');
    console.log(error);
    console.log(data.length);

    // Redirect to the 404 page
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const listingImagesData = await getAllListingImages(params.id, supabase);

  if (listingImagesData.length > 0) {
    images = listingImagesData.map((image) => image.data.publicUrl);
  }

  console.log('Listing and images data from getServerSideProps');
  console.log(data[0]);
  console.log(images);

  return {
    props: {
      images,
      listing: data[0],
    },
  };
}

const ListingPage = ({ listing, images: carouselImages }) => {
  const { query, isReady } = useRouter();

  const client = useSupabaseClient();

  const [user, setUser] = React.useState(null);

  return (
    <>
      {/* {listingError && <ErrorPage errorCode={500} errorMessage={`${listingErrorData.message}!`} />} */}

      {/* {!listing && <ErrorPage errorCode={404} errorMessage="Listing not found!" />} */}

      {/* <Breadcrumbs paths={[listing.category_name, listing.name]} /> */}
      <>
        <Carousel wrapperClassName="w-full h-[300px] my-10">
          {[...carouselImages].map((image) => (
            <div key={image} className="w-full h-full flex justify-center bg-black/50 relative">
              <picture>
                <img
                  src={image}
                  alt={listing.name}
                  className="w-full h-full object-fit blur-2xl absolute top-0 left-0"
                />
              </picture>

              <picture className="z-10">
                <img src={image} alt={listing.name} className="h-full" />
              </picture>
              {/* <div className="relative w-fit h-full">
                  <Image
                    src={image}
                    alt={listing.name}
                    className="aspect-auto w-auto h-full"
                    fill
                  />
                </div> */}
            </div>
          ))}
        </Carousel>

        <div className="grid lg:grid-cols-10 my-5 gap-5">
          {/* Listing details */}
          <div className="space-y-4 col-span-7">
            {/* Listing title and badge */}
            <div className="flex flex-wrap items-center gap-3">
              {listing.listing_type_name === 'SELL' ? <SellBadge /> : <BuyBadge />}
              <Title title={listing.name} />
            </div>

            <Price price={listing.price} />

            <div className="divider" />

            <Title title="Description" />

            {/* Date posted, category */}
            <div className="flex flex-wrap gap-5 my-4">
              <Detail title="Length" detail="100m" />
              <Detail title="Material" detail="Aluminum" />
              {/* Date posted */}
              <Detail
                title="Posted on"
                detail={DateTime.fromISO(listing.created_at).toFormat('dd MMM yyyy')}
              />
              <Detail title="Category" detail={listing.category_name} />
            </div>

            <p>{listing.description}</p>
            {/* <Description description={listing.description} /> */}
          </div>

          {/* Chat now details */}
          <div className="col-span-3">
            <CardBackground className="text-center w-full lg:w-auto">
              <User profilePicture={sampleProductImage} username="xiaoming" />
              <button className="btn btn-sm btn-primary mt-4">Chat now</button>
            </CardBackground>
          </div>
        </div>
      </>
    </>
  );
};

ListingPage.propTypes = {
  listing: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  images: PropTypes.arrayOf(PropTypes.string),
};

ListingPage.getLayout = (page) => <Container>{page}</Container>;

export default ListingPage;
