import { useSupabaseClient } from '@supabase/auth-helpers-react';
import dynamic from 'next/dynamic';
import React from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import SignInAndUpLayout from '../../components/layouts/SignInAndUpLayout';
import LoginForm from '../../components/layouts/LoginForm';

/**
 * To minimise the amount of components needed to be rendered,
 * and to ensure separation of concerns, we will handle the register
 * logic here.
 *
 * @type {React.FC}
 */
const LoginFormWrap = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const {
    mutate: login,
    isLoading: loginIsLoading,
    error: loginError,
    isSuccess: loginIsSuccess,
    isError: loginIsError,
  } = useMutation(
    async ({ email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        router.push(router.query.redirect ?? '/');
      },
    }
  );

  let formNote = null;
  if (loginIsError) {
    formNote = (
      <div className="flex flex-col items-start alert alert-error">
        <p className="font-bold">Error!</p>
        <p>{loginError?.message ?? 'Something went wrong!'}</p>
      </div>
    );
  } else if (loginIsSuccess) {
    formNote = (
      <div className="flex flex-col items-start alert alert-success">
        <p className="font-bold">Success</p>
        <p>You have successfully logged in!</p>
      </div>
    );
  }

  return <LoginForm onLogin={login} formNote={formNote} disabled={loginIsLoading} />;
};

/**
 * @type {import("next").NextPage}
 */
const Page = () => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col">
      <h1 className="font-bold text-xl">Login</h1>
      <p>Please sign in to your account.</p>
    </div>
    <LoginFormWrap />
  </div>
);

const SignInAndUpLayoutNoSSR = dynamic(() => Promise.resolve(SignInAndUpLayout), {
  ssr: false,
});

Page.getLayout = (page) => <SignInAndUpLayoutNoSSR>{page}</SignInAndUpLayoutNoSSR>;

export default Page;
