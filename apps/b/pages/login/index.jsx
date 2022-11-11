import { useSupabaseClient } from '@supabase/auth-helpers-react';
import dynamic from 'next/dynamic';
import React from 'react';
import { useMutation } from 'react-query';
import SignInAndUpLayout from '../../components/layouts/SignInAndUpLayout';
import SignInForm from '../../components/layouts/SignInForm';

/**
 * To minimise the amount of components needed to be rendered,
 * and to ensure separation of concerns, we will handle the register
 * logic here.
 *
 * @type {React.FC}
 */
const LoginFormWrap = () => {
  const supabase = useSupabaseClient();
  const register = useMutation(async ({ email, password }) => {
    supabase.auth.admin.createUser({
      email,
      password,
    });
    supabase.auth.signUp({
      email,
      password,
    });
  });

  return <SignInForm />;
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
