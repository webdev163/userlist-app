import { FC } from 'react';
import { LoginForm } from '~/components/login/LoginForm';
import cn from 'clsx';

import styles from './LoginPage.module.scss';

export const LoginPage: FC = () => {
  return (
    <div className={cn(styles.wrapper, 'container')}>
      <LoginForm />
    </div>
  );
};
