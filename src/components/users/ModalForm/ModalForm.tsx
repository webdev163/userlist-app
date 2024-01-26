import { FC, useState } from 'react';
import cn from 'clsx';
import AppInput from '~/components/common/AppInput';
import { validateTextInput } from '~/utils/validateTextInput';
import { validateEmail } from '~/utils/validateEmail';
import { useAppActions } from '~/store/hooks';
import { userActions } from '~/store/slices/userSlice';
import { User } from '~/types/models';
import { FormInputNames, RadioInputValues } from '~/utils/constants';

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
    gender: currentUser?.gender ?? RadioInputValues.MALE,
    lastName: currentUser?.name.last ?? '',
    firstName: currentUser?.name.first ?? '',
    email: currentUser?.email ?? '',
  });
  const [errorArr, setErrorArr] = useState<string[]>([]);

  const actions = useAppActions(userActions);

  const onRadioChange = () => {
    setInputValues({
      ...inputValues,
      gender: inputValues.gender === RadioInputValues.MALE ? RadioInputValues.FEMALE : RadioInputValues.MALE,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let errors: string[] = [];
    for (const element in inputValues) {
      if (Object.prototype.hasOwnProperty.call(inputValues, element)) {
        const key = element as keyof typeof inputValues;
        if (key === FormInputNames.GENDER) continue;
        if (key === FormInputNames.EMAIL && validateEmail(inputValues[key])) {
          errors.push(element);
        }
        if (key !== FormInputNames.EMAIL && validateTextInput(inputValues[key])) {
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
        <input
          type="radio"
          id={RadioInputValues.MALE}
          name={FormInputNames.GENDER}
          checked={inputValues.gender === RadioInputValues.MALE}
          onChange={onRadioChange}
        />
        <label htmlFor={RadioInputValues.MALE}>Мужчина</label>
        <input
          type="radio"
          id={RadioInputValues.FEMALE}
          name={FormInputNames.GENDER}
          checked={inputValues.gender === RadioInputValues.FEMALE}
          onChange={onRadioChange}
        />
        <label htmlFor={RadioInputValues.FEMALE}>Женщина</label>
        <div className={styles.slide}></div>
      </div>

      <AppInput
        placeholder="Фамилия*"
        value={inputValues.lastName}
        name={FormInputNames.LAST_NAME}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValues({ ...inputValues, lastName: e.target.value })
        }
        isError={errorArr.includes(FormInputNames.LAST_NAME)}
        onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => clearError(e.target.name)}
      />

      <AppInput
        placeholder="Имя*"
        value={inputValues.firstName}
        name={FormInputNames.FIRST_NAME}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValues({ ...inputValues, firstName: e.target.value })
        }
        isError={errorArr.includes(FormInputNames.FIRST_NAME)}
        onFocus={(e: React.FocusEvent<HTMLInputElement, Element>) => clearError(e.target.name)}
      />

      <AppInput
        placeholder="Email*"
        value={inputValues.email}
        name={FormInputNames.EMAIL}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValues({ ...inputValues, email: e.target.value })}
        isError={errorArr.includes(FormInputNames.EMAIL)}
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
