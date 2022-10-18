import { DtoOptionsSelected } from "./dto-options-selected";

export class DtoItemOptions {
    options?: DtoOptionsSelected[];
    optionGroupProductId?:string;
    valid?:boolean=false;
}
