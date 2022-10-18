/* tslint:disable */
import { DtoCartOptionsSelected } from './dto-cart-options-selected';
export interface DtoCartItem {
  comments?: string;
  fractions?: number;
  itemId?: string;
  itemPrice?: number;
  name:string;
  options?: Array<DtoCartOptionsSelected>;
  optionsPrice?: number;
  quantity?: number;
  subtotal?: number;
  type?: string;
}
