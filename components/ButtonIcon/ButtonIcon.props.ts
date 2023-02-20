import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

import upIcon from '@/components/ButtonIcon/up.svg';
import closeIcon from '@/components/ButtonIcon/close.svg';
import humburgerIcon from '@/components/ButtonIcon/humburger.svg';

export const icons = {
  upIcon,
  closeIcon,
  humburgerIcon
};

export type IconName = keyof typeof icons;

export interface ButtonIconProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  appearance: 'primary' | 'white';
  icon: IconName;
}
