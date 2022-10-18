/* tslint:disable */
import { DtoPhone } from './dto-phone';
export interface DtoCustomer {
  documentNumber?: string;
  id?: string;
  name?: string;
  ordersCountOnMerchant?: number;
  phone?: DtoPhone;
}
