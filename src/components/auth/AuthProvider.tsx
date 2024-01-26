import { FC, ReactElement, useState, useEffect, useCallback } from 'react';
import { localStorageHelper } from '~/utils/localStorageHelper';
import { useNavigate } from 'react-router-dom';
import { useAppActions } from '~/store/hooks';
import { loginActions } from '~/store/slices/loginSlice';
import { userActions } from '~/store/slices/userSlice';
import { AppLoader } from '../common/AppLoader';
import { delay } from '~/utils/delay';
import { LocalStorageKeys, RouterPaths, START_DELAY } from '~/utils/constants';

interface AuthProviderProps {
  children: ReactElement | null;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [seed] = useState(() => localStorageHelper.load(LocalStorageKeys.SEED) ?? null);
  const [customUsers] = useState(() => localStorageHelper.load(LocalStorageKeys.USERS) ?? null);
  const [isReady, setIsReady] = useState(false);

  const actionsLogin = useAppActions(loginActions);
  const actionsUser = useAppActions(userActions);

  const navigate = useNavigate();

  const handleRedirect = useCallback(() => {
    if (seed) {
      if (customUsers) actionsUser.restoreUsers(customUsers);
      actionsLogin.setSeed(seed);
      navigate(RouterPaths.USERS);
    } else {
      navigate(RouterPaths.LOGIN);
    }
  }, []);

  useEffect(() => {
    delay(START_DELAY, () => setIsReady(true));
    handleRedirect();
  }, [seed, handleRedirect]);

  if (!isReady) return <AppLoader />;

  return children;
};
