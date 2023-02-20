import cn from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { ReviewFormProps } from '@/components/ReviewForm/ReviewForm.props';
import {
  IReviewForm,
  IReviewSetResponse
} from '@/components/ReviewForm/ReviewForm.interface';
import { Button, Input, Rating, Textarea } from '@/components';
import { API } from '@/helpers/api';

import styles from '@/components/ReviewForm/ReviewForm.module.css';
import CloseIcon from '@/components/ReviewForm/close.svg';
import { useState } from 'react';

export const ReviewForm = ({
  productId,
  className,
  isOpen,
  ...rest
}: ReviewFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors
  } = useForm<IReviewForm>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string>();

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSetResponse>(API.review.create, {
        ...formData,
        productId
      });
      if (data.message) {
        setIsSuccess(true);
        reset();
      } else {
        setError('Что-то случилось');
      }
    } catch (error) {
      setError((error instanceof Error && error.message) || 'Что-то случилось');
    }
  };

  return (
    <form className={styles.reviewFormWarp} onSubmit={handleSubmit(onSubmit)}>
      <div className={cn(styles.reviewForm, className)} {...rest}>
        <Input
          {...register('name', {
            required: { value: true, message: 'Заполните имя' }
          })}
          placeholder="Имя"
          error={errors.name}
          tabIndex={isOpen ? 0 : -1}
          aria-label="Введите имя отзыва"
          aria-invalid={errors.name ? true : false}
        />
        <Input
          {...register('title', {
            required: { value: true, message: 'Заполните заголовок' }
          })}
          className={styles.title}
          placeholder="Заголовок отзыва"
          error={errors.title}
          tabIndex={isOpen ? 0 : -1}
          aria-label="Введите заголовок отзыва"
          aria-invalid={errors.title ? true : false}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{
              required: { value: true, message: 'Укажите рейтинг' }
            }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                ref={field.ref}
                setRating={field.onChange}
                error={errors.rating}
                tabIndex={isOpen ? 0 : -1}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {
            required: { value: true, message: 'Напишите отзыв' }
          })}
          className={styles.description}
          placeholder="Текст отзыва"
          error={errors.description}
          tabIndex={isOpen ? 0 : -1}
          aria-label="Введите текст отзыва"
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button
            onClick={() => clearErrors()}
            appearance="primary"
            tabIndex={isOpen ? 0 : -1}
          >
            Отправить
          </Button>
          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </div>
      {isSuccess && (
        <div className={styles.success} role={'alert'}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки</div>
          <button
            onClick={() => setIsSuccess(false)}
            className={styles.close}
            aria-label="Зарыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {error && (
        <div className={styles.error} role={'alert'}>
          <div className={styles.successTitle}>Произошла ошибка</div>
          <div>{error}</div>
          <button
            className={styles.close}
            onClick={() => setError('')}
            aria-label="Зарыть оповещение"
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  );
};
