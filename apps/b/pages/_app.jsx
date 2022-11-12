/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import '@inc/styles/globals.css';
import { SessionContextProvider, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { QueryClientProvider, QueryClient } from 'react-query';

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
  const [supabase] = useState(() => createBrowserSupabaseClient());
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

MyApp.propTypes = propTypes;

export default MyApp;
