/* tslint:disable */
import { DtoAdditionalFee } from './dto-additional-fee';
import { DtoAdditionalInfo } from './dto-additional-info';
import { DtoBenefit } from './dto-benefit';
import { DtoCustomer } from './dto-customer';
import { DtoDelivery } from './dto-delivery';
import { DtoIndoor } from './dto-indoor';
import { DtoItem } from './dto-item';
import { DtoMerchant } from './dto-merchant';
import { DtoPayment } from './dto-payment';
import { DtoPicking } from './dto-picking';
import { DtoSchedule } from './dto-schedule';
import { DtoTakeout } from './dto-takeout';
import { DtoTotal } from './dto-total';
export interface DtoOrderDetails {
  additionalFees?: Array<DtoAdditionalFee>;
  additionalInfo?: DtoAdditionalInfo;
  benefits?: Array<DtoBenefit>;
  createdAt?: string;
  customer?: DtoCustomer;
  delivery?: DtoDelivery;
  displayId?: string;
  extraInfo?: string;
  id?: string;
  indoor?: DtoIndoor;
  isTest?: boolean;
  items?: Array<DtoItem>;
  merchant?: DtoMerchant;
  orderTiming?: string;
  orderType?: string;
  payments?: DtoPayment;
  picking?: DtoPicking;
  preparationStartDateTime?: string;
  salesChannel?: string;
  schedule?: DtoSchedule;
  takeout?: DtoTakeout;
  total?: DtoTotal;
}
