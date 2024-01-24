import { FC } from 'react';

import styles from './AppLoader.module.scss';

export const AppLoader: FC = () => {
  return (
    <div className={styles.outer}>
      <div className={styles.wrapper}></div>;
    </div>
  );
};
