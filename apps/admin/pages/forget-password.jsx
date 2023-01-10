import { useSupabaseClient } from '@supabase/auth-helpers-react';
import dynamic from 'next/dynamic';
import React from 'react';
import { useMutation } from 'react-query';
import { Alert } from '@inc/ui';
import ForgetPasswordForm from '../components/layouts/ForgetPasswordForm';
import SignInAndUpLayout from '../components/layouts/SignInAndUpLayout';

/**
 * To minimise the amount of components needed to be rendered,
 * and to ensure separation of concerns, we will handle the register
 * logic here.
 *
 * @type {React.FC}
 */
const ForgetPasswordFormWrap = () => {
  const supabase = useSupabaseClient();
  const {
    mutate: sendResetPassword,
    isLoading: sendResetPasswordIsLoading,
    error: sendResetPasswordError,
    isSuccess: sendResetPasswordIsSuccess,
    isError: sendResetPasswordIsError,
  } = useMutation(async ({ email }) => {
    // Glorified Magic Link. https://github.com/supabase/supabase/discussions/3360
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      throw error;
    }
    return data;
  });

  let formNote = null;
  if (sendResetPasswordIsError) {
    formNote = (
      <Alert level="error" message={sendResetPasswordError?.message ?? 'Something went wrong!'} />
    );
  } else if (sendResetPasswordIsSuccess) {
    formNote = <Alert level="success" message="An email has been sent to reset your password." />;
  }

  return (
    <ForgetPasswordForm
      onSendResetPassword={sendResetPassword}
      formNote={formNote}
      disabled={sendResetPasswordIsLoading}
    />
  );
};

const Page = () => {
  const t = 0;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="font-bold text-xl">Forget Password</h1>
        <p>Please enter an email associated with your account.</p>
      </div>
      <ForgetPasswordFormWrap />
    </div>
  );
};

const SignInAndUpLayoutNoSSR = dynamic(() => Promise.resolve(SignInAndUpLayout), {
  ssr: false,
});

Page.getLayout = (page) => <SignInAndUpLayoutNoSSR>{page}</SignInAndUpLayoutNoSSR>;

// -- Configure AuthGuard -- //
Page.allowAuthenticated = true;
Page.roles = ['admin'];
// Page.aclAbilities = [['View', 'Users']];

export default Page;
