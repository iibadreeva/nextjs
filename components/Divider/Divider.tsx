import { DividerProps } from '@/components/Divider/Divider.props';
import cn from 'classnames';

import styles from '@/components/Divider/Divider.module.css';

export const Divider = ({ className, ...rest }: DividerProps) => {
  return <hr className={cn(className, styles.hr)} {...rest} />;
};
