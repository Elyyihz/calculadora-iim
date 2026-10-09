import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useInternalAuth } from '../../context/InternalAuthContext';

/**
 * Route protection guard for the internal UrbanFlow team workspace.
 *
 * Redirects unauthenticated access requests to the internal login challenge.
 */
export const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated } = useInternalAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/interno/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};
