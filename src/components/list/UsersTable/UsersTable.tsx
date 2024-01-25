import { FC, useEffect } from 'react';
import cn from 'clsx';
import { useAppActions } from '~/store/hooks';
import { useAppSelector } from '~/store/hooks';
import { userActions, selectUsers } from '~/store/slices/userSlice';
import { loginSelectors } from '~/store/slices/loginSlice';

import styles from './UsersTable.module.scss';

export const UsersTable: FC = () => {
  const seed = useAppSelector(loginSelectors.selectSeed);
  const usersData = useAppSelector(selectUsers);

  const actions = useAppActions(userActions);

  const fetchData = (seed: string) => {
    actions.fetchUsers(seed);
  };

  // const handleUserEdit = () => {};

  useEffect(() => {
    if (seed && usersData && usersData.length === 0) fetchData(seed);
  }, [usersData]);

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
                    // onClick={() => handleUserEdit(user.id)}
                  >
                    Редактировать
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
