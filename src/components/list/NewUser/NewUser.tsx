import { FC, useState } from 'react';
import cn from 'clsx';
import AppInput from '~/components/common/AppInput';
import { validateTextInput } from '~/utils/validateTextInput';
import { validateEmail } from '~/utils/validateEmail';

import styles from './NewUser.module.scss';

export const NewUser: FC = () => {
  const [inputValues, setInputValues] = useState<{ firstName: string; lastName: string; email: string }>({
    lastName: '',
    firstName: '',
    email: '',
  });
  const [errorArr, setErrorArr] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = [];
    for (const element in inputValues) {
      if (Object.prototype.hasOwnProperty.call(inputValues, element)) {
        const key: keyof typeof inputValues = element as keyof typeof inputValues;
        if (key === 'email' && validateEmail(inputValues[key])) {
          errors.push(element);
        }
        if (key !== 'email' && validateTextInput(inputValues[key])) {
          errors.push(element);
        }
      }
      setErrorArr(errors);
      // if (errors.length > 0) return;
    }
    console.log([...new Set(errors)]);
  };

  const clearError = (name: string) => {
    setErrorArr(errorArr.filter(el => el !== name));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.title}>Новый пользователь</p>

      <div className={styles.radio}>
        <input type="radio" id="male" name="gender" defaultChecked />
        <label htmlFor="male">Мужчина</label>
        <input type="radio" id="female" name="gender" />
        <label htmlFor="female">Женщина</label>
        <div className={styles.slide}></div>
      </div>

      <AppInput
        placeholder="Фамилия*"
        value={inputValues.lastName}
        name="lastName"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValues({ ...inputValues, lastName: e.target.value })
        }
        isError={errorArr.includes('lastName')}
        onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => clearError(e.target.name)}
      />

      <AppInput
        placeholder="Имя*"
        value={inputValues.firstName}
        name="firstName"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValues({ ...inputValues, firstName: e.target.value })
        }
        isError={errorArr.includes('firstName')}
        onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => clearError(e.target.name)}
      />

      <AppInput
        placeholder="Email*"
        value={inputValues.email}
        name="email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValues({ ...inputValues, email: e.target.value })}
        isError={errorArr.includes('email')}
        onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => clearError(e.target.name)}
      />

      {errorArr.length > 0 && <p className={styles.error}>*Некоторые поля заполнены не корректно</p>}

      <button
        className={cn(styles.btn, Object.entries(inputValues).find(([, v]) => v === '') && styles.disabled)}
        type="submit"
      >
        Сохранить
      </button>
    </form>
  );
};
