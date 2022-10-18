/* tslint:disable */
import { Category } from './category';
import { Coupon } from './coupon';
import { OrderItem } from './order-item';
import { Product } from './product';
export interface Item {
  categoryId?: string;
  categoryIdNavigation?: Category;
  coupon?: Array<Coupon>;
  createdAt?: string;
  externalCode?: string;
  id?: string;
  idFamilia?: number;
  idFornecedor?: number;
  idReferencia?: number;
  idVariacao?: number;
  index?: number;
  orderItem?: Array<OrderItem>;
  originalPrice?: number;
  price?: number;
  productId?: string;
  productIdNavigation?: Product;
  shifts?: string;
  status?: string;
}
