import { useSupabaseClient } from '@supabase/auth-helpers-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { createServiceSupabaseClient } from '@inc/utils';
import { Alert } from '@inc/ui';
import RegisterForm from '../components/layouts/RegisterForm';
import SignInAndUpLayout from '../components/layouts/SignInAndUpLayout';

const propTypes = {
  email: PropTypes.string,
  companyName: PropTypes.string,
  defaultFullname: PropTypes.string,
};

/**
 * Register form wrapper to deocuple the fetching logic from the from component.
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const RegisterFormWrap = ({ email, companyName, defaultFullname }) => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { mutate: login } = useMutation(
    async ({ email: _email, password }) => {
      const { data, error } = await supabase.auth.signInWithPassword({ email: _email, password });
      if (error) {
        throw error;
      }
      return data;
    },
    {
      onSuccess: () => {
        router.push('/');
      },
      onError: (error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        router.push('/login');
      },
    }
  );

  const {
    mutate: register,
    isLoading: registerIsLoading,
    isError: registerIsError,
    isSuccess: registerIsSuccess,
    error: registerError,
  } = useMutation(
    async ({ fullname, password, phone }) => {
      // TODO: Move this out to a separate file.
      const response = await fetch(`/api/auth/register?token=${router.query.token}`, {
        method: 'POST',
        body: JSON.stringify({
          fullname,
          password,
          phone,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.error || 'Something went wrong.');
      }
      return body;
    },
    {
      onMutate: async ({ email: _email, password, phone }) => ({ email: _email, password, phone }),
      onSuccess: (data, variables, context) => {
        login({
          email,
          password: context.password,
        });
      },
    }
  );

  let formNote = null;
  if (registerIsError) {
    formNote = (
      <Alert
        level="error"
        message={registerError?.message || 'Something went wrong. Please try again later.'}
      />
    );
  } else if (registerIsSuccess) {
    formNote = (
      <Alert
        level="success"
        message="You have successfully registered. You will be redirected to the login page shortly."
      />
    );
  }

  return (
    <RegisterForm
      companyName={companyName}
      email={email}
      defaultFullname={defaultFullname}
      onRegister={register}
      formNote={formNote}
      disabled={registerIsLoading}
    />
  );
};

RegisterFormWrap.propTypes = propTypes;

/**
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const Page = ({ companyName, email, defaultFullname }) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col">
      <h1 className="font-bold text-xl">Register</h1>
      <p>Register your account here.</p>
    </div>
    <RegisterFormWrap companyName={companyName} email={email} defaultFullname={defaultFullname} />
  </div>
);

Page.propTypes = propTypes;

const SignInAndUpLayoutNoSSR = dynamic(() => Promise.resolve(SignInAndUpLayout), {
  ssr: false,
});

Page.getLayout = (page) => <SignInAndUpLayoutNoSSR>{page}</SignInAndUpLayoutNoSSR>;
Page.allowNonAuthenticated = true;
Page.allowAuthenticated = true;

export default Page;

/**
 * TODO: Move this out to a separate file.
 * @param {SupabaseClient} supabase
 * @param {string} token
 */
async function getInviteByToken(supabase, token) {
  const result = await supabase
    .from('invite')
    .select('*, companies:company(*)')
    .eq('token', token)
    .maybeSingle();
  return result;
}

/**
 *
 * Why is this for?
 * Invites SHOULD NOT be exposed to the front user. RLS is NOT sufficient in protecting
 * the retrieval for a specific invite as:
 * 1. We would need to expose the invite table to the front user.
 * 2. We cannot use RLS to filter which invite belongs to which user as they are not authenticated.
 *
 * @type {import('next').GetServerSideProps}
 */
export const getServerSideProps = async ({ query }) => {
  const { token } = query;
  if (!token || token instanceof Array) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }

  const serviceSupabase = createServiceSupabaseClient();

  const { data: invite, error: inviteError } = await getInviteByToken(serviceSupabase, token);
  if (inviteError) {
    // TODO: Use a proper logging library to log the error.
    // eslint-disable-next-line no-console
    console.error(inviteError);
    return {
      redirect: {
        destination: '/login',
      },
    };
  }
  if (!invite) {
    return {
      redirect: {
        destination: '/login',
      },
    };
  }

  return {
    props: {
      email: invite.email ?? null,
      companyName: invite.companies?.name ?? null,
      defaultFullname: invite.name ?? null,
    },
  };
};
