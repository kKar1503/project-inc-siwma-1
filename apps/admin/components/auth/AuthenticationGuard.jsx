import { useContext } from 'react';
import PropTypes from 'prop-types';
import AppUserContext from '../../contexts/AppUserContext';

/**
 *
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 */
const AuthenticationGuard = ({
  children,
  disallowAuthenticatedFallback,
  disallowNonAuthenticatedFallback,
  loader,
  allowAuthenticated,
  allowNonAuthenticated,
}) => {
  // useUser() uses useSessionContext() internally and returns the user object.
  // We want to ensure that the user object is derived from a single source (The context),
  // so if the useUser() hook were to change, there won't be any unexpected issues.
  const { isLoading, isAuthenticated } = useContext(AppUserContext);

  if (allowAuthenticated && allowNonAuthenticated) {
    return children;
  }
  if (isLoading) {
    return loader ?? null;
  }

  // If we don't allow authenticated users, and the user is authenticated, we return the fallback.
  if (!allowAuthenticated && isAuthenticated) {
    return disallowAuthenticatedFallback ?? null;
  }
  // If we don't allow non-authenticated users, and the user is not authenticated, we return the fallback.
  if (!allowNonAuthenticated && !isAuthenticated) {
    return disallowNonAuthenticatedFallback ?? null;
  }
  return children;
};

const propTypes = {
  children: PropTypes.node.isRequired,
  loader: PropTypes.node,
  disallowAuthenticatedFallback: PropTypes.node,
  disallowNonAuthenticatedFallback: PropTypes.node,
  allowAuthenticated: PropTypes.bool,
  allowNonAuthenticated: PropTypes.bool,
};

AuthenticationGuard.propTypes = propTypes;

export default AuthenticationGuard;
