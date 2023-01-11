import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Container from '../../components/Container';
import CategoryCard from '../../components/category/CategoryCard';
import ProductListingItem from '../../components/marketplace/listing/ProductListingItem';
import CategoryBanner from '../../components/category/CategoryBanner';

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
  const router = useRouter();
  const { category } = router.query;
  const supabase = useSupabaseClient();

  const {
    data: categoryData,
    // status: categoryStatus,
    // isLoading: categoryIsLoading,
  } = useQuery(
    ['fetchListings', router.query.id],
    async () => supabase.rpc('get_category_listings', { item_offset: 0, catid: router.query.id }),
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
      <div className="m-auto my-10 flex flex-col justify-center w-10/12">
        <div className="h-1/3 mb-10">
          <CategoryBanner img="https://images.unsplash.com/photo-1563642900777-eb44ab05eaf8" />
        </div>
        <div className="h-2/3">
          <p className="font-bold text-2xl">{category} listings</p>
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
                unit_price: unitPrice,
              }) => (
                <ProductListingItem
                  className="hover:shadow-lg"
                  type={type}
                  negotiable={negotiable}
                  key={id}
                  price={price}
                  img={imageUrl}
                  name={name}
                  rating={4.5}
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
