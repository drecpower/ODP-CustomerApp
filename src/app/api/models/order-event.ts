/* tslint:disable */
import { Order } from './order';
export interface OrderEvent {
  acknowledgmentAt?: string;
  code?: string;
  createdAt?: string;
  fullCode?: string;
  id?: string;
  metadata?: string;
  orderId?: string;
  orderIdNavigation?: Order;
}
