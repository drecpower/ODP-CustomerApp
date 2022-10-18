import { Item, Product } from "../api/models";

export class DtoPizzaSizeFraction{
    name?:string;
    minimalValue?:number;
    selectedFraction?:number
    sizeOptionGroupId?:string;
    id?: string;
    item?: Item;
    product?: Product;    
}