import dynamic from 'next/dynamic';
import SignInAndUpLayout from '../../components/layouts/SignInAndUpLayout';
import SignUpForm from '../../components/layouts/SignUpForm';

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
