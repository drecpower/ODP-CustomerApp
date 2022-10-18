/* tslint:disable */
import { Coupon } from './coupon';
import { Item } from './item';
import { MerchantGroup } from './merchant-group';
import { Option } from './option';
import { OptionGroupProduct } from './option-group-product';
export interface Product {
  coupon?: Array<Coupon>;
  createdAt?: string;
  description?: string;
  dietaryRestriction?: string;
  ean?: string;
  externalCode?: string;
  id?: string;
  image?: string;
  item?: Array<Item>;
  merchantGroupId?: string;
  merchantGroupIdNavigation?: MerchantGroup;
  name?: string;
  option?: Array<Option>;
  optionGroupProduct?: Array<OptionGroupProduct>;
  serving?: string;
  status?: string;
}
