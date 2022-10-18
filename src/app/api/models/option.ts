/* tslint:disable */
import { OptionGroup } from './option-group';
import { OrderItemOption } from './order-item-option';
import { Product } from './product';
export interface Option {
  createdAt?: string;
  externalCode?: string;
  id?: string;
  index?: number;
  optionGroupId?: string;
  optionGroupIdNavigation?: OptionGroup;
  orderItemOption?: Array<OrderItemOption>;
  originalPrice?: number;
  price?: number;
  productId?: string;
  productIdNavigation?: Product;
  status?: string;
}
