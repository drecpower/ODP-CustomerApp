/* tslint:disable */
import { DtoInOrder } from './dto-in-order';
export interface DtoInMasterOrder {
  dtoOrder?: Array<DtoInOrder>;
  id?: string;
  merchantGroupId?: string;
}
