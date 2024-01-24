import { FC } from 'react';
import cn from 'clsx';

import styles from './AppInput.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  placeholder?: string;
  className?: string;
}

const AppInput: FC<InputProps> = props => {
  const { className, title, placeholder } = props;

  return (
    <div className={cn(styles.wrapper, className)}>
      {title && <span className={styles.title}>{title}</span>}
      <input {...props} placeholder={placeholder} className={styles.input} />
    </div>
  );
};

export default AppInput;
