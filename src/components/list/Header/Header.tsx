import { FC } from 'react';
import cn from 'clsx';
import { useAppActions } from '~/store/hooks';
import { loginActions } from '~/store/slices/loginSlice';
import { localStorageHelper } from '~/utils/localStorageHelper';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';

export const Header: FC = () => {
  const actions = useAppActions(loginActions);

  const navigate = useNavigate();

  const handleLogout = () => {
    actions.emptySeed();
    localStorageHelper.remove('seed');
    navigate('/');
  };

  return (
    <div className={styles.wrapper}>
      <button className={cn(styles.btn, styles.add)}>Добавить пользователя</button>
      <button className={cn(styles.btn, styles.exit)} onClick={handleLogout}>
        Выйти
      </button>
    </div>
  );
};
