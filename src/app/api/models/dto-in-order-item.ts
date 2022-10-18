/* tslint:disable */
import { OrderItemOption } from './order-item-option';
export interface DtoInOrderItem {
  addition?: number;
  externalCode?: string;
  id?: string;
  index?: number;
  itemId?: string;
  observations?: string;
  orderItemOption?: Array<OrderItemOption>;
  quantity?: number;
  unitPrice?: number;
}
