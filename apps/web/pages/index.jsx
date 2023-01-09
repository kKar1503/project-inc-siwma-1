import { Database } from '@inc/database';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Container from '../components/Container';
import InfiniteScroll from '../components/InfiniteScroll';
import AnimatedCarousel from '../components/marketplace/carousel/AnimatedCarousel';
import Carousel from '../components/marketplace/carousel/Carousel';
import CategoryListingItem from '../components/marketplace/CategoryListingItem';
import ProductListingItem from '../components/marketplace/listing/ProductListingItem';
import Advertisement from '../components/marketplace/Advertisement';

const MarketplacePage = () => {
  const supabase = useSupabaseClient();

  const [adsData, setAdsData] = useState([]);
  const [listingData, setListingData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  const [infiniteScrollData, setInfiniteScrollData] = useState([]);
  const [infiniteScrollMockDataLoading, setInfiniteScrollMockDataLoading] = useState(false);

  const [totalDataCount, setTotalDataCount] = useState(0);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

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
    supabase.rpc('get_listings', { item_offset: offset, item_limit: limit })
  );

  const {
    data: adsAPIData,
    status: adsStatus,
    isLoading: adsIsLoading,
    error: adsError,
  } = useQuery(['get_advertisements'], async () => supabase.rpc('get_advertisements'), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const {
    data: infiniteScrollAPIData,
    status: infiniteScrollStatus,
    isLoading: infiniteScrollIsLoading,
    error: infiniteScrollError,
    refetch: infiniteScrollRefetch,
  } = useQuery(['get_infinite_scroll_data', offset, limit], async () =>
    supabase.rpc('get_listings', { item_offset: offset, item_limit: limit })
  );

  const {
    data: totalInfiniteScrollAPIData,
    status: totalInfiniteScrollStatus,
    isLoading: totalInfiniteScrollIsLoading,
    error: totalInfiniteScrollError,
  } = useQuery(['get_total_infinite_scroll_data'], async () =>
    supabase.from(Database.TABLES.LISTING.LISTING).select('id', { count: 'exact' })
  );

  useEffect(() => {
    if (totalInfiniteScrollStatus === 'success') {
      console.log('Total listing counts: ', totalInfiniteScrollAPIData.count);
      setTotalDataCount(totalInfiniteScrollAPIData.count);
    }
  }, [totalInfiniteScrollStatus]);

  useEffect(() => {
    if (listingStatus === 'success') {
      console.log('Success listing', listingAPIData.data);
      // Insert random image from unsplash
      const d = listingAPIData.data.map((item) => ({
        ...item,
        img: `https://images.unsplash.com/photo-1667925459217-e7b7a9797409?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80`,
      }));

      console.log(d);

      setListingData(d);
    }
  }, [listingStatus, listingAPIData]);

  useEffect(() => {
    if (categoriesAPIStatus === 'success') {
      setCategoriesData(categoriesAPIData.data);
    }
  }, [categoriesAPIStatus, categoriesAPIData]);

  useEffect(() => {
    if (adsStatus === 'success') {
      console.log('Success ads', adsAPIData.data);
      setAdsData(adsAPIData.data);
    }
  }, [adsStatus, adsAPIData]);

  useEffect(() => {
    if (infiniteScrollStatus === 'success') {
      console.log(`Fetched more data from ${offset} to ${offset + limit}`);
      const d = infiniteScrollAPIData.data.map((item) => ({
        ...item,
        img: `https://images.unsplash.com/photo-1667925459217-e7b7a9797409?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80`,
      }));

      setInfiniteScrollData([...infiniteScrollData, ...d]);
    }
  }, [infiniteScrollStatus, infiniteScrollAPIData]);

  const handleInfiniteScrollLoadMore = async () => {
    setOffset(offset + limit);
    await infiniteScrollRefetch();
  };

  return (
    <div>
      {/* Image banner */}
      <div className="mb-10">
        {adsData.length > 0 && (
          /* Image banner - Object cover covers the image (zoom crop) */
          <AnimatedCarousel wrapperClassName="w-full h-[300px]" animationDuration={5000}>
            {adsData.map((ad) => (
              <div key={ad.id} className="w-full relative">
                <Advertisement adData={ad} />
              </div>
            ))}
          </AnimatedCarousel>
        )}
      </div>

      {/* Container just adds margin from left and right */}
      <Container>
        {/* <h1 className="text-3xl font-bold">Marketplace</h1> */}

        <div className="flex flex-wrap justify-between items-center">
          {/* Title */}
          <h3 className="text-xl font-bold my-2">Categories</h3>
          {/* View all categories link */}
          <Link href="/categories">
            <p className="link">View all categories</p>
          </Link>
        </div>

        {/* Carousel of categories */}
        <Carousel name="categories" carouselWrapperClassName="mb-10">
          {categoriesData &&
            categoriesData.map(({ id, name, image }) => (
              <CategoryListingItem key={id} name={name} img={null} href={`/categories/${name}`} />
            ))}
        </Carousel>

        {listingData && listingData.length > 0 && (
          <section className="mb-10">
            {/* Title */}
            <h3 className="text-xl font-bold my-2">Popular</h3>

            {/* Carousel of products */}
            <Carousel name="popular-products" wrapperClassName="my-3">
              {listingData.map(({ name, img, description, id, price, type }) => (
                <ProductListingItem
                  className="w-[200px] hover:shadow-lg"
                  type={type}
                  key={id}
                  img={img}
                  name={name}
                  rating={4.5}
                  href={`/products/${id}`}
                />
              ))}
            </Carousel>
          </section>
        )}

        {listingData && listingData.length > 0 && (
          <section className="mb-10">
            {/* Title */}
            <h3 className="text-xl font-bold my-2">Recommended</h3>

            {/* Carousel of products */}
            <Carousel name="recommended-products" wrapperClassName="my-3">
              {listingData.map(({ name, img, description, id, price, type }) => (
                <ProductListingItem
                  className="w-[200px] hover:shadow-lg"
                  type={type}
                  key={id}
                  img={img}
                  name={name}
                  rating={3.4}
                  href={`/products/${id}`}
                />
              ))}
            </Carousel>
          </section>
        )}

        {infiniteScrollData && infiniteScrollData.length > 0 && (
          <>
            {/* Title */}
            <h3 className="text-xl font-bold my-5">Explore more items</h3>

            {/* DEBUG PURPOSES ONLY! */}
            {/* <p className="bg-red-500">
              {infiniteScrollData.length} / {totalDataCount}
            </p> */}

            <InfiniteScroll
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 auto-rows-fr"
              onLoadMore={handleInfiniteScrollLoadMore}
              loading={infiniteScrollStatus === 'loading'}
              reachedMaxItems={offset + limit >= totalDataCount}
            >
              {infiniteScrollData.map(({ name, img, description, id, price, type }) => (
                <ProductListingItem
                  className="w-full hover:shadow-lg h-full"
                  type={type}
                  key={id}
                  img={img}
                  name={name}
                  rating={3.3}
                  href={`/products/${id}`}
                />
              ))}
            </InfiniteScroll>
          </>
        )}
      </Container>
    </div>
  );
};

export default MarketplacePage;