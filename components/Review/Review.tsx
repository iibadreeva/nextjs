import cn from 'classnames';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import { ReviewProps } from '@/components/Review/Review.props';
import { Button, Card, Rating, Tag, Divider } from '@/components';

import styles from '@/components/Review/Review.module.css';
import UserItem from '@/components/Review/user.svg';

export const Review = ({ review, className, ...rest }: ReviewProps) => {
  const { name, title, description, createdAt, rating } = review;
  return (
    <>
      <Card color="blue" className={cn(styles.review, className)}>
        <UserItem className={styles.user} />
        <div className={styles.title}>
          <span className={styles.name}>{name}: </span>&nbsp;&nbsp;
          <span>{title} </span>
        </div>
        <div className={styles.date}>
          {format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}
        </div>
        <div className={styles.rating}>
          <Rating rating={rating}></Rating>
        </div>
        <div className={styles.description}>{description}</div>
      </Card>
    </>
  );
};
