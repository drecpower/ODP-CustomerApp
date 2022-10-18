/* tslint:disable */
import { Merchant } from './merchant';
export interface CustomerAppEndpoint {
  createdAt?: string;
  headers?: string;
  id?: string;
  index?: number;
  merchantId?: string;
  merchantIdNavigation?: Merchant;
  params?: string;
  privateKey?: string;
  protocolType?: string;
  publicKey?: string;
  status?: string;
  type?: string;
  uri?: string;
  uriFallback?: string;
}
