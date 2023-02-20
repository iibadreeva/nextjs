import { AdvantagesProps } from '@/components/Advantages/Advantages.props';
import cn from 'classnames';

import styles from '@/components/Advantages/Advantages.module.css';
import CheckIcon from '@/components/Advantages/check.svg';

export const Advantages = ({ advantages }: AdvantagesProps) => {
  return (
    <>
      {advantages.map((r) => (
        <div key={r._id} className={styles.advantage}>
          <CheckIcon />
          <div className={styles.title}>{r.title}</div>
          <hr className={styles.line} />
          <div className={styles.description}>{r.description}</div>
        </div>
      ))}
    </>
  );
};
