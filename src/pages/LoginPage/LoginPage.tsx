import { FC } from 'react';
import { LoginForm } from '~/components/login/LoginForm';

import styles from './LoginPage.module.scss';

export const LoginPage: FC = () => {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  );
};
