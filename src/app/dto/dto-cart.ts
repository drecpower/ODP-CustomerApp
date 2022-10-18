import { DtoCartItem } from "./dto-cart-item";
import * as Enumerable from 'linq';
import { DtoCartItemCategory } from "./dto-categorized-cart-items";
import { DtoDeliveryTimeWindow } from "./dto-delivery-time-window";
import { Address } from "../api/models/address";
import { Coupon } from "../api/models/coupon";
import { PaymentMethod } from "../api/models";
import { DtoCustomerCard } from "./dto-customer-card";
import { OrderType } from "../../enum/enums";


export class DtoCart {
    address?: Address;
    gpsAddress?: Address;
    categorizedItems: DtoCartItemCategory[] = [];
    discount: number = 0;
    coupon?:  Coupon;
    payment?:  PaymentMethod;
    customerCard?:  DtoCustomerCard;
    discountDeliveryFee: number = 0;
    deliveryFee: number = 0;
    orderType:OrderType|undefined;
    orderMode:string="DEFAULT";
    orderTiming:string="";
    deliveryDateTime?:string=undefined;
    whereToLeave:string="";
    deliveryTimeWindow?: DtoDeliveryTimeWindow;
    get subtotalDeliveryFee(): number {
        var d = 0;
        if (this.discountDeliveryFee >= 0)
            d = this.discountDeliveryFee;
        if (d > this.deliveryFee)
            d = this.deliveryFee;
        return this.deliveryFee - d;
    }
    get subtotal(): number {
        var n =0;
        try {
            n=Enumerable.from(this.categorizedItems)
            .select(p => Enumerable.from(p.items).select( s=>s.subtotal).sum())
            .sum();
        } catch (error) {
            //console.log('error subtotal');
            //console.log(error);
        }
        return n;
    }
    get total(): number {
        var d = 0, df = 0;
        if (this.discount >= 0)
            d = this.discount;
        if (d > this.subtotal)
            d = this.subtotal;

        if (this.subtotalDeliveryFee >= 0)
            df = this.subtotalDeliveryFee;

        return this.subtotal - d + df;
    }
}
