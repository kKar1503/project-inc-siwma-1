import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { Search } from '@inc/ui';
import Container from '../components/Container';
import useListingSearchData from '../hooks/useListingSearchData';
import ProductListingItem from '../components/marketplace/listing/ProductListingItem';

const MarketplaceSearchPage = () => {
  const supabase = useSupabaseClient();

  const router = useRouter();
  const { search } = router.query;

  const { listingData, listingStatus, listingRefetch } = useListingSearchData(
    search,
    'search_items'
  );

  const redirectSearch = (searchText) => {
    router.push(`/search?search=${searchText}`);
  };

  useEffect(() => {
    listingRefetch();
  }, [search]);

  return (
    <div>
      {/* Container just adds margin from left and right */}
      <Container>
        <div className="mt-5">
          <Search searchCallback={redirectSearch} />
        </div>
        <h3 className="text-xl font-bold my-5">{`Displaying ${listingData.length} search results for: "${search}"...`}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr">
          {listingData.map(
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
                className="hover:shadow-lg h-full"
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
                companyName={companyName}
                href={`/product/${id}`}
              />
            )
          )}
        </div>
      </Container>
    </div>
  );
};

MarketplaceSearchPage.getLayout = (page) => <Container>{page}</Container>;
MarketplaceSearchPage.allowAuthenticated = true;
MarketplaceSearchPage.title = 'Marketplace';

export default MarketplaceSearchPage;
