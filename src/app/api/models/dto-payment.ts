/* tslint:disable */
import { DtoPaymentMethod } from './dto-payment-method';
export interface DtoPayment {
  methods?: Array<DtoPaymentMethod>;
  pending?: number;
  prepaid?: number;
}
