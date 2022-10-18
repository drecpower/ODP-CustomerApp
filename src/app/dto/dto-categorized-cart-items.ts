import { Item } from "../api/models/item";
import { DtoCartItem } from "./dto-cart-item";

export class DtoCartItemCategory {
    categoryName: string = "";
    categoryId: string = "";
    template?: string = "";
    items: DtoCartItem[] = [];
}
