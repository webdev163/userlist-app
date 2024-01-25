import { FC, useEffect, useState } from 'react';
import cn from 'clsx';
import { useAppActions } from '~/store/hooks';
import { useAppSelector } from '~/store/hooks';
import { userActions, selectUsers, selectPage } from '~/store/slices/userSlice';
import { loginSelectors } from '~/store/slices/loginSlice';
import { InView } from 'react-intersection-observer';

import styles from './UsersTable.module.scss';
import { AppModal } from '~/components/common/AppModal';
import { ModalForm } from '../ModalForm';
import { User } from '~/types/models';

export const UsersTable: FC = () => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  const seed = useAppSelector(loginSelectors.selectSeed);
  const usersData = useAppSelector(selectUsers);
  const page = useAppSelector(selectPage);

  const [isModalActive, setIsModalActive] = useState(false);

  const onModalOpen = () => {
    setIsModalActive(true);
  };

  const onModalClose = () => {
    setIsModalActive(false);
  };

  const actions = useAppActions(userActions);

  const fetchData = (seed: string, page: number = 1) => {
    actions.fetchUsers({ seed, page });
  };

  const handleNextPage = (inView: boolean) => {
    if (inView) actions.increasePage();
  };

  const handleUserEdit = (user: User) => {
    setCurrentUser(user);
    onModalOpen();
  };

  useEffect(() => {
    if (seed && page) fetchData(seed, page);
  }, [seed, page]);

  if (!usersData || usersData.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.index}>№</th>
            <th className={styles.lastname}>Фамилия</th>
            <th className={styles.firstname}>Имя</th>
            <th className={styles.gender}>Пол</th>
            <th className={styles.email}>Почта</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          {usersData?.map((user, index) => {
            return (
              <tr key={user.id}>
                <td className={styles.index}>{index + 1}</td>
                <td className={styles.lastname}>{user.name.last}</td>
                <td className={styles.firstname}>{user.name.first}</td>
                <td className={styles.gender}>{user.gender === 'male' ? 'Мужской' : 'Женский'}</td>
                <td className={styles.email}>{user.email}</td>
                <td className={styles.btncell}>
                  <button
                    className={cn(styles.btn, !user.isCustom && styles.disabled)}
                    onClick={() => handleUserEdit(user)}
                  >
                    Редактировать
                  </button>
                </td>
              </tr>
            );
          })}
          <InView as="tr" onChange={handleNextPage} className={styles.trigger} />
        </tbody>
      </table>
      <AppModal isOpened={isModalActive} onClose={onModalClose}>
        <ModalForm onClose={onModalClose} currentUser={currentUser} />
      </AppModal>
    </div>
  );
};
