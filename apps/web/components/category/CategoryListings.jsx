import { useQuery } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import ProductListingItem from '../marketplace/listing/ProductListingItem';

const CategoryListings = (routerid) => {
  const { CatId } = routerid;
  const supabase = useSupabaseClient();
  const {
    data: categoryData,
    // status: categoryStatus,
    // isLoading: categoryIsLoading,
  } = useQuery(['fetchListings', CatId], async () =>
    supabase.rpc('get_category_listing', { catid: CatId })
  );

  return (
    <div>
      {categoryData?.data?.map(
        ({ name, imageUrl, id, listing_type: type, price, negotiable, unit_price: unitPrice }) => (
          <ProductListingItem
            className="w-[200px] md:w-[250px] hover:shadow-lg"
            type={type}
            negotiable={negotiable}
            key={id}
            price={price}
            img={imageUrl}
            name={name}
            rating={4.5}
            unit_price={unitPrice}
            href={`/products/${id}`}
          />
        )
      )}
    </div>
  );
};

export default CategoryListings;
