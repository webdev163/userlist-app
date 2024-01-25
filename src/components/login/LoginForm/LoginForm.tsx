import { FC, useState } from 'react';
import cn from 'clsx';
import { localStorageHelper } from '~/utils/localStorageHelper';
import { useAppActions } from '~/store/hooks';
import { loginActions } from '~/store/slices/loginSlice';
import { useNavigate } from 'react-router-dom';

import styles from './LoginForm.module.scss';

export const LoginForm: FC = () => {
  const [seed, setSeed] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const actions = useAppActions(loginActions);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeed(e.target.value);
  };

  const handleClick = () => {
    if (seed === '') {
      setIsError(true);
      return;
    }
    localStorageHelper.add('seed', seed);
    actions.setSeed(seed);
    navigate('/list');
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Добро пожаловать</h1>
      <div className={styles.inner}>
        <span className={styles.placeholder}>Seed</span>
        <input className={cn(styles.input, isError && styles.error)} value={seed} onChange={handleInput} />
      </div>
      <button className={styles.btn} onClick={handleClick}>
        Войти
      </button>
    </div>
  );
};
