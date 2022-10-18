/* tslint:disable */
import { DtoCoordinates } from './dto-coordinates';
export interface DtoDeliveryAddress {
  city?: string;
  complement?: string;
  coordinates?: DtoCoordinates;
  country?: string;
  formattedAddress?: string;
  neighborhood?: string;
  postalCode?: string;
  reference?: string;
  state?: string;
  streetName?: string;
  streetNumber?: string;
}
