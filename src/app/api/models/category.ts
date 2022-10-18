/* tslint:disable */
import { Catalog } from './catalog';
import { Coupon } from './coupon';
import { Item } from './item';
export interface Category {
  catalogId?: string;
  catalogIdNavigation?: Catalog;
  coupon?: Array<Coupon>;
  createdAt?: string;
  externalCode?: string;
  id?: string;
  index?: number;
  item?: Array<Item>;
  name?: string;
  status?: string;
  template?: string;
}
