import PropTypes from 'prop-types';
import { useUser } from '@supabase/auth-helpers-react';

/**
 *
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 */
const AuthenticationGuard = ({ children, fallback, allowAuthenticated, allowNonAuthenticated }) => {
  // This will be resolved on the client side.
  const user = useUser();
  const isAuthenticated = !!user;
  if (!allowAuthenticated && isAuthenticated) {
    return fallback ?? null;
  }
  if (!allowNonAuthenticated && !isAuthenticated) {
    return fallback ?? null;
  }
  return children;
};

const propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  allowAuthenticated: PropTypes.bool,
  allowNonAuthenticated: PropTypes.bool,
};

AuthenticationGuard.propTypes = propTypes;

export default AuthenticationGuard;
