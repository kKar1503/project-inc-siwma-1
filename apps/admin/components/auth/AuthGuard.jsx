import { useSupabaseClient } from '@supabase/auth-helpers-react';
import * as PropType from 'prop-types';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

/**
 *
 * @type {React.FC<import('prop-types').InferProps<typeof propTypes>>}
 */
const AuthGuard = ({ authGuard, children, loader, onError, onFailAuthGuard }) => {
  const supabase = useSupabaseClient();
  const [initialLoaded, setInitialLoaded] = useState(true);
  const {
    data: isValidated,
    isLoading,
    isError,
  } = useQuery(
    // WTF is this query key?
    // According to React query (https://tanstack.com/query/v4/docs/guides/query-keys), query keys MUST BE SERIALIZABLE.
    // Functions passed in ARE NOT SERIALIZABLE so the hash of the function is equivilant to that of 'undefined'.
    // Strings however, are serializable so we convert functions to query keys.
    ['isauth', authGuard?.toString() ?? ''],
    async () => {
      if (!authGuard) {
        return true;
      }
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }

      if (user === null) {
        return false;
      }

      if (authGuard === true) {
        return true;
      }
      const result = authGuard(user);
      if (result instanceof Promise) {
        const resolvedPromiseResult = await result;
        return resolvedPromiseResult;
      }
      return result;
    },
    {
      retry: false,
      refetchInterval: 1000 * 60 * 5,
      onSettled: (data) => {
        setInitialLoaded(false);
        if (!data && onFailAuthGuard) {
          onFailAuthGuard();
        }
      },
      onError: (error) => {
        if (onError) {
          onError(error);
        }
      },
    }
  );

  if (initialLoaded && isLoading) {
    return loader;
  }
  if (isError || !isValidated) {
    return null;
  }

  return children;
};

const propTypes = {
  authGuard: PropType.oneOfType([PropType.func, PropType.bool]),
  loader: PropType.node,
  children: PropType.node.isRequired,
  onError: PropType.func,
  onFailAuthGuard: PropType.func,
};

AuthGuard.propTypes = propTypes;

export default AuthGuard;
