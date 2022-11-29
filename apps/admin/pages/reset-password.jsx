import { useSupabaseClient } from '@supabase/auth-helpers-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Alert } from '@inc/ui';
import ResetPasswordForm from '../components/layouts/ResetPasswordForm';
import SignInAndUpLayout from '../components/layouts/SignInAndUpLayout';

/**
 * Implementation Detail:
 * 1. User clicks on "Forget Password", receives an email to reset their password.
 * 2. When the user clicks "Reset Password" in the email, they are redirected to this page.
 * 3. When the user is redirected, they are logged in as the user of the email. (This is a glorified magic link).
 * 4. The user is then prompted to enter a new password.
 * 5. The user gets redirected back to the home page.
 *
 * Implementation Challenges:
 * - Because the user is automatically logged in after clicking the "Reset Password" link in the email, we can assume
 * a 'SIGNED_IN' event triggers when the user is redirected to this page. However, the 'SIGNED_IN' event does not guarantee
 * that the user was redirected by reset password link. In theory, we can listen in for a 'PASSWORD_RECOVERY' event, however
 * it does not seem to trigger. Knowing that, we have no way of knowing if the user was redirected by a reset password link
 * OR logged in by other means.
 * - The 'SIGNED_IN' event MAY fire after the page has loaded. This means that we can only assume if the request is deemed as
 * 'valid' upon the 'SIGNED_IN' event. Thus, we cannot do a redirect on page load or assume that the user is logged in. As a
 * fallback measure to indicate something might have went wrong, an alert is shown.
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
  const [loaded, setLoaded] = useState(false);
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

  useEffect(() => {
    const { data: authSubscription } = supabase.auth.onAuthStateChange(async (event, session) => {
      // PASSWORD_RECOVERY does not seem to work as expected. Use SIGNED_IN instead to achieve a
      // similar effect.
      if (event === 'SIGNED_IN') {
        setLoaded(true);
      }
    });
    return () => {
      authSubscription.subscription.unsubscribe();
    };
  }, [supabase]);

  let formNote = null;
  if (resetPasswordIsError) {
    formNote = (
      <Alert level="error" message={resetPasswordError?.message ?? 'Something went wrong!'} />
    );
  } else if (resetPasswordIsSuccess) {
    formNote = <Alert level="success" message="Password was successfully reset!" />;
  }

  if (!loaded) {
    return <Alert level="info" message="Hmm... Why are you here?" />;
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
