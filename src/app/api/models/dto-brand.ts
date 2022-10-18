/* tslint:disable */
import { Merchant } from './merchant';
import { Product } from './product';
export interface DtoBrand {
  adminMode?: string;
  createdAt?: string;
  id?: string;
  merchant?: Array<Merchant>;
  name?: string;
  ordersEndpoint?: string;
  product?: Array<Product>;
  pwaManifest?: string;
  status?: string;
}
