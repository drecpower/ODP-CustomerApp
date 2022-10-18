import { DtoCartToSend } from "src/app/api/models/dto-cart-to-send";

export interface IOrderAdapter{
    readyToSend:boolean;
    send(cart:DtoCartToSend):void;
}