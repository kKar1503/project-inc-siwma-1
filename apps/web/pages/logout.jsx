import {useSupabaseClient} from '@supabase/auth-helpers-react';
import dynamic from 'next/dynamic';
import React from 'react';
import {useRouter} from 'next/router';
import {useMutation} from 'react-query';
import {Alert} from '@inc/ui';
import SignInAndUpLayout from '../components/layouts/SignInAndUpLayout';

/**
 * @type {import("next").NextPage}
 */
const Page = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const {
    mutate: logout,
    isSuccess: logoutIsSuccess,
    isError: logoutIsError,
  } = useMutation(
    async () => {
      const {data, error} = await supabase.auth.signOut()
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        router.push('/login');
      },
    }
  );

  let formNote = null;
  if (logoutIsError) {
    formNote = <Alert level="error" message={logoutIsError?.message ?? 'Something went wrong!'}/>;
  } else if (logoutIsSuccess) {
    formNote = <Alert level="success" message="You have successfully logged out!"/>;
  }
  logout();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        {formNote && <div>{formNote}</div>}
        <h1 className="font-bold text-xl">Logging out...</h1>
        <p>Logging out of your account...</p>
      </div>
    </div>
  );
}

const SignInAndUpLayoutNoSSR = dynamic(() => Promise.resolve(SignInAndUpLayout), {
  ssr: false,
});

Page.getLayout = (page) => <SignInAndUpLayoutNoSSR>{page}</SignInAndUpLayoutNoSSR>;
Page.ignoreHeader = true;

Page.allowNonAuthenticated = true;
Page.allowAuthenticated = true;


export default Page;
