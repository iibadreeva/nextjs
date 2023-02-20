import cn from 'classnames';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

import { HeaderProps } from '@/layout/Header/Header.props';
import { ButtonIcon } from '@/components';
import { Sidebar } from '@/layout/Sidebar/Sidebar';

import styles from '@/layout/Header/Header.module.css';
import LogoItem from '@/layout/Header/logo.svg';
import { useEffect, useState } from 'react';

export const Header = ({ className, ...props }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20 // более резко появляется
      }
    },
    hidden: { opacity: 0, x: '100%' }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [router]);

  return (
    <header className={cn(className, styles.header)} {...props}>
      <LogoItem />
      <ButtonIcon
        appearance="white"
        icon="humburgerIcon"
        onClick={() => setIsOpen(true)}
      />
      <motion.div
        className={styles.menu}
        variants={variants}
        animate={isOpen ? 'visible' : 'hidden'}
        initial="hidden"
      >
        <Sidebar />
        <ButtonIcon
          className={styles.close}
          appearance="white"
          icon="closeIcon"
          onClick={() => {
            setIsOpen(false);
          }}
        ></ButtonIcon>
      </motion.div>
    </header>
  );
};
