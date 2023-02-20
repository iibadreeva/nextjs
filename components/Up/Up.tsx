import cn from 'classnames';
import { useAnimation, motion } from 'framer-motion';

import { useScrollY } from '@/hooks/useScrollY';

import styles from '@/components/Up/Up.module.css';
import { useEffect } from 'react';
import { ButtonIcon } from '@/components';

export const Up = () => {
  const controls = useAnimation();
  const y = useScrollY();

  useEffect(() => {
    // показываем кнопку при скроле в низ
    controls.start({ opacity: y / (document.body.scrollHeight / 2) });
  }, [y, controls]);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0 }}
      className={cn(styles.up)}
    >
      <ButtonIcon
        aria-label="Наверх"
        onClick={scrollToTop}
        appearance="primary"
        icon="upIcon"
      />
    </motion.div>
  );
};
