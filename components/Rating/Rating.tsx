import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
  useRef
} from 'react';
import cn from 'classnames';

import { RatingProps } from '@/components/Rating/Rating.props';

import Star from '@/components/Rating//star.svg';
import styles from '@/components/Rating/Rating.module.css';

export const Rating = forwardRef(
  (
    {
      isEditable = false,
      rating,
      setRating,
      error,
      className,
      tabIndex,
      ...rest
    }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [ratingArr, setRatingArr] = useState<JSX.Element[]>(
      new Array(5).fill(<></>)
    );
    const ratingRef = useRef<(HTMLSpanElement | null)[]>([]);
    const computeFocus = (r: number, i: number): number => {
      if (!isEditable) {
        return -1;
      }
      if (!rating && i == 0) {
        return tabIndex ?? 0;
      }
      if (r == i + 1) {
        return tabIndex ?? 0;
      }
      return -1;
    };

    const constructRating = (currentRating: number) => {
      const updateArr = ratingArr.map((r: JSX.Element, i: number) => (
        <span
          className={cn(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable
          })}
          onMouseEnter={() => changeDisplay(i + 1)}
          onClick={() => onClick(i + 1)}
          // tabIndex={isEditable ? 0 : -1}
          tabIndex={computeFocus(rating, i)}
          // onKeyDown={(e: KeyboardEvent<SVGElement>) =>
          //   isEditable && handleSpace(i + 1, e)
          // }
          onKeyDown={(e: KeyboardEvent) => handleSpaceKey(i + 1, e)}
          ref={(r) => ratingRef.current?.push(r)}
          role={isEditable ? 'slider' : ''}
          aria-valuenow={rating}
          aria-valuemax={5}
          aria-valuemin={1}
          aria-label={isEditable ? 'Укажите рейтинг' : 'рейтинг' + rating}
          aria-invalid={error ? true : false}
        >
          <Star />
        </span>
      ));
      setRatingArr(updateArr);
    };

    const changeDisplay = (num: number) => {
      if (!isEditable) {
        return;
      }
      constructRating(num);
    };

    const onClick = (num: number) => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(num);
    };
    const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
      if (![13, 32].includes(e.keyCode) || !setRating) {
        return;
      }

      setRating(i);
    };
    const handleSpaceKey = (i: number, e: KeyboardEvent) => {
      if (!isEditable || !setRating) {
        return;
      }
      if (e.code == 'ArrowRight' || e.code == 'ArrowUp') {
        e.preventDefault();
        setRating(rating === 5 ? rating : (rating || 0) + 1);
        ratingRef.current[rating]?.focus();
      }
      if (e.code == 'ArrowLeft' || e.code == 'ArrowDown') {
        e.preventDefault();
        setRating(rating === 0 ? rating : (rating || 0) - 1);
        ratingRef.current[rating - 2]?.focus();
      }
      if ([13, 32].includes(e.keyCode)) {
        e.preventDefault();
        setRating(i);
      }
    };

    useEffect(() => {
      constructRating(rating);
    }, [rating, tabIndex]);

    return (
      <div
        className={cn(className, styles.ratingWrapper, {
          [styles.errorWrap]: error
        })}
        {...rest}
        ref={ref}
        onMouseLeave={() => changeDisplay(rating)}
      >
        {ratingArr.map((r, i: number) => (
          <span key={i}>{r}</span>
        ))}
        {error && (
          <span role="alert" className={styles.error}>
            {error.message}
          </span>
        )}
      </div>
    );
  }
);
