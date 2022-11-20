import { useSupabaseClient } from '@supabase/auth-helpers-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';
import Alert from '../components/alerts/Alert';
import ResetPasswordForm from '../components/layouts/ResetPasswordForm';
import SignInAndUpLayout from '../components/layouts/SignInAndUpLayout';

/**
 * Implementation Detail:
 * 1. User clicks on "Forget Password", receives an email to reset their password.
 * 2. When the user clicks "Reset Password" in the email, they are redirected to this page.
 * 3. When the user is redirected, they are logged in as the user of the email. (This is a glorified magic link).
 * 4. The user is then prompted to enter a new password.
 * 5. The user gets redirected back to the home page.
 */

/**
 * To minimise the amount of components needed to be rendered,
 * and to ensure separation of concerns, we will handle the register
 * logic here.
 *
 * @type {React.FC}
 */
const ResetPasswordFormWrap = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const {
    mutate: resetPassword,
    isLoading: resetPasswordIsLoading,
    error: resetPasswordError,
    isSuccess: resetPasswordIsSuccess,
    isError: resetPasswordIsError,
  } = useMutation(
    async ({ newPassword }) => {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        router.push('/');
      },
    }
  );

  // useEffect(() => {
  //   supabase.auth.onAuthStateChange(async (event, session) => {
  //     if (event === 'PASSWORD_RECOVERY') {
  //       console.log('RECOVERY!');
  //       const newPassword = prompt('What would you like your new password to be?');

  //       const { data, error } = await supabase.auth.updateUser({ password: newPassword });

  //       if (data) alert('Password updated successfully!');

  //       if (error) alert('There was an error updating your password.');
  //     }
  //   });
  // }, [supabase]);

  let formNote = null;
  if (resetPasswordIsError) {
    formNote = (
      <Alert level="error" message={resetPasswordError?.message ?? 'Something went wrong!'} />
    );
  } else if (resetPasswordIsSuccess) {
    formNote = <Alert level="success" message="Password was successfully reset!" />;
  }

  return (
    <ResetPasswordForm
      onResetPassword={resetPassword}
      formNote={formNote}
      disabled={resetPasswordIsLoading}
    />
  );
};

const Page = () => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col">
      <h1 className="font-bold text-xl">Reset Password</h1>
      <p>Please specify your new password.</p>
    </div>
    <ResetPasswordFormWrap />
  </div>
);

const SignInAndUpLayoutNoSSR = dynamic(() => Promise.resolve(SignInAndUpLayout), {
  ssr: false,
});

Page.getLayout = (page) => <SignInAndUpLayoutNoSSR>{page}</SignInAndUpLayoutNoSSR>;

export default Page;
