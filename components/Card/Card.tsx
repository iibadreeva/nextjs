import { CardProps } from '@/components/Card/Card.props';
import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';

import styles from '@/components/Card/Card.module.css';

export const Card = forwardRef(
  (
    { color, children, className, ...rest }: CardProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className={cn(styles.card, className, {
          [styles.blue]: color === 'blue'
        })}
        ref={ref}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
