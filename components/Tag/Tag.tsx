import { TagProps } from '@/components/Tag/Tag.props';
import cn from 'classnames';

import styles from '@/components/Tag/Tag.module.css';

export const Tag = ({
  size,
  color = 'ghost',
  children,
  className,
  href,
  ...rest
}: TagProps) => {
  return (
    <div
      className={cn(styles.tag, className, {
        [styles.s]: size === 's',
        [styles.m]: size === 'm',
        [styles.ghost]: color === 'ghost',
        [styles.red]: color === 'red',
        [styles.primary]: color === 'primary',
        [styles.grey]: color === 'grey',
        [styles.green]: color === 'green'
      })}
      {...rest}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
