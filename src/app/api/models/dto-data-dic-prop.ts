/* tslint:disable */
import { DtoDataDicFk } from './dto-data-dic-fk';
export interface DtoDataDicProp {
  defaultValue?: any;
  fk?: DtoDataDicFk;
  isFk?: boolean;
  isFkParent?: boolean;
  isIndex?: boolean;
  isNullable?: boolean;
  isPrimaryKey?: boolean;
  max?: number;
  propertyName?: string;
  propertyType?: string;
  relationalType?: string;
}
