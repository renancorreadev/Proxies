import { PropsWithChildren, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthProvider';

export function PrivateRoute(props: PropsWithChildren) {
  const authContext = useContext(AuthContext);

  if (!authContext.auth) {
    return <Navigate to="/login" />;
  }

  return props.children;
}
