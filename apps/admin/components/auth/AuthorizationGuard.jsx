import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppUserContext from '../../contexts/AppUserContext';

/**
 *
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 */
const AuthorizationGuard = ({ children, fallback, loader, roles }) => {
  const { isLoading, appUser } = useContext(AppUserContext);

  // If no roles are provided, we allow access.
  if (roles === undefined) {
    return children;
  }

  if (isLoading) {
    return loader ?? null;
  }

  if (appUser) {
    // Check if the roles required is admin, and if the user is admin.
    if (roles.includes('admin') && appUser.permissions === 1) {
      return children;
    }
    // Do the same for the other roles...
  }
  return fallback;
};

const propTypes = {
  children: PropTypes.node.isRequired,
  loader: PropTypes.node,
  fallback: PropTypes.node,
  roles: PropTypes.arrayOf(PropTypes.string),
};

AuthorizationGuard.propTypes = propTypes;

export default AuthorizationGuard;
