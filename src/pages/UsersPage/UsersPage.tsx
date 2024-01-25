import { FC } from 'react';
import { Header } from '~/components/users/Header';
import cn from 'clsx';
import { UsersTable } from '~/components/users/UsersTable';

import styles from './UsersPage.module.scss';

export const UsersPage: FC = () => {
  return (
    <div className={cn(styles.wrapper, 'container')}>
      <Header />
      <UsersTable />
    </div>
  );
};
