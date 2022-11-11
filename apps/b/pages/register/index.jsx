import { useSupabaseClient } from '@supabase/auth-helpers-react';
import dynamic from 'next/dynamic';
import { isError, useMutation } from 'react-query';
import RegisterForm from '../../components/layouts/RegisterForm';
import SignInAndUpLayout from '../../components/layouts/SignInAndUpLayout';

/**
 * Register form wrapper to deocuple the fetching logic from the from component.
 *
 * @type {React.FC}
 */
const RegisterFormWrap = () => {
  const supabase = useSupabaseClient();
  const {
    mutate: register,
    isLoading: registerIsLoading,
    isError: registerIsError,
    isSuccess: registerIsSuccess,
  } = useMutation(async ({ email, password }) => {
    // TODO: Move this out to a separate file.
    const { body } = await fetch('/api/auth/register', {
      body: {
        email,
        password,
      },
    });
  });

  let formNote = null;
  if (registerIsError) {
    formNote = (
      <div className="flex flex-col alert alert-info">
        <p className="font-bold">Error!</p>
        <p>An error occurred when registering!</p>
      </div>
    );
  } else if (registerIsSuccess) {
    formNote = (
      <div className="flex flex-col alert alert-success">
        <p className="font-bold">Success</p>
        <p>Your account was successfully registered! Redirecting you to the login page.</p>
      </div>
    );
  }

  return <RegisterForm onRegister={register} formNote={formNote} disabled={registerIsLoading} />;
};

/**
 * @type {import("next").NextPage}
 */
const Page = () => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col">
      <h1 className="font-bold text-xl">Register</h1>
      <p>Register your account here.</p>
    </div>
    <RegisterFormWrap />
  </div>
);

const SignInAndUpLayoutNoSSR = dynamic(() => Promise.resolve(SignInAndUpLayout), {
  ssr: false,
});

Page.getLayout = (page) => <SignInAndUpLayoutNoSSR>{page}</SignInAndUpLayoutNoSSR>;

export default Page;
