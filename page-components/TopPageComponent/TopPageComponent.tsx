import parse from 'html-react-parser';
import { useEffect, useReducer } from 'react';
import { useReducedMotion } from 'framer-motion';

import { TopPageComponentProps } from '@/page-components/TopPageComponent/TopPageComponent.props';
import {
  Advantages,
  HhData,
  Htag,
  Paragrath,
  Product,
  Sort,
  Tag
} from '@/components';
import { TopLevelCategory } from '@/interfaces/toppage.interface';
import { SortEnum } from '@/components/Sort/Sort.props';
import { sortReducer } from '@/page-components/TopPageComponent/sort.reducer';

import styles from '@/page-components/TopPageComponent/TopPageComponent.module.css';

export const TopPageComponent = ({
  page,
  products,
  firstCategory
}: TopPageComponentProps) => {
  const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
    sortReducer,
    {
      products,
      sort: SortEnum.Rating
    }
  );
  const shouldReduceMotion = useReducedMotion();

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  useEffect(() => {
    dispatchSort({ type: 'reset', initialState: products });
  }, [products]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="grey" size="m" aria-label={products.length + 'элементов'}>
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSort} />
      </div>
      <div role="list">
        {sortedProducts &&
          sortedProducts.map((r) => (
            <Product layout={!shouldReduceMotion} key={r._id} product={r} />
          ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory === TopLevelCategory.Courses && page.hh && (
        <HhData {...page.hh} />
      )}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2">Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <Paragrath className={styles.seo} size="l">
          {parse(page.seoText)}
        </Paragrath>
      )}
      <Htag tag="h2">Получаемые навыки</Htag>
      {page.tags.map((t) => (
        <Tag key={t} color="primary">
          {t}
        </Tag>
      ))}
    </div>
  );
};
