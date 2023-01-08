import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppUserContext from '../../contexts/AppUserContext';
import defineUserAbilitiesFor from '../../casl/casl-abilities';

/**
 *
 * @type {React.FC<PropTypes.InferProps<typeof propTypes>>}
 */
const AuthorizationGuard = ({ children, fallback, loader, roles, aclAbilities }) => {
  const { isLoading, appUser, supabaseUser } = useContext(AppUserContext);

  // If no roles are provided, we allow access.
  if (roles === undefined && aclAbilities === undefined) {
    return children;
  }

  if (isLoading) {
    return loader ?? null;
  }

  if (appUser && supabaseUser) {
    // Check if the roles required is admin, and if the user is admin.

    if (roles !== undefined) {
      if (!(roles.includes('admin') && appUser.permissions === 1)) {
        return fallback ?? null;
      }
    }

    // Check if the user has the required roles.
    if (aclAbilities !== undefined) {
      const ability = defineUserAbilitiesFor({
        supabaseUser,
        appUser,
      });
      const canAccess = aclAbilities.some((abilities) => ability.can(...abilities));
      if (!canAccess) {
        return fallback ?? null;
      }
    }

    // Do the same for the other roles...
    return children;
  }
  return fallback ?? null;
};

const propTypes = {
  children: PropTypes.node.isRequired,
  loader: PropTypes.node,
  fallback: PropTypes.node,
  roles: PropTypes.arrayOf(PropTypes.string),
  aclAbilities: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

AuthorizationGuard.propTypes = propTypes;

export default AuthorizationGuard;
