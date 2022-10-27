import Image from 'next/image';

/**
 * Following SGDS guidelines for form fields:
 * https://designsystem.tech.gov.sg/components/text-input
 *
 * @type {import("next").NextPage<{
 *  className?: string;
 * }>}
 */
const LoginForm = ({ className }) => {
  return (
    <form className="flex flex-col w-full">
      <label className="flex flex-col gap-2">
        E-Mail
        <input className="input input-bordered" />
      </label>
    </form>
  );
};

/**
 * @type {import("next").NextPage}
 */
const Page = () => {
  return (
    <div className="w-screen min-h-screen flex flex-row justify-center items-center">
      <section className="flex flex-col gap-4 w-full p-8 max-w-5xl bg-base-100 rounded-xl">
        <header>
          <Image src="" alt="SIMWA Banner" />
        </header>
        <div
          className="bg-neutral-content"
          style={{
            height: 1,
          }}
        />
        <h1 className="font-bold text-xl">Login</h1>
        <LoginForm />
      </section>
    </div>
  );
};

export default Page;
