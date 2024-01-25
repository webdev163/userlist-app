import { FC } from 'react';
import cn from 'clsx';

import styles from './Header.module.scss';

export const Header: FC = () => {
  return (
    <div className={styles.wrapper}>
      <button className={cn(styles.btn, styles.add)}>Добавить пользователя</button>
      <button className={cn(styles.btn, styles.exit)}>Выйти</button>
    </div>
  );
};
