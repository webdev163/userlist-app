import { FC } from 'react';
import AppInput from '~/components/common/AppInput';

import styles from './LoginForm.module.scss';

export const LoginForm: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Добро пожаловать</h1>
      <AppInput title="Seed" className={styles.input} />
      <button className={styles.btn}>Войти</button>
    </div>
  );
};
