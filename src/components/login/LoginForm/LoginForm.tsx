import { FC, useState } from 'react';
import cn from 'clsx';
import { localStorageHelper } from '~/utils/localStorageHelper';
import { useAppActions } from '~/store/hooks';
import { loginActions } from '~/store/slices/loginSlice';
import { useNavigate } from 'react-router-dom';
import { LocalStorageKeys, RouterPaths } from '~/utils/constants';

import styles from './LoginForm.module.scss';

export const LoginForm: FC = () => {
  const [seed, setSeed] = useState('');
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const actions = useAppActions(loginActions);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeed(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (seed === '' || !/^[a-zA-Z]+$/.test(seed)) {
      setIsError(true);
      return;
    }
    localStorageHelper.add(LocalStorageKeys.SEED, seed);
    actions.setSeed(seed);
    navigate(RouterPaths.LIST);
  };

  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <h1 className={styles.title}>Добро пожаловать</h1>
      <div className={styles.inner}>
        <span className={styles.placeholder}>Seed</span>
        <input className={cn(styles.input, isError && styles.error)} value={seed} onChange={handleInput} />
      </div>
      {isError && <p className={styles.note}>*Поле заполнено не корректно</p>}
      <button className={styles.btn} type="submit">
        Войти
      </button>
    </form>
  );
};
