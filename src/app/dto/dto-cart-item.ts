import { Item } from "../api/models/item";
import { DtoOptionsSelected } from "./dto-options-selected";

export class DtoCartItem {
 item:Item={};
 quantity:number=0;
 comments:string="";
 options?: DtoOptionsSelected[];
 optionsPrice?:number;
 type?:string;
 name?:string;
 fractions?:number;
 sizeOptionGroupId?:string;
 get subtotal():number{
     return (this.item.price! + (this.optionsPrice?this.optionsPrice:0))*this.quantity;
 }
}
