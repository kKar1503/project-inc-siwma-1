import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Container from '../components/Container';
import Advertisement from '../components/marketplace/Advertisement';
import AnimatedCarousel from '../components/marketplace/carousel/AnimatedCarousel';
import MarketplaceCategorySection from '../components/marketplace/sections/MarketplaceCategorySection';
import MarketplaceExploreMoreItemsSection from '../components/marketplace/sections/MarketplaceExploreMoreItemsSection';
import MarketplacePopularSection from '../components/marketplace/sections/MarketplacePopularSection';
import MarketplaceRecommendedSection from '../components/marketplace/sections/MarketplaceRecommendedSection';

const MarketplacePage = () => {
  const supabase = useSupabaseClient();

  // const [offset, setOffset] = useState(0);
  // const [limit, setLimit] = useState(60);
  const [adsData, setAdsData] = useState([]);

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

  useEffect(() => {
    if (adsStatus === 'success') {
      console.log('Success ads', adsAPIData.data);
      setAdsData(adsAPIData.data);
    }
  }, [adsStatus, adsAPIData]);

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
        <MarketplaceCategorySection />
        <MarketplacePopularSection />
        <MarketplaceRecommendedSection />
        <MarketplaceExploreMoreItemsSection />
      </Container>
    </div>
  );
};

export default MarketplacePage;
