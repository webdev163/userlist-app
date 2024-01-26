import { useEffect, useState } from 'react';
import { ANIMATION_TIME } from '~/utils/constants';

interface Props {
  isOpened: boolean;
}

export const useMount = ({ isOpened }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpened && !isMounted) {
      setIsMounted(true);
    } else if (!isOpened && isMounted) {
      setTimeout(() => {
        setIsMounted(false);
      }, ANIMATION_TIME);
    }
  }, [isMounted, isOpened]);

  return {
    isMounted,
  };
};
