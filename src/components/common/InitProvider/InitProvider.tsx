import { FC, ReactElement, useState, useEffect } from 'react';
import { AppLoader } from '~/components/common/AppLoader';
import { delay } from '~/utils/delay';
import { LocalStorageKeys, RouterPaths, START_DELAY } from '~/utils/constants';
import { localStorageHelper } from '~/utils/localStorageHelper';
import { useAppActions } from '~/store/hooks';
import { loginActions } from '~/store/slices/loginSlice';
import { userActions } from '~/store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

interface InitProviderProps {
  children: ReactElement;
}

export const InitProvider: FC<InitProviderProps> = ({ children }) => {
  const [seed] = useState(() => localStorageHelper.load(LocalStorageKeys.SEED) ?? null);
  const [customUsers] = useState(() => localStorageHelper.load(LocalStorageKeys.USERS) ?? null);
  const [isReady, setIsReady] = useState(false);

  const actionsLogin = useAppActions(loginActions);
  const actionsUser = useAppActions(userActions);

  const navigate = useNavigate();

  useEffect(() => {
    if (seed) {
      if (customUsers) actionsUser.restoreUsers(customUsers);
      actionsLogin.setSeed(seed);
      navigate(RouterPaths.USERS);
    }
  }, [seed]);

  useEffect(() => {
    delay(START_DELAY, () => setIsReady(true));
  }, []);

  if (!isReady) return <AppLoader />;

  return children;
};
