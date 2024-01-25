import { FC, useEffect, useRef, useState } from 'react';
import { Portal } from '~/components/common/Portal';
import cn from 'clsx';
import { useMount } from '~/hooks/useMount';
import { CSSTransition } from 'react-transition-group';
import { ANIMATION_TIME } from '~/utils/constants';

import styles from './AppModal.module.scss';

export interface AppModalProps {
  isOpened: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const overlayAnimation = {
  enter: styles['overlay-enter'],
  enterActive: styles['overlay-enter-active'],
  exit: styles['overlay-exit'],
  exitActive: styles['overlay-exit-active'],
};

const contentAnimation = {
  enter: styles['content-enter'],
  enterActive: styles['content-enter-active'],
  exit: styles['content-exit'],
  exitActive: styles['content-exit-active'],
};

const Layout: FC<AppModalProps> = ({ onClose, children, isOpened, className }) => {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(isOpened);
  }, [isOpened]);

  const modalClass = cn(styles.content, {
    [className as string]: className,
  });

  return (
    <div className={styles.container}>
      <CSSTransition
        in={animationIn}
        nodeRef={overlayRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={overlayAnimation}
      >
        <div ref={overlayRef} className={styles.overlay} onClick={onClose} aria-hidden="true" />
      </CSSTransition>
      <CSSTransition
        in={animationIn}
        nodeRef={contentRef}
        timeout={ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={contentAnimation}
      >
        <div ref={contentRef} className={modalClass}>
          <button type="button" className={styles.btn} onClick={onClose} />
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

export const AppModal: FC<AppModalProps> = ({ isOpened, onClose, children, className }) => {
  const { isMounted } = useMount({ isOpened });

  if (!isMounted) {
    return null;
  }

  return (
    <Portal>
      <Layout onClose={onClose} isOpened={isOpened} className={className}>
        {children}
      </Layout>
    </Portal>
  );
};
