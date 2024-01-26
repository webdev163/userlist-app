import { Navigate, useLocation } from 'react-router-dom';
import { RouterPaths } from '~/utils/constants';

interface RequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const auth = true;
  const location = useLocation();

  if (!auth) {
    return <Navigate to={RouterPaths.LOGIN} state={{ from: location }} replace />;
  }

  return children;
};
