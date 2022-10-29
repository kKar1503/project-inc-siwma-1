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

Page.getLayout = (page) => <SignInAndUpLayout>{page}</SignInAndUpLayout>;

export default Page;
