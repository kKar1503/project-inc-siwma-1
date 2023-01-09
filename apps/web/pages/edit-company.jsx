import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { getCompany } from '@inc/database';
import { CompanyEditFormContext, Header } from '@inc/ui';
import Link from 'next/link';

/**
 * Maps query data into a company object
 * @param {{name: string, image: string, website: string, bio: string, comments: string}} data The data to parse
 * @returns A object containing properties for a company
 */
const parseQueryData = (data) => {
  // Parse the query data
  const company = {
    ...data,
    image:
      (data.image && {
        src: `https://rvndpcxlgtqfvrxhahnm.supabase.co/storage/v1/object/public/company-image-bucket/${data.image}`,
      }) ||
      null,
    comments:
      data.companies_comments && data.companies_comments.length > 0
        ? data.companies_comments[0].comments
        : '',
  };

  // Delete the companies_comments key from the object
  delete company.companies_comments;

  return company;
};

const EditCompany = () => {
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

  // -- Prepare fetched data for rendering & processing -- //
  // Redirect the user if no company was retrieved
  if (!isLoading && (!queryData.data || queryData.data.length === 0)) {
    // No company was retrieved
    router.push('/companies');
  }

  // Parse query data
  const company =
    isLoading || !queryData || !queryData.data ? false : parseQueryData(queryData.data[0]);

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
    <div className="flex flex-col w-full gap-8 p-6 overflow-auto h-screen">
      <Header />

      <div className="flex flex-col flex-1 grow shadow-xl rounded-2xl bg-base-100">
        {/* Body header */}
        <div className="flex flex-col p-8 border-b">
          <h1 className="font-bold text-xl">Edit {isLoading ? 'company' : queryData.data.name}</h1>
          {/* If you want, you can use the company's name to replace 'company' in the heading below as well */}
          <h1>Edit company details manually below</h1>
        </div>

        {/* Form */}
        <CompanyEditFormContext
          onSuccessChange={() => {
            refreshQuery();
          }}
          company={company}
          isLoading={isLoading}
          backButton={
            // TODO: Replace with a link to the company profile page
            <Link href="./" className="btn btn-primary">
              Return To Company Overview
            </Link>
          }
          disableAdmin
        />
      </div>
    </div>
  );
};

EditCompany.getLayout = (page) => page;

export default EditCompany;