/* tslint:disable */
import { Item } from './item';
import { Order } from './order';
import { OrderItemOption } from './order-item-option';
export interface OrderItem {
  addition?: number;
  externalCode?: string;
  fractions?: number;
  id?: string;
  index?: number;
  itemId?: string;
  itemIdNavigation?: Item;
  observations?: string;
  orderId?: string;
  orderIdNavigation?: Order;
  orderItemOption?: Array<OrderItemOption>;
  quantity?: number;
  type?: string;
  unitPrice?: number;
}
