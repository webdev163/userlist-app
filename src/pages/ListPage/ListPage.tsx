import { FC } from 'react';
import { Header } from '~/components/list/Header';
import cn from 'clsx';
import { UsersTable } from '~/components/list/UsersTable';

import styles from './ListPage.module.scss';

export const ListPage: FC = () => {
  return (
    <div className={cn(styles.wrapper, 'container')}>
      <Header />
      <UsersTable />
    </div>
  );
};
