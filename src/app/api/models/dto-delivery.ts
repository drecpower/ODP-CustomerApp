/* tslint:disable */
import { DtoDeliveryAddress } from './dto-delivery-address';
export interface DtoDelivery {
  deliveredBy?: string;
  deliveryAddress?: DtoDeliveryAddress;
  deliveryDateTime?: string;
  mode?: string;
  observations?: string;
}
