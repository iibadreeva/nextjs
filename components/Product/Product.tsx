import cn from 'classnames';
import Image from 'next/image';
import { useState, Fragment, useRef, forwardRef, ForwardedRef } from 'react';
import { motion } from 'framer-motion';
import { ProductProps } from '@/components/Product/Product.props';
import {
  Button,
  Card,
  Rating,
  Tag,
  Divider,
  Review,
  ReviewForm
} from '@/components';
import { priceRu, devlOfNum } from '@/helpers/helpers';

import styles from '@/components/Product/Product.module.css';

export const Product = motion(
  forwardRef(
    (
      { product, className, ...rest }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ) => {
      const [isOpen, setIsOpen] = useState(false);
      const reviewRef = useRef<HTMLDivElement>(null);
      const scrollToReview = () => {
        setIsOpen(true);
        reviewRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        reviewRef.current?.focus(); // переход через tab к форме
      };

      const variants = {
        visible: { opacity: 1, height: 'auto' },
        hidden: { opacity: 0, height: 0 }
      };

      return (
        <div role="listitem" className={className} {...rest} ref={ref}>
          <Card color="white" className={cn(styles.product)}>
            <div className={styles.logo}>
              <Image
                width={70}
                height={70}
                src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
                alt={product.title}
              />
            </div>
            <div className={styles.title}>{product.title}</div>
            <div className={styles.price}>
              <span className="visualyHidden">цена</span>
              {priceRu(product.price)}
              {product.oldPrice && (
                <Tag color="green" size="s" className={styles.oldPrice}>
                  <span className="visualyHidden">цена скидки</span>
                  {priceRu(product.price - product.oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              <span className="visualyHidden">в кредит</span>
              {priceRu(product.credit)}/
              <span className={styles.month}>мес</span>
            </div>
            <div className={styles.rating}>
              <span className="visualyHidden">
                рейтинг {product.reviewAvg ?? product.initialRating}
              </span>
              <Rating rating={product.reviewAvg ?? product.initialRating} />
            </div>
            <div className={styles.tags}>
              {product.categories.map((r) => (
                <Tag key={r} color="ghost" className={styles.category}>
                  {r}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle} aria-hidden={true}>
              цена
            </div>
            <div className={styles.creditTitle} aria-hidden={true}>
              в кредит
            </div>
            <div className={styles.rateTitle}>
              {product.reviewCount}{' '}
              <a href="#ref" onClick={scrollToReview}>
                {devlOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
              </a>
            </div>
            <div className={styles.hr}>
              <Divider />
            </div>
            <div className={styles.description}>{product.description}</div>
            <div className={styles.feature}>
              {product.characteristics.map((r) => (
                <div key={r.name} className={styles.characteristic}>
                  <span className={styles.characteristicName}>{r.name}</span>
                  <span className={styles.characteristicDots} />
                  <span className={styles.characteristicValue}>{r.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.advBlock}>
              {product.advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div>{product.advantages}</div>
                </div>
              )}

              {product.disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>Недостатки</div>
                  <div>{product.disadvantages}</div>
                </div>
              )}
            </div>
            <div className={cn(styles.hr, styles.hr2)}>
              <Divider />
            </div>
            <footer className={styles.actions}>
              <Button appearance="primary">Узнать подробнее</Button>
              <Button
                appearance="ghost"
                arrow={isOpen ? 'down' : 'right'}
                className={styles.reviewButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
              >
                Читать отзывы
              </Button>
            </footer>
          </Card>
          <motion.div
            className={styles.reviews}
            animate={isOpen ? 'visible' : 'hidden'}
            variants={variants}
            initial="hidden"
          >
            <Card
              className={styles.comments}
              color="blue"
              ref={reviewRef}
              tabIndex={isOpen ? 0 : -1}
            >
              {product.reviews.map((r) => (
                <Fragment key={r._id}>
                  <Review review={r} />
                  <Divider />
                </Fragment>
              ))}
              <ReviewForm isOpen={isOpen} productId="1" />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);
