import cn from 'classnames';

import { SearchProps } from '@/components/Search/Search.props';
import { Button, Input } from '@/components';
import { useState } from 'react';

import styles from '@/components/Search/Search.module.css';
import SearchIcon from '@/components/Search/search.svg';
import { useRouter } from 'next/router';

export const Search = ({ className, ...rest }: SearchProps) => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      goToSearch();
    }
  };

  return (
    <form role="search" className={cn(styles.search, className, {})} {...rest}>
      <Input
        className={styles.input}
        placeholder="Поиск..."
        aria-label="Введите текст поиска"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        spellCheck={false}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={goToSearch}
        aria-label="Искать по сайту"
      >
        <SearchIcon />
      </Button>
    </form>
  );
};
