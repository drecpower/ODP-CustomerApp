/* tslint:disable */
import { Customer } from './customer';
import { Order } from './order';
export interface Address {
  city?: string;
  complement?: string;
  country?: string;
  createdAt?: string;
  customerId?: string;
  customerIdNavigation?: Customer;
  favoriteType?: string;
  id?: string;
  latitude?: number;
  longitude?: number;
  neighborhood?: string;
  order?: Array<Order>;
  postalCode?: string;
  reference?: string;
  state?: string;
  status?: string;
  streetName?: string;
  streetNumber?: string;
  withotStreetNumber?: boolean;
}
