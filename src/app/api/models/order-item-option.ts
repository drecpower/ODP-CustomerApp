/* tslint:disable */
import { Option } from './option';
import { OrderItem } from './order-item';
export interface OrderItemOption {
  addition?: number;
  externalCode?: string;
  id?: string;
  index?: number;
  optionId?: string;
  optionIdNavigation?: Option;
  orderItemId?: string;
  orderItemIdNavigation?: OrderItem;
  quantity?: number;
  status?: string;
  type?: string;
  unitPrice?: number;
}
