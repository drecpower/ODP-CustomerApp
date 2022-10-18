/* tslint:disable */
import { Category } from './category';
import { Customer } from './customer';
import { Item } from './item';
import { Merchant } from './merchant';
import { Order } from './order';
import { Product } from './product';
export interface Coupon {
  allowedWithPromotionalItems?: boolean;
  categoryId?: string;
  categoryIdNavigation?: Category;
  code?: string;
  createdAt?: string;
  customerId?: string;
  customerIdNavigation?: Customer;
  description?: string;
  finalValidity?: string;
  id?: string;
  initialValidity?: string;
  itemId?: string;
  itemIdNavigation?: Item;
  maximumPerUser?: number;
  maximumUse?: number;
  merchantId?: string;
  merchantIdNavigation?: Merchant;
  minimum?: number;
  order?: Array<Order>;
  orderTiming?: string;
  orderType?: string;
  percentage?: number;
  productId?: string;
  productIdNavigation?: Product;
  status?: string;
  used?: number;
  value?: number;
}
