import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQuery, useQueryClient } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { getCompany } from '@inc/database';
import AdminPageLayout from '../components/layouts/AdminPageLayout';
import NavBar from '../components/NavBar';
import { CompanyEditFormContext } from '../components/forms/companyEdit';

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
        getAdminComment: true,
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
          queryData={queryData}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

EditCompany.getLayout = (page) => <AdminPageLayout pageName="Companies">{page}</AdminPageLayout>;

// -- Configure AuthGuard -- //
EditCompany.allowAuthenticated = true;
EditCompany.roles = ['admin'];
// Page.aclAbilities = [['View', 'Users']];

export default EditCompany;
