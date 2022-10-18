/* tslint:disable */
import { Merchant } from './merchant';
export interface PaymentMethod {
  cardBrand?: string;
  createdAt?: string;
  currency?: string;
  displayName?: string;
  gateway?: string;
  id?: string;
  merchantId?: string;
  merchantIdNavigation?: Merchant;
  method?: string;
  status?: string;
  type?: string;
}
