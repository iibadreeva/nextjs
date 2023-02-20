import { ForwardedRef, forwardRef } from 'react';
import cn from 'classnames';
import { InputProps } from '@/components/Input/Input.props';

import styles from '@/components/Input/Input.module.css';

export const Input = forwardRef(
  (
    { className, error, ...rest }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={cn(styles.inputWrapper, className)}>
        <input
          className={cn(styles.input, {
            [styles.error]: error
          })}
          ref={ref}
          {...rest}
        />
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
