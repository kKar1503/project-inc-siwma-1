import dynamic from 'next/dynamic';
import SignInAndUpLayout from '../../components/layouts/SignInAndUpLayout';
import SignInForm from '../../components/layouts/SignInForm';

/**
 * @type {import("next").NextPage}
 */
const Page = () => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col">
      <h1 className="font-bold text-xl">Login</h1>
      <p>Please sign in to your account.</p>
    </div>
    <SignInForm />
  </div>
);

const SignInAndUpLayoutNoSSR = dynamic(() => Promise.resolve(SignInAndUpLayout), {
  ssr: false,
});

Page.getLayout = (page) => <SignInAndUpLayoutNoSSR>{page}</SignInAndUpLayoutNoSSR>;

export default Page;
