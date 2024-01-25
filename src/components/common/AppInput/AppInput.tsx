import { FC } from 'react';
import cn from 'clsx';

import styles from './AppInput.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  isError: boolean;
  type?: string;
}

const AppInput: FC<InputProps> = props => {
  const { placeholder, isError, name, type, ...otherProps } = props;

  return (
    <div className={styles.wrapper}>
      <input
        {...otherProps}
        className={cn(styles.input, isError && styles.invalid)}
        id={name}
        type={type ?? 'text'}
        name={name}
        placeholder={placeholder}
      />
      <label htmlFor={name} className={styles.label}>
        {placeholder}
      </label>
    </div>
  );
};

export default AppInput;
