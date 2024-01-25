import { FC, useState } from 'react';
import cn from 'clsx';
import { useAppActions } from '~/store/hooks';
import { loginActions } from '~/store/slices/loginSlice';
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

  const actions = useAppActions(loginActions);

  const navigate = useNavigate();

  const handleLogout = () => {
    actions.emptySeed();
    localStorageHelper.remove('seed');
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
        <NewUser />
      </AppModal>
    </>
  );
};
