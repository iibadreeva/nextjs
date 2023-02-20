import cn from 'classnames';
import Link from 'next/link';

import { Menu } from '@/layout/Menu/Menu';
import { SidebarProps } from '@/layout/Sidebar/Sidebar.props';
import { Search } from '@/components';

import styles from '@/layout/Sidebar/Sidebar.module.css';
import LogoIcon from '@/layout/Sidebar/logo.svg';

export const Sidebar = ({ className, ...props }: SidebarProps) => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Link href="/">
        <LogoIcon className={styles.logo} />
      </Link>
      <Search />
      <Menu />
    </div>
  );
};
