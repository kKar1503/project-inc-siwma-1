import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import Container from '../components/Container';
import AnimatedCarousel from '../components/marketplace/carousel/AnimatedCarousel';
import MarketplaceCategorySection from '../components/marketplace/sections/MarketplaceCategorySection';
import MarketplaceExploreMoreItemsSection from '../components/marketplace/sections/MarketplaceExploreMoreItemsSection';
import MarketplacePopularSection from '../components/marketplace/sections/MarketplacePopularSection';
import MarketplaceRecommendedSection from '../components/marketplace/sections/MarketplaceRecommendedSection';
import useListingsData from '../hooks/useListingsData';

const MarketplacePage = () => {
  const supabase = useSupabaseClient();

  // const [offset, setOffset] = useState(0);
  // const [limit, setLimit] = useState(60);

  const { listingData, listingStatus, listingIsLoading, listingError } = useListingsData(0, 60);

  // const {
  //   data: infiniteScrollAPIData,
  //   status: infiniteScrollStatus,
  //   isLoading: infiniteScrollIsLoading,
  //   error: infiniteScrollError,
  //   refetch: infiniteScrollRefetch,
  // } = useQuery(['get_infinite_scroll_data', offset, limit], async () =>
  //   supabase.rpc('get_listings', { item_offset: offset, item_limit: limit })
  // );

  // useEffect(() => {
  //   if (infiniteScrollStatus === 'success') {
  //     console.log(`Fetched more data from ${offset} to ${offset + limit}`);

  //     const d = infiniteScrollAPIData.data.map((item) => {
  //       console.log('helo');

  //       // Get the public image id

  //       return {
  //         ...item,
  //         img: `https://images.unsplash.com/photo-1667925459217-e7b7a9797409?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80`,
  //       };
  //     });

  //     setInfiniteScrollData([...infiniteScrollData, ...d]);
  //   }
  // }, [infiniteScrollStatus, infiniteScrollAPIData]);

  // useEffect(() => {
  //   (async () => {
  //     const res = await supabase.storage
  //       .from('listing-image-bucket')
  //       .getPublicUrl('5292cf25-72e7-4f1c-b0e1-5a1e0c2009b4');

  //     console.log(res);
  //   })();
  // }, []);

  // const handleInfiniteScrollLoadMore = async () => {
  //   setOffset(offset + limit);
  //   await infiniteScrollRefetch();
  // };

  return (
    <div>
      {/* Image banner */}
      <div className="mb-10">
        {/* Image banner - Object cover covers the image (zoom crop) */}
        <AnimatedCarousel wrapperClassName="w-full h-[300px]" animationDuration={5000}>
          <div className="w-full relative">
            <Image
              // src="https://images.unsplash.com/photo-1598638567141-696be94b464a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              fill
              className="object-cover"
              alt="Banner"
            />
          </div>

          <div className="w-full relative">
            <Image
              src="https://images.unsplash.com/photo-1501166222995-ff31c7e93cef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1934&q=80
              "
              fill
              className="object-cover"
              alt="Banner"
            />
          </div>

          <div className="w-full relative">
            <Image
              src="https://images.unsplash.com/photo-1594255897691-9d1edad1ecfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80
              "
              fill
              className="object-cover"
              alt="Banner"
            />
          </div>

          <div className="w-full relative">
            <Image
              src="https://images.unsplash.com/photo-1606337321936-02d1b1a4d5ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80
              "
              fill
              className="object-cover"
              alt="Banner"
            />
          </div>
        </AnimatedCarousel>
      </div>

      {/* Container just adds margin from left and right */}
      <Container>
        <MarketplaceCategorySection />
        <MarketplacePopularSection />
        <MarketplaceRecommendedSection />
        <MarketplaceExploreMoreItemsSection />
      </Container>
    </div>
  );
};

export default MarketplacePage;
