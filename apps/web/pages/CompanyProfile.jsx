import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { getCompany, getCompanyListings } from '@inc/database';
// import AdminPageLayout from '../../components/layouts/AdminPageLayout';
// import NavBar from '../../components/NavBar';
import InfiniteScroll from '../components/InfiniteScroll';
import ProfileListingItem from '../components/profile/ProfileListingItem';

const CompanyProfile = () => {
  const [infiniteScrollMockData, setInfiniteScrollMockData] = useState([]);
  const [infiniteScrollMockDataLoading, setInfiniteScrollMockDataLoading] = useState(false);
  const [listingDataAPI, setListingDataAPI] = useState([]);

  const infiniteScrollRef = useRef(null);
  // Retrieve company id from query param
  const router = useRouter();
  const { companyid } = router.query;

  // -- Queries Supabase --//
  // Initialise supabase client
  const supabase = useSupabaseClient();

  // Initialise react-query
  const queryClient = useQueryClient();

  // Retrieve company data
  const {
    data: queryData,
    isLoading,
    isError,
  } = useQuery({
    // Fetches companies from supabase
    queryKey: ['getCompany', { id: companyid }],
    refetchInterval: 60000, // Refresh every minute
    queryFn: async () =>
      getCompany({
        supabase,
        companyid,
        getAdminComment: false,
      }),
  });

  // retrieve listing data
  const {
    data: listingData,
    status: listingStatus,
    isLoading2,
    isError2,
  } = useQuery({
    // Fetches companies from supabase
    queryKey: ['getCompanyListings', { id: companyid }],
    refetchInterval: 60000, // Refresh every minute
    queryFn: async () =>
      getCompanyListings({
        supabase,
        companyid,
      }),
  });

  useEffect(() => {
    if (listingStatus === 'success') {
      setListingDataAPI(listingData.data);
      setInfiniteScrollMockData([...listingData.data]);
    }
  }, [listingStatus, listingData]);

  const handleInfiniteScrollLoadMore = () => {
    setInfiniteScrollMockDataLoading(true);
    console.log('Loading more items');
    setTimeout(() => {
      setInfiniteScrollMockData((oldData) => [...oldData, ...listingData.data]);
      setInfiniteScrollMockDataLoading(false);
      console.log('Done loading more!');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full h-full gap-8 p-6 overflow-auto xl:max-h-screen">
      {/* <NavBar /> */}

      <div className="flex flex-col grow shadow-xl rounded-2xl bg-base-100">
        <div className="flex flex-col p-8 border-b">
          <h1 className="font-bold text-xl">
            {isLoading ? 'Loading company name' : queryData.data[0].name}
          </h1>
        </div>
        {/* Display */}
        <div className="flex flex-row p-8">
          <div className="flex flex-col p-8">
            {/* Display company details */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                {/* Company image with border around image element */}
                <div className="flex flex-col gap-2">
                  {isLoading ? (
                    'Loading company image'
                  ) : (
                    <Image
                      src={`https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/company-image-bucket/${queryData.data[0].image}`}
                      alt="Company logo"
                      width={300}
                      height={300}
                    />
                  )}
                  {/* //company name subheader that takes up half the div */}
                  {isLoading ? (
                    'Loading company name'
                  ) : (
                    <div className="flex flex-col gap-2">
                      <h1 className="font-bold text-xl">{queryData.data[0].name}</h1>
                      <h1 className="font-bold text-xl">{queryData.data[0].bio}</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isLoading2 || listingData == null ? (
            'Loading company listings'
          ) : (
            <div className="flex flex-col gap-2">
              <h3 className="text-xl font-bold my-2">Your Listings</h3>

              <div ref={infiniteScrollRef}>
                <InfiniteScroll
                  className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
                  onLoadMore={handleInfiniteScrollLoadMore}
                  loading={infiniteScrollMockDataLoading}
                  reachedMaxItems={infiniteScrollMockData.length > 100}
                >
                  {console.log(infiniteScrollMockData)}
                  {infiniteScrollMockData.map(
                    ({ name, description, id, price, type, open, visibility }) => (
                      <ProfileListingItem
                        type={type}
                        key={id}
                        img={null}
                        name={name}
                        href={`/products/${id}`}
                        id={id}
                        visibility={visibility}
                        open={open}
                        setInfiniteScrollMockData={setInfiniteScrollMockData}
                      />
                    )
                  )}
                </InfiniteScroll>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// CompanyProfile.getLayout = (page) => <AdminPageLayout pageName="Companies">{page}</AdminPageLayout>;

export default CompanyProfile;
