import { Catalog, Category, Item } from "../api/models";
import { DtoPizzaSizeFraction } from "./dto-pizza-size-fraction";

export class DtoCategory{
    category?: Category;
    items?:Item[];
    pizzas?:DtoPizzaSizeFraction[];
    
   }