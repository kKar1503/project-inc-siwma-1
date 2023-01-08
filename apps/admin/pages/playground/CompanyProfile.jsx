import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Image from 'next/image';
import { getCompany, getCompanyListings } from '@inc/database';
import AdminPageLayout from '../../components/layouts/AdminPageLayout';
import NavBar from '../../components/NavBar';

const CompanyProfile = () => {
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
    isLoading2,
    isError2,
  } = useQuery({
    // Fetches companies from supabase
    queryKey: ['getCompanyListings', { id: companyid }],
    refetchInterval: 60000, // Refresh every minute
    queryFn: async () =>
      getCompanyListings({
        supabase,
        companyid
      }),
  });

  // -- Prepare fetched data for rendering & processing -- //
  // Redirect the user if no company was retrieved
  if (!isLoading && queryData.data && queryData.data.length === 0) {
    // No company was retrieved
    // router.push('/companies');
  }

  // -- Functions -- //
  const refreshQuery = () => {
    // Invalidate table queries to cause a refetch
    queryClient.invalidateQueries({ queryKey: ['getCompany', { id: companyid }] });
  };

  // -- Event handlers  --//
  useEffect(() => {
    // Redirect the user back to the company management page if an invalid companyid was specified
    if (!isLoading) {
      // No company data retrieved
      // router.push('/companies');
    }
  });

  return (
    <div className="flex flex-col w-full h-full gap-8 p-6 overflow-auto xl:max-h-screen">
      <NavBar />

      <div className="flex flex-col grow shadow-xl rounded-2xl bg-base-100">
        <div className="flex flex-col p-8 border-b">
          <h1 className="font-bold text-xl">
            {isLoading ? 'Loading company name' : queryData.data[0].name}
            {isLoading2 ? 'Loading company name' : console.log(listingData)}
          </h1>
        </div>

        {/* Form */}
        {/* <CompanyEditFormContext
          onSuccessChange={() => {
            refreshQuery();
          }}
          queryData={queryData}
          isLoading={isLoading}
        /> */}
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
  );
};

CompanyProfile.getLayout = (page) => <AdminPageLayout pageName="Companies">{page}</AdminPageLayout>;

export default CompanyProfile;
