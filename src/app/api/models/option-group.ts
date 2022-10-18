/* tslint:disable */
import { Merchant } from './merchant';
import { Option } from './option';
import { OptionGroupProduct } from './option-group-product';
export interface OptionGroup {
  createdAt?: string;
  id?: string;
  merchantId?: string;
  merchantIdNavigation?: Merchant;
  name?: string;
  option?: Array<Option>;
  optionGroupProduct?: Array<OptionGroupProduct>;
  status?: string;
  type?: string;
}
