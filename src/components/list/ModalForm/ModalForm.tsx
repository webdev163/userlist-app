import { FC, useState } from 'react';
import cn from 'clsx';
import AppInput from '~/components/common/AppInput';
import { validateTextInput } from '~/utils/validateTextInput';
import { validateEmail } from '~/utils/validateEmail';
import { useAppActions } from '~/store/hooks';
import { userActions } from '~/store/slices/userSlice';
import { User } from '~/types/models';

import styles from './ModalForm.module.scss';

interface ModalFormProps {
  onClose: () => void;
  currentUser?: User;
}

export const ModalForm: FC<ModalFormProps> = ({ onClose, currentUser }) => {
  const [inputValues, setInputValues] = useState<{
    gender: string;
    firstName: string;
    lastName: string;
    email: string;
  }>({
    gender: currentUser?.gender ?? 'male',
    lastName: currentUser?.name.last ?? '',
    firstName: currentUser?.name.first ?? '',
    email: currentUser?.email ?? '',
  });
  const [errorArr, setErrorArr] = useState<string[]>([]);

  const actions = useAppActions(userActions);

  const onRadioChange = () => {
    setInputValues({ ...inputValues, gender: inputValues.gender === 'male' ? 'female' : 'male' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errors: string[] = [];
    for (const element in inputValues) {
      if (Object.prototype.hasOwnProperty.call(inputValues, element)) {
        const key: keyof typeof inputValues = element as keyof typeof inputValues;
        if (key === 'gender') continue;
        if (key === 'email' && validateEmail(inputValues[key])) {
          errors.push(element);
        }
        if (key !== 'email' && validateTextInput(inputValues[key])) {
          errors.push(element);
        }
      }
    }
    errors = [...new Set(errors)];
    setErrorArr(errors);
    if (errors.length > 0) return;
    const newUser = {
      gender: inputValues.gender,
      email: inputValues.email,
      name: {
        first: inputValues.firstName,
        last: inputValues.lastName,
      },
      isCustom: true,
    };
    currentUser ? actions.editCustomUser({ ...newUser, id: currentUser.id }) : actions.addCustomUser(newUser);
    onClose();
  };

  const handleRemove = () => {
    if (currentUser?.id) actions.removeCustomUser(currentUser.id);
    onClose();
  };

  const clearError = (name: string) => {
    setErrorArr(errorArr.filter(el => el !== name));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.title}>{currentUser ? 'Редактирование пользователя' : 'Новый пользователь'}</p>
      <div className={styles.radio}>
        <input type="radio" id="male" name="gender" checked={inputValues.gender === 'male'} onChange={onRadioChange} />
        <label htmlFor="male">Мужчина</label>
        <input
          type="radio"
          id="female"
          name="gender"
          checked={inputValues.gender === 'female'}
          onChange={onRadioChange}
        />
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

      <div className={styles.btnwrapper}>
        {currentUser && <button type="button" className={styles.delete} onClick={handleRemove} />}
        <button
          className={cn(styles.btn, Object.entries(inputValues).find(([, v]) => v === '') && styles.disabled)}
          type="submit"
        >
          Сохранить
        </button>
      </div>
    </form>
  );
};
