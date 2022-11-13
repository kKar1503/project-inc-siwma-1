// TODO: Move this to the ui packages when tailwind is setup.

import PropTypes from 'prop-types';
import resolveConfig from 'tailwindcss/resolveConfig';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import React from 'react';
import tailwindConfig from '../../tailwind.config';

const fullConfig = resolveConfig(tailwindConfig);

const propTypes = {
  children: PropTypes.node,
};

/**
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 */
const LargeLayout = ({ children }) => (
  <div className="relative w-screen h-screen flex flex-row justify-center items-center">
    <Image src="/siwma-bg.jpg" alt="SIWMA Background" className="opacity-60 object-cover" fill />
    <div className="flex flex-col justify-center items-center p-16 w-full h-full">
      <section className="flex flex-col w-full max-w-xl max-h-full bg-base-100 shadow-lg rounded-xl z-10">
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

LargeLayout.propTypes = propTypes;

/**
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 */
const SmallLayout = ({ children }) => (
  <div className="relative w-screen h-screen flex">
    <Image src="/siwma-bg.jpg" alt="SIWMA Banner" fill className="opacity-60 object-cover" />
    <section className="flex flex-col w-full h-full z-10">
      <header className="flex flex-row items-center justify-center bg-base-100 py-4 rounded-b-xl">
        <div className="relative h-8 w-full">
          <Image src="/siwma-logo.png" alt="SIWMA Background" fill className="object-contain" />
        </div>
      </header>
      <div className="relative h-1/3">
        {/* <Image src="/siwma-bg.jpg" alt="SIWMA Banner" fill className="object-cover" /> */}
      </div>
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto bg-base-100 p-8 rounded-t-xl">
        {children}
      </div>
    </section>
  </div>
);

SmallLayout.propTypes = propTypes;

/**
 * HYDRATION WARNING!
 * This component is NOT SSR FRIENDLY DUE TO THE NEED FOR IT TO BE RESPONSIVE!
 * Wrap this component in a dynamic() with no ssr call to prevent it from being rendered on the server.
 *
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 */
const SignInAndUpLayout = ({ children }) => {
  // Danger! Hydration problem! Since the window object is not present in the server, this will always return false.
  // However, if this is run in the client, it will return true if the screen is smaller than the sm breakpoint.
  // Thus, we will have a mismatch UI in the server and client, thus a hydration error.
  const isMobileMediaQuery = useMediaQuery({
    query: `(max-width: ${fullConfig.theme?.screens?.md ?? '0px'})`,
  });

  if (isMobileMediaQuery) {
    return <SmallLayout>{children}</SmallLayout>;
  }
  return <LargeLayout>{children}</LargeLayout>;
};

SignInAndUpLayout.propTypes = propTypes;

export default SignInAndUpLayout;
