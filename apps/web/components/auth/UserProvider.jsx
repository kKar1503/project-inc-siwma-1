import { useSessionContext, useSupabaseClient } from '@supabase/auth-helpers-react';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import AppUserContext from '../../contexts/AppUserContext';

const AppUserProvider = ({ children }) => {
  const supabase = useSupabaseClient();
  const { isLoading, session } = useSessionContext();
  const { isLoading: appUserIsLoading, data: appUser } = useQuery(
    ['appUser'],
    async () => {
      const { data, error } = await supabase.from('users').select('*').eq('id', session?.user?.id);
      if (error) {
        throw error;
      }
      return data instanceof Array && data.length > 0 ? data[0] : null;
    },
    {
      enabled: !!session?.user,
    }
  );

  const value = useMemo(
    () => ({
      isLoading: isLoading || appUserIsLoading,
      supabaseUser: session?.user,
      appUser,
      isAuthenticated: !!session?.user && !!appUser,
    }),
    [session, appUser, isLoading, appUserIsLoading]
  );

  return <AppUserContext.Provider value={value}>{children}</AppUserContext.Provider>;
};

AppUserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppUserProvider;
