import cn from 'classnames';
import { motion, useMotionValue } from 'framer-motion';

import { ButtonProps } from '@/components/Button/Button.props';

import ArrowIcon from '@/components/Button/arrow.svg';
import styles from '@/components/Button/Button.module.css';

export const Button = ({
  children,
  appearance,
  className,
  arrow = 'none',
  ...props
}: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost'
      })}
      {...props}
    >
      {children}
      {arrow !== 'none' && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow === 'down',
            [styles.right]: arrow === 'right'
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  );
};
