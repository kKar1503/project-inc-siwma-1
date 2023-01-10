import '@inc/styles/globals.css';
import {useRouter} from 'next/router';
import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import {SessionContextProvider, useSupabaseClient, useUser} from '@supabase/auth-helpers-react';
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {Header} from '@inc/ui';
import AuthenticationGuard from '../components/auth/AuthenticationGuard';
import AuthorizationGuard from '../components/auth/AuthorizationGuard';
import AppUserProvider from '../components/auth/UserProvider';
import Error404 from '../components/fallbacks/Error404';


const queryClient = new QueryClient();

const propTypes = {
  // If getServerSideProps is used, we cannot guarantee the shape of the page props
  // as all page props are passed down through this component.
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.any,
  Component: PropTypes.elementType,
};

const DisallowNonAuthenticatedFallback = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/login?redirect=${router.asPath}`);
  }, [router]);
  return <div>Not allowed</div>;
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
const MyApp = ({Component, pageProps}) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <QueryClientProvider client={queryClient}>
        <LayoutView Component={Component} pageProps={pageProps}/>
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

MyApp.propTypes = propTypes;

export default MyApp;

const LayoutView = ({Component, pageProps}) => {
  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const {
    data: categoryData,
    // status: categoryStatus,
    // isLoading: categoryIsLoading,
  } = useQuery(['get_category'], () => supabase.from('category').select('*'));

  const getLayout = Component.getLayout || ((page) => page);
  const {roles, aclAbilities, allowAuthenticated, allowNonAuthenticated} = Component;
  const {data = undefined} = categoryData || {};
  // eslint-disable-next-line no-nested-ternary
  const pageTitle = Component.title
    // custom title : regular title
    ? Component.title : (() => {
      const {pathname} = router;
      const path = pathname.split('/');
      let page = path[path.length - 1];
      // account for index page
      if (page === '[category]') page = router.query.category.toString();
      // check if page is a parameter (e.g. [category]) has [ and ]
      else if (/\[.*]/.test(page)) page = path[path.length - 2];

      // replace '-' to ' ' and capitalize first letter of each word
      return page
        .replace(/-/g, ' ')
        .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

    }
    )();
  return (
    <AppUserProvider>
      <AuthenticationGuard
        disallowAuthenticatedFallback={<Error404/>}
        disallowNonAuthenticatedFallback={<DisallowNonAuthenticatedFallback/>}
        allowAuthenticated={allowAuthenticated}
        allowNonAuthenticated={allowNonAuthenticated}
      >
        <AuthorizationGuard roles={roles} fallback={<Error404/>} aclAbilities={aclAbilities}>
          <title>{pageTitle}</title>
          {(Component && Component.ignoreHeader) ||
              <Header categoryData={data} isLoggedIn={user !== null}/>}
          {getLayout(<Component {...pageProps} />)}
        </AuthorizationGuard>
      </AuthenticationGuard>
    </AppUserProvider>
  );
}

LayoutView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.any,
  Component: PropTypes.elementType,
}
