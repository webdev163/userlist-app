import { FC } from 'react';
import cn from 'clsx';

import styles from './AppInput.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  placeholder?: string;
  className?: string;
  isError?: boolean;
}

const AppInput: FC<InputProps> = props => {
  const { className, title, placeholder, isError, ...otherProps } = props;

  const composedClass = cn(styles.wrapper, isError && styles.error, className);

  return (
    <div className={composedClass}>
      {title && <span className={styles.title}>{title}</span>}
      <input {...otherProps} placeholder={placeholder} className={styles.input} />
    </div>
  );
};

export default AppInput;
