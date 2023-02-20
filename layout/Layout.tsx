import { FunctionComponent, useState, KeyboardEvent, useRef } from 'react';
import cn from 'classnames';

import { LayoutProps } from '@/layout/Layout.props';
import { Header } from '@/layout/Header/Header';
import { Sidebar } from '@/layout/Sidebar/Sidebar';
import { Footer } from '@/layout/Footer/Footer';
import { AppContextProvider, IAppContext } from '@/context/app.context';
import { Up } from '@/components';

import styles from '@/layout/Layout.module.css';

export const Layout = ({ children }: LayoutProps) => {
  const [isSkipLink, setIsSkipLink] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.keyCode == 32 || key.keyCode == 13) {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setIsSkipLink(false);
  };

  return (
    <div className={styles.wrapper}>
      <a
        onFocus={() => setIsSkipLink(true)}
        tabIndex={1}
        className={cn(styles.link, {
          [styles.displayed]: isSkipLink
        })}
        href="#"
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <main role="main" className={styles.body} ref={bodyRef} tabIndex={0}>
        {children}
      </main>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T) {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
