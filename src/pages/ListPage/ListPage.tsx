import { FC } from 'react';
import { Header } from '~/components/list/Header';
import cn from 'clsx';
import { DynamicModuleLoader } from '~/store/components/DynamicModuleLoader';
import userReducer from '~/store/slices/userSlice';
import { UsersTable } from '~/components/list/UsersTable';

import styles from './ListPage.module.scss';

export const ListPage: FC = () => {
  return (
    <DynamicModuleLoader reducers={{ user: userReducer }}>
      <div className={cn(styles.wrapper, 'container')}>
        <Header />
        <UsersTable />
      </div>
    </DynamicModuleLoader>
  );
};
