import '@inc/styles/globals.css';
import logger from '@inc/utils/logger';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthGuard from '../components/auth/AuthGuard';

const queryClient = new QueryClient();

const propTypes = {
  // If getServerSideProps is used, we cannot guarantee the shape of the page props
  // as all page props are passed down through this component.
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.any,
  Component: PropTypes.elementType,
};

/**
 * TODO: NextJS 13 Future migrations with layouts.
 * NextJS 13 offers a new layout system that will allow us to have a more
 * flexible layout system.
 *
 * As of this writing, NextJS just released and supabase is still using NextJS 12.
 * As such, we will use the old way of doing layouts until we migrate.
 *
 * @type {import('next').NextPage<PropTypes.InferProps<typeof propTypes>>}
 */
const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [supabase] = useState(() => createBrowserSupabaseClient());
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);
  console.log('Log');

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <QueryClientProvider client={queryClient}>
        <AuthGuard
          authGuard={Component.authGuard}
          loader={<div className="w-full h-full bg-slate-500">Loading...</div>}
          onError={(error) => {
            logger(
              {
                color: 'red',
              },
              error
            );
          }}
          onFailAuthGuard={() => {
            // window.location.href = '/login';
            router.push(`/login`);
          }}
        >
          {getLayout(<Component {...pageProps} />)}
        </AuthGuard>
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

MyApp.propTypes = propTypes;

export default MyApp;
