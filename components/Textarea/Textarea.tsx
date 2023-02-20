import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { TextareaProps } from '@/components/Textarea/Textarea.props';

import styles from '@/components/Textarea/Textarea.module.css';

export const Textarea = forwardRef(
  (
    { className, error, children, ...rest }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <div className={cn(styles.textareaWrapper, className)}>
        <textarea
          className={cn(styles.textarea, {
            [styles.error]: error
          })}
          ref={ref}
          {...rest}
        >
          {children}
        </textarea>
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
