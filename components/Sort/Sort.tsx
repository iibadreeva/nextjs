import { SortEnum, SortProps } from '@/components/Sort/Sort.props';
import cn from 'classnames';

import styles from '@/components/Sort/Sort.module.css';
import SortItem from '@/components/Sort/sort.svg';

export const Sort = ({ sort, setSort, className, ...rest }: SortProps) => {
  return (
    <div className={cn(styles.sort, className)} {...rest}>
      <div className={styles.sortName} id="sort">
        Сортировка
      </div>
      <button
        id="rating"
        onClick={() => setSort(SortEnum.Rating)}
        className={cn({
          [styles.active]: sort === SortEnum.Rating
        })}
        aria-selected={sort === SortEnum.Rating}
        aria-labelledby="sort rating"
      >
        <SortItem className={styles.sortIcon} />
        По&nbsp;рейтингу
      </button>
      <button
        id="price"
        onClick={() => setSort(SortEnum.Price)}
        className={cn({
          [styles.active]: sort === SortEnum.Price
        })}
        aria-selected={sort === SortEnum.Price}
        aria-labelledby="sort price"
      >
        <SortItem className={styles.sortIcon} />
        По&nbsp;цене
      </button>
    </div>
  );
};
