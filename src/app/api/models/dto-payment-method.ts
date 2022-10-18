/* tslint:disable */
import { DtoCard } from './dto-card';
import { DtoCash } from './dto-cash';
import { DtoWallet } from './dto-wallet';
export interface DtoPaymentMethod {
  card?: DtoCard;
  cash?: DtoCash;
  currency?: string;
  method?: string;
  type?: string;
  value?: number;
  wallet?: DtoWallet;
}
