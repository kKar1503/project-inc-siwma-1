import { useRouter } from 'next/router';
import { useQueries, useQueryClient } from 'react-query';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { getAllCompanies, getUser } from '@inc/database';
import { EditUserFormWrap, Header } from '@inc/ui';
import Link from 'next/link';

const EditUser = () => {
  const router = useRouter();
  const { userid } = router.query;

  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();

  const queries = useQueries([
    {
      queryKey: ['getUser', { id: userid }],
      queryFn: async () => getUser({ supabase, userid, getAdminContent: true }),
      refetchInterval: 6000,
      keepPreviousData: true,
    },
    {
      queryKey: ['getCompanies'],
      queryFn: async () => getAllCompanies({ supabase }),
      refetchInterval: 6000,
      keepPreviousData: true,
    },
    {
      queryKey: ['getLoginData'],
      queryFn: async () => supabase.auth.getUser(),
    },
  ]);

  const refreshQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['getUser', { id: userid }] });
    queryClient.invalidateQueries({ queryKey: ['getCompanies'] });
  };

  const isLoading = queries.some((e) => e.isLoading);
  const [getUserQuery, getCompaniesQuery, getLoginDataQuery] = queries;

  return (
    <div className="flex flex-col w-full h-full gap-8 p-6 overflow-auto xl:max-h-screen">
      <Header />

      <div className="flex flex-col grow h-fit shadow-xl rounded-2xl bg-base-100">
        <div className="flex flex-col p-8 border-b">
          <h1 className="font-bold text-xl">Edit User</h1>
          {/* If you want, you can use the user's name to replace 'user' in the heading below as well */}
          <h1>Edit user details manually below</h1>
        </div>
        <EditUserFormWrap
          onSuccessChange={() => {
            refreshQuery();
          }}
          userQueryData={getUserQuery.data}
          companiesQueryData={getCompaniesQuery.data}
          isLoading={isLoading}
          path="./"
          adminContent={false}
          loginId={getLoginDataQuery?.data?.data.user.id}
        />
      </div>
    </div>
  );
};

EditUser.getLayout = (page) => page;

EditUser.allowAuthenticated = true;

export default EditUser;