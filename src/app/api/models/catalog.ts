/* tslint:disable */
import { Category } from './category';
import { Merchant } from './merchant';
export interface Catalog {
  category?: Array<Category>;
  id?: string;
  merchantId?: string;
  merchantIdNavigation?: Merchant;
  status?: string;
  type?: string;
}
