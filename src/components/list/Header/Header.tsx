import { FC, useState } from 'react';
import cn from 'clsx';
import { useAppActions } from '~/store/hooks';
import { loginActions } from '~/store/slices/loginSlice';
import { userActions } from '~/store/slices/userSlice';
import { localStorageHelper } from '~/utils/localStorageHelper';
import { useNavigate } from 'react-router-dom';
import { AppModal } from '~/components/common/AppModal';
import { NewUser } from '~/components/list/NewUser';

import styles from './Header.module.scss';

export const Header: FC = () => {
  const [isModalActive, setIsModalActive] = useState(false);

  const onModalOpen = () => {
    setIsModalActive(true);
  };

  const onModalClose = () => {
    setIsModalActive(false);
  };

  const actionsLogin = useAppActions(loginActions);
  const actionsUser = useAppActions(userActions);

  const navigate = useNavigate();

  const handleLogout = () => {
    actionsLogin.emptySeed();
    actionsUser.emptyUsers();
    localStorageHelper.remove('seed');
    localStorageHelper.remove('users');
    navigate('/');
  };

  return (
    <>
      <div className={styles.wrapper}>
        <button className={cn(styles.btn, styles.add)} onClick={onModalOpen}>
          Добавить пользователя
        </button>
        <button className={cn(styles.btn, styles.exit)} onClick={handleLogout}>
          Выйти
        </button>
      </div>
      <AppModal isOpened={isModalActive} onClose={onModalClose}>
        <NewUser onClose={onModalClose} />
      </AppModal>
    </>
  );
};
