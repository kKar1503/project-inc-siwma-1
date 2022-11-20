import '@inc/styles/globals.css';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

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
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

MyApp.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.any,
  Component: PropTypes.elementType,
};

export default MyApp;
