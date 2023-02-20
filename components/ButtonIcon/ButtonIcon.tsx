import {
  ButtonIconProps,
  icons
} from '@/components/ButtonIcon/ButtonIcon.props';
import cn from 'classnames';

import styles from '@/components/ButtonIcon/ButtonIcon.module.css';

export const ButtonIcon = ({
  appearance,
  icon,
  className,
  ...props
}: ButtonIconProps) => {
  const IconComponent = icons[icon];

  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.white]: appearance === 'white'
      })}
      {...props}
    >
      <IconComponent />
    </button>
  );
};
