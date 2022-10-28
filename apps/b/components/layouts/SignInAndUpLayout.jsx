// TODO: Move this to the ui packages when tailwind is setup.

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import React from 'react';

const fullConfig = resolveConfig(tailwindConfig);

/**
 * @type {React.FC<{
 *  children: import('react').ReactNode
 * }>}
 */
const LargeLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex flex-row justify-center items-center">
      <Image src="/siwma-bg.jpg" alt="SIWMA Background" fill />
      <div className="flex flex-col justify-center items-center p-16 w-full h-full">
        <section className="flex flex-col w-full max-w-xl max-h-full bg-base-100 rounded-xl z-10">
          <header className="flex flex-row items-center justify-center p-8">
            <div className="relative h-16 w-full">
              <Image src="/siwma-logo.png" alt="SIWMA Banner" fill className="object-contain" />
            </div>
          </header>
          <div
            className="bg-base-200"
            style={{
              height: 1,
            }}
          />
          <div className="flex flex-col flex-1 w-full p-8 overflow-y-auto">{children}</div>
        </section>
      </div>
    </div>
  );
};

/**
 * @type {React.FC<{
 *  children: import('react').ReactNode
 * }>}
 */
const SmallLayout = ({ children }) => {
  return (
    <div className="w-screen h-screen flex">
      <Image src="/siwma-bg.jpg" alt="SIWMA Banner" fill className="object-cover" />
      <section className="flex flex-col w-full h-full z-10">
        <header className="flex flex-row items-center justify-center bg-base-100 py-4 rounded-b-xl">
          <div className="relative h-8 w-full">
            <Image src="/siwma-logo.png" alt="SIWMA Background" fill className="object-contain" />
          </div>
        </header>
        <div className="relative h-1/4">
          {/* <Image src="/siwma-bg.jpg" alt="SIWMA Banner" fill className="object-cover" /> */}
        </div>
        <div className="flex flex-col gap-4 flex-1 overflow-y-auto bg-base-100 p-8 rounded-t-xl">
          {children}
        </div>
      </section>
    </div>
  );
};

/**
 * @type {React.FC<{
 *  children: import('react').ReactNode
 * }>}
 */
const SignInAndUpLayout = ({ children }) => {
  // Here, we are using the tailwind config. We will fallback to 0px if the config is not found.
  const isMobile = useMediaQuery({
    query: `(max-width: ${fullConfig.theme?.screens?.sm ?? '0px'})`,
  });

  if (isMobile) {
    return <SmallLayout>{children}</SmallLayout>;
  }
  return <LargeLayout>{children}</LargeLayout>;
};

export default SignInAndUpLayout;
