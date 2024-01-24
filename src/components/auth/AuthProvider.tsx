import { FC, ReactElement, useState, useEffect, useCallback } from 'react';
import { localStorageHelper } from '~/utils/localStorageHelper';
import { useNavigate } from 'react-router-dom';
import { useAppActions } from '~/store/hooks';
import { loginActions } from '~/store/slices/loginSlice';

interface AuthProviderProps {
  children: ReactElement | null;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [seed] = useState(() => localStorageHelper.load('seed') ?? null);
  const [isReady, setIsReady] = useState(false);

  const actions = useAppActions(loginActions);

  const navigate = useNavigate();

  const handleRedirect = useCallback(() => {
    if (seed) {
      actions.setSeed(seed);
      navigate('/list');
    } else {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    setIsReady(true);
    handleRedirect();
  }, [seed]);

  if (!isReady) return null;

  return children;
};
