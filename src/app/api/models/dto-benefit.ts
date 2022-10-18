/* tslint:disable */
import { DtoSponsorShip } from './dto-sponsor-ship';
export interface DtoBenefit {
  sponsorshipValues?: Array<DtoSponsorShip>;
  target?: string;
  targetId?: string;
  value?: number;
}
