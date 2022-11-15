import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import { createServiceSupabaseClient } from '@inc/utils';
import Alert from '../components/alerts/Alert';
import RegisterForm from '../components/layouts/RegisterForm';
import SignInAndUpLayout from '../components/layouts/SignInAndUpLayout';

const propTypes = {
  email: PropTypes.string,
  companyName: PropTypes.string,
  defaultFullname: PropTypes.string,
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
    <SignUpForm />
  </div>
);

const SignInAndUpLayoutNoSSR = dynamic(() => Promise.resolve(SignInAndUpLayout), {
  ssr: false,
});

Page.getLayout = (page) => <SignInAndUpLayoutNoSSR>{page}</SignInAndUpLayoutNoSSR>;

export default Page;
