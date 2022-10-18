/* tslint:disable */
import { DtoInAddress } from './dto-in-address';
import { DtoInCustomer } from './dto-in-customer';
import { DtoInOrderItem } from './dto-in-order-item';
export interface DtoInOrder {
  additionalFees?: number;
  adress?: DtoInAddress;
  benefits?: number;
  createdAt?: string;
  customer?: DtoInCustomer;
  customerId?: string;
  deliveryBy?: string;
  deliveryDateTime?: string;
  deliveryFee?: number;
  displayId?: string;
  dtoOrderItem?: Array<DtoInOrderItem>;
  id?: string;
  isTest?: boolean;
  merchantId?: string;
  observations?: string;
  orderMode?: string;
  orderTiming?: string;
  orderType?: string;
  postBackUrl?: string;
  preparationStartDateTime?: string;
  salesChannel?: string;
  status?: string;
  subTotal?: number;
  table?: string;
}
