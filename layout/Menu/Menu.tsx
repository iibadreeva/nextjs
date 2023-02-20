import { useContext, KeyboardEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';
import { motion, useReducedMotion } from 'framer-motion';
import { AppContext } from '@/context/app.context';
import { FirstLevelMenuItem, PageItem } from '@/interfaces/menu.interface';
import { firstLevelMenu } from '@/helpers/helpers';

import styles from '@/layout/Menu/Menu.module.css';

export const Menu = () => {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const { menu, setMenu, firstCategory } = useContext(AppContext);
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion
        ? {}
        : {
            when: 'beforeChildren',
            staggerChildren: 0.1,
            ease: 'easeIn'
          }
    },
    hidden: {
      marginBottom: 0
    }
  };
  const variantsChildren = {
    visible: {
      opacity: 1,
      // height: 40
      height: 'auto',
      marginBottom: 10
    },
    hidden: {
      opacity: 0,
      height: 0,
      marginBottom: 0
    }
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory === secondCategory) {
            setAnnounce(m.isOpened ? 'closed' : 'opened');
            m.isOpened = !m.isOpened;
          }
          return m;
        })
      );
  };

  const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
    if (key.keyCode == 32 || key.keyCode == 13) {
      key.preventDefault();
      openSecondLevel(secondCategory);
    }
  };

  const buildFirstLevel = () => {
    return (
      <ul className={styles.firstBlock}>
        {firstLevelMenu.map((m) => (
          <li key={m.route} aria-expanded={m.id === firstCategory}>
            <Link href={`/${m.route}`}>
              <div
                className={cn(styles.firstLevel, {
                  [styles.firstLevelActive]: m.id === firstCategory
                })}
              >
                {m.icon}
                <span>{m.name}</span>
              </div>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </li>
        ))}
      </ul>
    );
  };

  const buildSecondLevel = (m: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map((r) => {
          if (
            r.pages.map((r) => r.alias).includes(router.asPath.split('/')[2])
          ) {
            r.isOpened = true;
          }
          return (
            <li className={styles.secondLevel} key={r._id.secondCategory}>
              <button
                aria-expanded={r.isOpened}
                tabIndex={0}
                onKeyDown={(key: KeyboardEvent) =>
                  openSecondLevelKey(key, r._id.secondCategory)
                }
                onClick={() => openSecondLevel(r._id.secondCategory)}
              >
                {r._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={r.isOpened ? 'visible' : 'hidden'}
                animate={r.isOpened ? 'visible' : 'hidden'}
                className={cn(styles.secondLevelBlock, {
                  // [styles.secondLevelBlockOpen]: r.isOpened
                })}
              >
                {buildThirdLevel(r.pages, m.route, r.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (
    pages: PageItem[],
    route: string,
    isOpened: boolean
  ) => {
    return pages.map((r) => (
      <motion.li
        className={styles.thirdLevelWrap}
        key={r._id}
        variants={variantsChildren}
      >
        <Link
          tabIndex={isOpened ? 0 : -1}
          className={cn(styles.thirdLevel, {
            [styles.thirdLevelActive]: `/${route}/${r.alias}` === router.asPath
          })}
          href={`/${route}/${r.alias}`}
          aria-current={`/${route}/${r.alias}` === router.asPath && 'page'}
        >
          {r.category}
        </Link>
      </motion.li>
    ));
  };

  return (
    <nav role="navigation" className={styles.menu}>
      {announce && (
        <span className="visualyHidden" role="log">
          {announce === 'opened' ? 'развернуто' : 'свёрнуто'}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  );
};
