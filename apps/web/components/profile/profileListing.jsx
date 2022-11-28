import { useState, useRef, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useQuery } from 'react-query';
import InfiniteScroll from '../InfiniteScroll';
import ProfileListingItem from './ProfileListingItem';

const ProfileListing = () => {
  const [infiniteScrollMockData, setInfiniteScrollMockData] = useState([]);
  const [infiniteScrollMockDataLoading, setInfiniteScrollMockDataLoading] = useState(false);
  const [listingData, setListingData] = useState([]);

  const infiniteScrollRef = useRef(null);
  const supabase = useSupabaseClient();

  const {
    data: listingAPIData,
    status: listingStatus,
    isLoading: listingIsLoading,
    error: listingError,
  } = useQuery(['get_listings'], async () =>
    supabase.rpc('get_listings', { item_offset: 0, item_limit: 100 })
  );

  console.log(listingAPIData);

  useEffect(() => {
    if (listingStatus === 'success') {
      console.log('Success listing', listingAPIData.data);
      setListingData(listingAPIData.data);
      setInfiniteScrollMockData([...listingAPIData.data]);
    }
  }, [listingStatus, listingAPIData]);

  const handleInfiniteScrollLoadMore = () => {
    setInfiniteScrollMockDataLoading(true);
    console.log('Loading more items');
    setTimeout(() => {
      setInfiniteScrollMockData((oldData) => [...oldData, ...listingAPIData.data]);
      setInfiniteScrollMockDataLoading(false);
      console.log('Done loading more!');
    }, 1000);
  };

  return (
    <div>
      <h3 className="text-xl font-bold my-2">Your Listings</h3>
      <div ref={infiniteScrollRef}>
        <InfiniteScroll
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
          onLoadMore={handleInfiniteScrollLoadMore}
          loading={infiniteScrollMockDataLoading}
          reachedMaxItems={infiniteScrollMockData.length > 100}
        >
          {infiniteScrollMockData.map(({ name, description, id, price, type, visibility }) => (
            <ProfileListingItem
              type={type}
              key={id}
              img={null}
              name={name}
              href={`/products/${id}`}
              id={id}
              visibility={visibility}
              setInfiniteScrollMockData={setInfiniteScrollMockData}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProfileListing;
