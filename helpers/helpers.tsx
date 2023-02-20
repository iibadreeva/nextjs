import { FirstLevelMenuItem } from '@/interfaces/menu.interface';
import IconCourses from '@/layout/Menu/incons/curses.svg';
import { TopLevelCategory } from '@/interfaces/toppage.interface';
import IconServices from '@/layout/Menu/incons/service.svg';
import IconBoors from '@/layout/Menu/incons/boors.svg';
import IconProducts from '@/layout/Menu/incons/product.svg';

export const firstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: 'courses',
    name: 'Курсы',
    icon: <IconCourses />,
    id: TopLevelCategory.Courses
  },
  {
    route: 'services',
    name: 'Сервисы',
    icon: <IconServices />,
    id: TopLevelCategory.Services
  },
  {
    route: 'books',
    name: 'Книги',
    icon: <IconBoors />,
    id: TopLevelCategory.Books
  },
  {
    route: 'products',
    name: 'Товары',
    icon: <IconProducts />,
    id: TopLevelCategory.Products
  }
];

export const priceRu = (price: number): string =>
  price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    .concat(' ₽');

export const devlOfNum = (
  nummber: number,
  titles: [string, string, string]
) => {
  const cases = [2, 0, 1, 1, 2];
  return titles[
    nummber % 100 > 4 && nummber % 100 < 20
      ? 2
      : cases[nummber % 10 < 5 ? nummber % 10 : 5]
  ];
};
