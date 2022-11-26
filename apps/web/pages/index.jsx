import { Database } from '@inc/database';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Container from '../components/Container';
import InfiniteScroll from '../components/InfiniteScroll';
import Carousel from '../components/marketplace/carousel/Carousel';
import CategoryListingItem from '../components/marketplace/CategoryListingItem';
import ProductListingItem from '../components/marketplace/listing/ProductListingItem';

const MarketplacePage = () => {
  const supabase = useSupabaseClient();

  const [listingData, setListingData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  const [infiniteScrollMockData, setInfiniteScrollMockData] = useState([]);
  const [infiniteScrollMockDataLoading, setInfiniteScrollMockDataLoading] = useState(false);

  const infiniteScrollRef = useRef(null);

  const {
    data: categoriesAPIData,
    isLoading: categoriesAPILoading,
    error: categoriesAPIError,
    status: categoriesAPIStatus,
  } = useQuery(['categories'], () =>
    supabase.from(Database.TABLES.CATEGORY.CATEGORY).select('*').eq('active', true)
  );

  const {
    data: listingAPIData,
    status: listingStatus,
    isLoading: listingIsLoading,
    error: listingError,
  } = useQuery(['get_listings'], async () =>
    supabase.rpc('get_listings', { item_offset: 0, item_limit: 10 })
  );

  useEffect(() => {
    if (listingStatus === 'success') {
      console.log('Success listing', listingAPIData.data);
      setListingData(listingAPIData.data);
      setInfiniteScrollMockData([
        ...listingAPIData.data,
        ...listingAPIData.data,
        ...listingAPIData.data,
        ...listingAPIData.data,
        ...listingAPIData.data,
      ]);
    }
  }, [listingStatus, listingAPIData]);

  useEffect(() => {
    if (categoriesAPIStatus === 'success') {
      setCategoriesData(categoriesAPIData.data);
    }
  }, [categoriesAPIStatus, categoriesAPIData]);

  const handleInfiniteScrollLoadMore = () => {
    setInfiniteScrollMockDataLoading(true);
    console.log('Loading more items');

    setTimeout(() => {
      setInfiniteScrollMockData((oldData) => [
        ...oldData,
        ...listingAPIData.data,
        ...listingAPIData.data,
        ...listingAPIData.data,
        ...listingAPIData.data,
        ...listingAPIData.data,
      ]);

      setInfiniteScrollMockDataLoading(false);
      console.log('Done loading more!');
    }, 1000);
  };

  return (
    <div>
      {/* Image banner */}
      <div className="mb-10">
        {/* Image banner - Object cover covers the image (zoom crop) */}
        <Carousel wrapperClassName="w-full">
          <div className="w-full relative">
            <Image
              // src="https://images.unsplash.com/photo-1598638567141-696be94b464a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              fill
              className="object-cover"
              alt="Banner"
            />
          </div>

          <div className="w-full h-[200px] relative">
            <Image
              // src="https://images.unsplash.com/photo-1598638567141-696be94b464a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              fill
              className="object-cover"
              alt="Banner"
            />
          </div>
        </Carousel>
      </div>

      {/* Container just adds margin from left and right */}
      <Container>
        {/* Carousel */}
        <h1 className="text-3xl font-bold">Marketplace</h1>

        <div className="flex flex-wrap justify-between items-center">
          {/* Title */}
          <h3 className="text-xl font-bold my-2">Categories</h3>
          {/* View all categories link */}
          <Link href="/categories">
            <p className="link">View all categories</p>
          </Link>
        </div>

        {/* Carousel of categories */}
        <Carousel name="categories">
          {categoriesData &&
            categoriesData.map(({ id, name, image }) => (
              <CategoryListingItem key={id} name={name} img={null} href={`/categories/${name}`} />
            ))}
        </Carousel>

        {listingData && listingData.length > 0 && (
          <>
            {/* Title */}
            <h3 className="text-xl font-bold my-2">Popular</h3>

            {/* Carousel of products */}
            <Carousel name="popular-products" wrapperClassName="my-3 w-[150px]">
              {listingData.map(({ name, description, id, price, type }) => (
                <ProductListingItem
                  type={type}
                  key={id}
                  img={null}
                  name={name}
                  rating={Math.floor(Math.random() * 5) + 1}
                  href={`/products/${id}`}
                />
              ))}
            </Carousel>
          </>
        )}

        {listingData && listingData.length > 0 && (
          <>
            {/* Title */}
            <h3 className="text-xl font-bold my-2">Recommended</h3>

            {/* Carousel of products */}
            <Carousel name="recommended-products" wrapperClassName="my-3 w-[150px]">
              {listingData.map(({ name, description, id, price, type }) => (
                <ProductListingItem
                  type={type}
                  key={id}
                  img={null}
                  name={name}
                  rating={Math.floor(Math.random() * 5) + 1}
                  href={`/products/${id}`}
                />
              ))}
            </Carousel>
          </>
        )}

        {infiniteScrollMockData && infiniteScrollMockData.length > 0 && (
          <>
            {/* Title */}
            <h3 className="text-xl font-bold my-2">New Items</h3>

            <div ref={infiniteScrollRef}>
              <InfiniteScroll
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
                onLoadMore={handleInfiniteScrollLoadMore}
                loading={infiniteScrollMockDataLoading}
                reachedMaxItems={infiniteScrollMockData.length > 100}
              >
                {infiniteScrollMockData.map(({ name, description, id, price, type }) => (
                  <ProductListingItem
                    type={type}
                    key={id}
                    img={null}
                    name={name}
                    rating={Math.floor(Math.random() * 5) + 1}
                    href={`/products/${id}`}
                  />
                ))}
              </InfiniteScroll>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default MarketplacePage;
