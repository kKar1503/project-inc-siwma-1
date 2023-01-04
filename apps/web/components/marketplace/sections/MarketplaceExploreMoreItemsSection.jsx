import { Database } from '@inc/database';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import useListingsData from '../../../hooks/useListingsData';
import InfiniteScroll from '../../InfiniteScroll';
import ProductListingItem from '../listing/ProductListingItem';

const MarketplaceExploreMoreItemsSection = () => {
  const supabase = useSupabaseClient();

  const [dataToDisplay, setDataToDisplay] = useState([]);

  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);
  const [totalDataCount, setTotalDataCount] = useState(0);

  const { listingData, listingStatus, listingRefetch } = useListingsData(
    offset,
    limit,
    'explore_more_items'
  );

  const {
    data: totalInfiniteScrollAPIData,
    status: totalInfiniteScrollStatus,
    // isLoading: totalInfiniteScrollIsLoading,
    // error: totalInfiniteScrollError,
  } = useQuery(['get_total_infinite_scroll_data'], async () =>
    supabase.from(Database.TABLES.LISTING.LISTING).select('id', { count: 'exact' })
  );

  useEffect(() => {
    if (totalInfiniteScrollStatus === 'success') {
      console.log('Total listing counts: ', totalInfiniteScrollAPIData.count);
      setTotalDataCount(totalInfiniteScrollAPIData.count);
    }
  }, [totalInfiniteScrollStatus]);

  const handleInfiniteScrollLoadMore = async () => {
    console.log(`Loading more data... from ${offset} to ${offset + limit}`);
    setOffset(offset + limit);
    await listingRefetch();
  };

  useEffect(() => {
    if (listingStatus === 'success') {
      setDataToDisplay((prevData) => [...prevData, ...listingData]);
    }
  }, [listingStatus, listingData]);

  return (
    dataToDisplay &&
    dataToDisplay.length > 0 && (
      <>
        {/* Title */}
        <h3 className="text-xl font-bold my-5">Explore more items</h3>

        {/* DEBUG PURPOSES ONLY! */}
        {/* <p className="bg-red-500">
          {dataToDisplay.length} / {totalDataCount}
        </p> */}

        <InfiniteScroll
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-fr"
          onLoadMore={handleInfiniteScrollLoadMore}
          loading={listingStatus === 'loading'}
          reachedMaxItems={offset + limit >= totalDataCount}
        >
          {dataToDisplay.map(
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
        </InfiniteScroll>
      </>
    )
  );
};

export default MarketplaceExploreMoreItemsSection;
