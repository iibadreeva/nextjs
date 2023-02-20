import cn from 'classnames';
import { format } from 'date-fns';

import { FooterProps } from '@/layout/Footer/Footer.props';

import styles from '@/layout/Footer/Footer.module.css';

export const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer className={cn(className, styles.footer)} {...props}>
      <div>OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены</div>
      <a href="#">Пользовательское соглашение</a>
      <a href="#">Политика конфиденциальности</a>
    </footer>
  );
};
