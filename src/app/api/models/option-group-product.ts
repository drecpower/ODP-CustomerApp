/* tslint:disable */
import { OptionGroup } from './option-group';
import { Product } from './product';
export interface OptionGroupProduct {
  acceptedFractions?: string;
  externalCode?: string;
  id?: string;
  index?: number;
  max?: number;
  min?: number;
  optionGroupId?: string;
  optionGroupIdNavigation?: OptionGroup;
  productId?: string;
  productIdNavigation?: Product;
  slices?: string;
  status?: string;
}
