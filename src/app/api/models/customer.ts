/* tslint:disable */
import { Address } from './address';
import { Coupon } from './coupon';
import { MerchantGroup } from './merchant-group';
import { Order } from './order';
export interface Customer {
  address?: Array<Address>;
  coupon?: Array<Coupon>;
  createdAt?: string;
  documentNumber?: string;
  email?: string;
  externalId?: string;
  id?: string;
  lastCodeAccess?: string;
  merchantGroupId?: string;
  merchantGroupIdNavigation?: MerchantGroup;
  name?: string;
  order?: Array<Order>;
  ordersCountOnMerchant?: string;
  password?: string;
  phoneNumber?: string;
  status?: string;
}
