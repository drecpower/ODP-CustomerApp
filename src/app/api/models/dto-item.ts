/* tslint:disable */
import { DtoOption } from './dto-option';
import { DtoScalePrice } from './dto-scale-price';
export interface DtoItem {
  addition?: number;
  ean?: string;
  externalCode?: string;
  id?: string;
  imageUrl?: string;
  index?: number;
  name?: string;
  observations?: string;
  options?: Array<DtoOption>;
  optionsPrice?: number;
  price?: number;
  quantity?: number;
  scalePrices?: DtoScalePrice;
  totalPrice?: number;
  unit?: string;
  unitPrice?: number;
}
