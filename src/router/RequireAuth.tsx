import { Navigate } from 'react-router-dom';
import { RouterPaths } from '~/utils/constants';
import { useAppSelector } from '~/store/hooks';
import { loginSelectors } from '~/store/slices/loginSlice';

interface RequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const seed = useAppSelector(loginSelectors.selectSeed);

  if (!seed) {
    return <Navigate to={RouterPaths.LOGIN} replace />;
  }

  return children;
};
