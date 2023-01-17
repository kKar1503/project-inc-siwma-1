import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import CategoryBanner from '../../components/category/CategoryBanner';
import Container from '../../components/Container';
import ProductListingItem from '../../components/marketplace/listing/ProductListingItem';

// supabase.rpc('get_category_listing', { catid: router.query.id })
// supabase.from('listing').select('*').eq('category', catId);

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

const Category = () => {
  const [listingData, setListingData] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const router = useRouter();
  const { category } = router.query;
  const supabase = useSupabaseClient();

  // this useQuery is a temp fix to get the category name
  useQuery(
    ['get_category_name', parseInt(category, 10)],
    () => supabase.from('category').select('*').eq('id', parseInt(category, 10)),
    {
      onSuccess: (data) => {
        setCategoryName(data.data[0].name);
      },
    }
  );

  useQuery(
    ['fetchListings', category],
    async () => supabase.rpc('get_category_listings', { item_offset: 0, catid: category }),
    {
      onSuccess: async (apiData) => {
        const { data } = apiData;
        const listingsWithImageUrls = await getListingFirstImage(data, supabase);
        setListingData(listingsWithImageUrls);
      },
    }
  );

  return (
    <Container>
      <Head>
        <title>Category</title>
      </Head>
      <div className="m-auto my-10 flex flex-col justify-center w-10/12">
        <div className="h-1/3 mb-10">
          <CategoryBanner img="https://images.unsplash.com/photo-1563642900777-eb44ab05eaf8" />
        </div>
        <div className="h-2/3 space-y-4">
          <h2 className="font-bold text-4xl">{categoryName}</h2>
          <h6 className="font-bold text-xl">
            {listingData.length} {listingData.length > 1 ? 'listings' : 'listing'}
          </h6>
          {/* dynamically generate each category when queried */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:grid-cols-2 mb-10">
            {/* image temporarily grabbed from metalsupermarkets.com */}
            {listingData?.map(
              ({
                name,
                imageUrl,
                id,
                listing_type: type,
                price,
                negotiable,
                created_at: createdAt,
                owner: ownerId,
                fullname: ownerFullName,
                unit_price: unitPrice,
                company_name: companyName,
              }) => (
                <ProductListingItem
                  className="hover:shadow-lg"
                  companyName={companyName}
                  type={type}
                  negotiable={negotiable}
                  key={id}
                  price={price}
                  img={imageUrl}
                  name={name}
                  rating={4.5}
                  ownerId={ownerId}
                  ownerFullName={ownerFullName}
                  createdAt={createdAt}
                  unit_price={unitPrice}
                  href={`/product/${id}`}
                />
              )
            )}
          </div>
          {/* <p className="font-bold text-2xl mb-5">Popular Brands</p> */}
          {/* inserted from marketplace */}
        </div>
      </div>
    </Container>
  );
};

Category.allowAuthenticated = true;

export default Category;
