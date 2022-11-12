import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import PropTypes from 'prop-types';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import RegisterForm from '../../components/layouts/RegisterForm';
import SignInAndUpLayout from '../../components/layouts/SignInAndUpLayout';
import { createServiceSupabaseClient } from '../../utils';

const propTypes = {
  email: PropTypes.string,
  companyName: PropTypes.string,
};

/**
 * Register form wrapper to deocuple the fetching logic from the from component.
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const RegisterFormWrap = ({ email, companyName }) => {
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
  } = useMutation(
    async ({ fullname, password, phone }) => {
      // TODO: Move this out to a separate file.
      const { body } = await fetch(`/api/auth/register?token=${router.query.token}`, {
        method: 'POST',
        body: {
          fullname,
          password,
          phone,
        },
      });
      return body;
    },
    {
      onMutate: async ({ email: _email, password, phone }) => ({ email: _email, password, phone }),
      onSuccess: (data, variables, context) => {
        login(context);
      },
    }
  );

  let formNote = null;
  if (registerIsError) {
    formNote = (
      <div className="flex flex-col alert alert-info">
        <p className="font-bold">Error!</p>
        <p>An error occurred when registering! Please try again.</p>
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

  return (
    <RegisterForm
      companyName={companyName}
      email={email}
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
const Page = ({ companyName, email }) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col">
      <h1 className="font-bold text-xl">Register</h1>
      <p>Register your account here.</p>
    </div>
    <RegisterFormWrap companyName={companyName} email={email} />
  </div>
);

Page.propTypes = propTypes;

const SignInAndUpLayoutNoSSR = dynamic(() => Promise.resolve(SignInAndUpLayout), {
  ssr: false,
});

Page.getLayout = (page) => <SignInAndUpLayoutNoSSR>{page}</SignInAndUpLayoutNoSSR>;

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
    // .eq('token', token)
    // TODO: Resolve by token.
    .eq('id', 3)
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
 * EP: POST /api/auth/token/<invite_token>
 *
 * @type {import('next').GetServerSideProps}
 */
export const getServerSideProps = async ({ query }) => {
  const { token } = query;
  if (!token || token instanceof Array) {
    return {
      redirect: '/login',
    };
  }

  const serviceSupabase = createServiceSupabaseClient();

  const { data: invite, error: inviteError } = await getInviteByToken(serviceSupabase, token);
  console.log(invite);
  if (inviteError) {
    // TODO: Use a proper logging library to log the error.
    // eslint-disable-next-line no-console
    console.error(inviteError);
    return {
      redirect: '/login',
    };
  }
  if (!invite) {
    return {
      redirect: '/login',
    };
  }

  return {
    props: {
      email: invite.email ?? null,
      companyName: invite.companies?.name ?? null,
    },
  };
};
