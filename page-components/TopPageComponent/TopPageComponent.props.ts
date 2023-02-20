import { TopLevelCategory, TopPageModel } from '@/interfaces/toppage.interface';
import { ProductModel } from '@/interfaces/product.interface';

export interface TopPageComponentProps extends Record<string, unknown> {
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}
