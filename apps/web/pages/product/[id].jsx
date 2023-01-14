import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { DateTime } from 'luxon';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { IoClose, IoHelpCircleOutline } from 'react-icons/io5';
import CardBackground from '../../components/CardBackground';
import Container from '../../components/Container';
import Breadcrumbs from '../../components/listing/Breadcrumbs';
import Detail from '../../components/listing/Detail';
import Price from '../../components/listing/Price';
import Title from '../../components/listing/Title';
import User from '../../components/listing/User';
import Carousel from '../../components/marketplace/carousel/Carousel';
import BuyBadge from '../../components/marketplace/listing/BuyBadge';
import SellBadge from '../../components/marketplace/listing/SellBadge';
import Tooltip from '../../components/marketplace/Tooltip';

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

export async function getServerSideProps(context) {
  const { params } = context;

  // Create supabase client
  const supabase = createServerSupabaseClient(context);

  let images = [];

  // Get the listing details
  const { data: getListingData, error: getListingError } = await supabase.rpc('get_listing_by_id', {
    listing_id: parseInt(params.id, 10),
  });

  if (getListingError || getListingData.length === 0) {
    console.log('Error while getting listing by id');
    console.log(getListingError);
    console.log(getListingData.length);

    // Redirect to the 404 page
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  // Get listing images
  const listingImagesData = await getAllListingImages(params.id, supabase);

  if (listingImagesData.length > 0) {
    images = listingImagesData.map((image) => image.data.publicUrl);
  }

  // Get cross section image uuid from category table
  const { data: getCrossSectionImage, error: getCrossSectionImageError } = await supabase
    .from('category')
    .select('cross_section_image')
    .eq('id', getListingData[0].category_id);

  if (getCrossSectionImageError) {
    // Redirect to the 404 page
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  // Get public cross section image link from storage
  const { data: getCrossSectionImageLink, error: getCrossSectionImageLinkError } =
    await supabase.storage
      .from('category-cross-section-image-bucket')
      .getPublicUrl(getCrossSectionImage[0].cross_section_image);

  if (getCrossSectionImageLinkError) {
    // Redirect to the 404 page
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  // Get parameters for the listing
  const { data: getListingParametersData, error: getListingParametersError } = await supabase.rpc(
    'get_parameter_values_for_listing_by_id',
    {
      _listing_id: getListingData[0].id,
    }
  );

  if (getListingParametersError) {
    // Redirect to the 404 page
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  console.log('Listing and images data from getServerSideProps');
  console.log(getListingData[0]);
  console.log(images);
  console.log(getListingParametersData);

  return {
    props: {
      images,
      listing: getListingData[0],
      parameter_values: getListingParametersData,
      cross_section_image: getCrossSectionImageLink.publicUrl,
    },
  };
}

const UnitDictionary = {
  'MEASUREMENT (WEIGHT)': 'g',
  'MEASUREMENT (DIMENSION)': 'mm',
};

const ListingPage = ({
  listing,
  images: carouselImages,
  parameter_values: listingParameterValues,
  cross_section_image: crossSectionImage,
}) => {
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();

  const [profilePictureUrl, setProfilePictureUrl] = useState(null);
  const [showFullScreenGallery, setShowFullScreenGallery] = useState(false);

  const getUserProfilePictureURL = async (userId) => {
    const res = await supabase.storage.from('user-image-bucket').getPublicUrl('default-user.png');

    setProfilePictureUrl(res.data.publicUrl);
  };

  useEffect(() => {
    getUserProfilePictureURL('abc');
    // FIXME: ANOTHER DEPENDENCY ISSUE
  }, []);

  // This function handles creating a chat room and then redirecting to the chat page
  const createRoom = async () => {
    if (!user) {
      console.error('Error, user not logged in');
      return;
    }

    const obj = {
      _listing_id: listing.id,
      _buyer_id: user.id,
      _seller_id: listing.owner,
    };

    const { data, error } = await supabase.rpc('insert_chatroom', obj);

    if (error) {
      console.error('Error creating chat');
      return;
    }

    if (data.length === 0) {
      console.error('Error, data received is none');
      return;
    }

    const d = data[0];

    if (Object.prototype.hasOwnProperty.call(d, 'id')) {
      // d.id;
      router.push(`/real-time-chat`);
    }
  };

  return (
    <>
      <Head>
        <title>{listing.name}</title>
      </Head>

      {/* {listingError && <ErrorPage errorCode={500} errorMessage={`${listingErrorData.message}!`} />} */}
      {/* {!listing && <ErrorPage errorCode={404} errorMessage="Listing not found!" />} */}
      <Breadcrumbs
        paths={[
          {
            name: listing.category_name,
            path: `/category/${listing.category_id}`,
          },
          {
            name: listing.name,
            path: `/product/${listing.id}`,
          },
        ]}
      />

      <>
        <Carousel
          className="my-10"
          wrapperClassName="w-full h-[500px] shadow-lg border border-black/20"
        >
          {[...carouselImages].map((image) => (
            <div
              tabIndex={0}
              role="button"
              onKeyDown={() => setShowFullScreenGallery(true)}
              onClick={() => setShowFullScreenGallery(true)}
              className="cursor-pointer w-full h-full flex justify-center bg-black/50 relative"
            >
              <picture>
                <img
                  src={image}
                  alt={listing.name}
                  className="w-full h-full object-fit blur-2xl absolute top-0 left-0"
                />
              </picture>

              <picture className="z-10">
                <img src={image} alt={listing.name} className="w-auto h-full z-10" />
              </picture>
            </div>
          ))}
        </Carousel>

        {showFullScreenGallery && (
          <div
            tabIndex={0}
            role="button"
            className="bg-black/50 backdrop-blur-xl w-full h-full fixed top-0 left-0 z-[999] px-24"
          >
            <button
              onClick={() => setShowFullScreenGallery(false)}
              className="btn btn-error absolute left-2 top-2"
            >
              <IoClose className="mr-2" size={18} />
              Close
            </button>

            <Carousel className="" showButtons wrapperClassName="mx-auto w-full h-screen ">
              {[...carouselImages].map((image) => (
                <picture className="mx-auto h-full py-20">
                  <img src={image} alt={listing.name} className="h-full z-10" />
                </picture>
              ))}
            </Carousel>
          </div>
        )}

        <div className="lg:grid lg:grid-cols-10 my-5 gap-5 space-y-4">
          {/* Listing details */}
          <div className="space-y-4 col-span-7">
            {/* Listing title and badge */}
            <div className="flex flex-wrap items-center gap-3">
              {listing.listing_type_name === 'SELL' ? <SellBadge /> : <BuyBadge />}
              <Title title={listing.name} />
            </div>

            <Price price={listing.price} unitPrice={listing.unit_price} />

            <div className="divider" />

            <Title title="Description" />
            <p>{listing.description}</p>

            {listingParameterValues.length > 0 && (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-semibold">Dimensions</h1>

                  <Tooltip
                    content={
                      <picture>
                        <img
                          src={crossSectionImage}
                          alt={`Reference for ${listing.category_id}`}
                          className="w-24 my-3"
                        />
                      </picture>
                    }
                    contentClassName="bg-neutral-content p-2 rounded-lg shadow-lg"
                    position="right"
                  >
                    <IoHelpCircleOutline className="text-xl text-gray-500" />
                  </Tooltip>
                </div>

                {/* Each details */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 my-4">
                  {listingParameterValues.map((p) => (
                    <Detail
                      title={p.display_name}
                      detail={`${p.value}${
                        Object.prototype.hasOwnProperty.call(UnitDictionary, p.type)
                          ? UnitDictionary[p.type]
                          : ''
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="divider" />

            {/* Date posted, category */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 my-4">
              <Detail title="Negotiable?" detail={listing.negotiable ? 'Yes' : 'No'} />
              <Detail title="Unit Price?" detail={listing.unit_price ? 'Yes' : 'No'} />

              <Detail title="Category" detail={listing.category_name} />

              {/* Date posted */}
              <Detail
                title="Posted on"
                detail={DateTime.fromISO(listing.created_at).toFormat('dd MMM yyyy')}
              />

              <Detail title="Posted By" detail={listing.fullname} />
              <Detail title="Company" detail={listing.company_name} />
            </div>

            {/* <Description description={listing.description} /> */}
          </div>

          {/* Chat now details */}
          <div className="col-span-3">
            <CardBackground className="w-full">
              <User
                profilePicture={profilePictureUrl}
                username={listing.fullname}
                company={listing.company_name}
              />

              {user && user.id !== listing.owner && (
                <button onClick={createRoom} className="btn btn-sm btn-primary mt-4">
                  Chat now
                </button>
              )}

              {user && user.id === listing.owner && (
                <button
                  onClick={() => router.push('/real-time-chat')}
                  className="btn btn-sm btn-primary mt-4"
                >
                  See Chats
                </button>
              )}

              {!user && (
                <Link
                  href={`/login?redirect=/product/${listing.id}`}
                  className="btn btn-sm btn-primary mt-4"
                >
                  Login To Chat
                </Link>
              )}
            </CardBackground>
          </div>
        </div>
      </>
    </>
  );
};

ListingPage.propTypes = {
  listing: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  ),
  images: PropTypes.arrayOf(PropTypes.string),
  parameter_values: PropTypes.arrayOf(
    PropTypes.shape({
      listing: PropTypes.number,
      parameter: PropTypes.number,
      value: PropTypes.string,
      name: PropTypes.string,
      display_name: PropTypes.string,
    })
  ),
  cross_section_image: PropTypes.string,
};

ListingPage.getLayout = (page) => <Container>{page}</Container>;
ListingPage.allowAuthenticated = true;

export default ListingPage;
