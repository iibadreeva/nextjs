import { ParagrathProps } from '@/components/Paragrath/Paragrath.props';
import cn from 'classnames';

import styles from '@/components/Paragrath/Paragrath.module.css';

export const Paragrath = ({
  size,
  children,
  className,
  ...rest
}: ParagrathProps) => {
  return (
    <div
      className={cn(styles.p, className, {
        [styles.s]: size === 's',
        [styles.m]: size === 'm',
        [styles.l]: size === 'l'
      })}
      {...rest}
    >
      {children}
    </div>
  );
};
