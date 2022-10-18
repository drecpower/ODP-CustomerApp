/* tslint:disable */
import { Customer } from './customer';
import { HashData } from './hash-data';
import { Merchant } from './merchant';
import { Product } from './product';
export interface MerchantGroup {
  adminMode?: string;
  createdAt?: string;
  customer?: Array<Customer>;
  hashData?: Array<HashData>;
  id?: string;
  merchant?: Array<Merchant>;
  name?: string;
  ordersEndpoint?: string;
  product?: Array<Product>;
  pwaManifest?: string;
  status?: string;
}
