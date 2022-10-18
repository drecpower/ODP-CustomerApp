import { Injectable } from '@angular/core';
import * as Enumerable from 'linq';
import { Address, Customer, CustomerAppEndpoint, DtoCartItem, DtoCartOptionsSelected, DtoOrderResponse, Merchant, Order, OrderItem, OrderItemOption, Product } from 'src/app/api/models';
import { DtoCartToSend } from 'src/app/api/models/dto-cart-to-send';
import { DtoCart } from 'src/app/dto/dto-cart';
import { ManifestService } from '../manifest.service';
import { IOrderAdapter } from './adapters/i-order-adapter';
import { OAdWebApi } from './adapters/o-ad-webapi';
import { SelectedService } from '../selected/selected.service';
import { OrderType } from 'src/enum/enums';
import { Guid } from 'guid-typescript';
import { EventService } from '../event/event.service';
import { OrderStorageService } from '../order-storage/order-storage.service';
import { UserService } from '../user.service';
import { OAdOrbitDb } from './adapters/o-ad-orbitdb';
import { CryptoService } from '../crypto/crypto.service';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  endpoint: CustomerAppEndpoint | undefined;
  adapter: IOrderAdapter | undefined;
  constructor(private manifestSvc: ManifestService, private selectedSvc: SelectedService, private integratorSvc: EventService,
    private orderStorageSvc: OrderStorageService, public userSvc: UserService,public cryptoSvc:CryptoService) {
    var _self = this;
    //console.log('constructor order service')
    this.selectedSvc.onCustomerAppEndpointList.subscribe(
      d => {
        _self.initialize();
      }
    );
    
  }


  initialize() {
    console.log('initialize order service')
    try {
      if (this.selectedSvc.customerAppEndpointList) {
        this.endpoint = Enumerable.from(this.selectedSvc.customerAppEndpointList)
          .where(x => x.type == "ORDER").defaultIfEmpty(undefined).firstOrDefault();
        if (this.endpoint) {
          switch (this.endpoint.protocolType) {
            case "ORBIT_DB":
               this.adapter = new OAdOrbitDb(this.endpoint);
              break;
            case "WEB_API":
              this.adapter = new OAdWebApi(this.endpoint);
              break;
            default:
              break;
          }
        }
      }
    } catch (error) {

    }
  }

  async send(cart: DtoCart) {
    var error: string = "error";
    //console.log(cart);
    this.initialize();
    var guidId = Guid.create().toString();
    var cartToSend: DtoCartToSend = {
      id: guidId,
      address: undefined,
      items: undefined,
      coupon: undefined,
      deliveryDateTime: undefined,
      deliveryFee: undefined,
      deliveryTimeWindow: undefined,
      discount: undefined,
      discountDeliveryFee: undefined,
      orderTiming: undefined,
      orderType: undefined,
      payment: undefined,
      subtotal: undefined,
      subtotalDeliveryFee: undefined,
      total: undefined,
      whereToLeave: undefined,
      merchantGroupId: this.manifestSvc.merchantGroupId,
      salesChannel: "ODP",
      isTest: false,
      orderMode: undefined,
      customer: undefined,
      additionalFees: undefined,
      benefits: undefined,
      deliveryBy: "MERCHANT",
      externalId: undefined,
      merchantId: undefined,
      observations: undefined,
      postBackUrl: undefined,
      table: undefined
    };
    var keysToSend = Object.keys(cartToSend);
    var keysCart = Object.keys(cart);
    for (let i = 0; i < keysCart.length; i++) {
      if (keysToSend.indexOf(keysCart[i]) >= 0) {
        (<any>cartToSend)[keysCart[i]] = (<any>cart)[keysCart[i]];
      }
      const element = keysCart[i];
    }
    (<any>cartToSend.items) = [];
    for (let idxCat = 0; idxCat < cart.categorizedItems.length; idxCat++) {
      const element = cart.categorizedItems[idxCat];
      for (let idxIt = 0; idxIt < cart.categorizedItems[idxCat].items.length; idxIt++) {
        const it = cart.categorizedItems[idxCat].items[idxIt];
        var its: DtoCartItem =
        {
          comments: it.comments,
          optionsPrice: it.optionsPrice,
          quantity: it.quantity,
          subtotal: it.subtotal,
          itemId: it.item.id,
          fractions: it.fractions,
          type: it.type,
          itemPrice: it.item.price,
          name:it.item.productIdNavigation?.name!
        };
        if (it.options) {
          its.options = [];
          for (let idxOp = 0; idxOp < it.options.length; idxOp++) {
            const op = it.options[idxOp];
            var opPush: DtoCartOptionsSelected = {
              optionId: op.OptionId,
              quantity: op.Quantity,
              price: op.Price,
              type: op.Type
            }
            its.options.push(opPush);
          }
        }
        cartToSend.items?.push(its);
      }
    }
    cartToSend.subtotal = cart.subtotal;
    cartToSend.total = cart.total;
    cartToSend.subtotalDeliveryFee = cart.subtotalDeliveryFee;

    //to test
    cartToSend.customer = <Customer>{
      documentNumber: "12345612345",
      email: "tony@avengers.com",
      name: "Tony Stark",
      phoneNumber: "12345678901",
    }
    cartToSend.address = <Address>{
      city: "my city",
      complement: "my complement",
      country: "my country",
      createdAt: "2022-01-01",
      latitude: 0,
      longitude: 0,
      neighborhood: "my neighborhood",
      postalCode: "my postalCode",
      reference: "my reference",
      state: "my state",
      status: "my status",
      streetName: "my streetName",
      streetNumber: "123",
    }
    if(this.userSvc.user){
      cartToSend.customer.documentNumber = this.userSvc.user?.documentNumber;
      cartToSend.customer.email = this.userSvc.user?.email;
      cartToSend.customer.name = this.userSvc.user?.name; 
      cartToSend.customer.phoneNumber = this.userSvc.user?.phoneNumber;
    }
    if(cart.address){
      cartToSend.address.city = cart.address?.city ? cart.address?.city : "";
      cartToSend.address.complement = cart.address?.complement ? cart.address?.complement : "";
      cartToSend.address.country = cart.address?.country ? cart.address?.country : "";
      cartToSend.address.createdAt = cart.address?.createdAt ? cart.address?.createdAt : "2022-01-01";
      cartToSend.address.latitude = cart.address?.latitude ? cart.address?.latitude : 0;
      cartToSend.address.longitude = cart.address?.longitude ? cart.address?.longitude : 0;
      cartToSend.address.neighborhood = cart.address?.neighborhood ? cart.address?.neighborhood : "";
      cartToSend.address.postalCode = cart.address?.postalCode ? cart.address?.postalCode : "";
      cartToSend.address.reference = cart.address?.reference ? cart.address?.reference : "";
      cartToSend.address.state = cart.address?.state ? cart.address?.state : "";
      cartToSend.address.status = cart.address?.status ? cart.address?.status : "";
      cartToSend.address.streetName = cart.address?.streetName ? cart.address?.streetName : "";
      cartToSend.address.streetNumber = cart.address?.streetNumber ? cart.address?.streetNumber.toString() : "0";
    }
    cartToSend.merchantId = "55d0e3fb-f932-11eb-b388-000d3a8abda5";
    //console.log(cartToSend);

    this.saveOrder(cart, guidId);
    if (this.adapter) {
      try {
        await this.adapter.send(cartToSend);
        error = "";
      } catch (ex: any) {
        this.orderStorageSvc.delOrder(guidId);
        console.log('reject');
        error = ex;
        if (ex.name == 'HttpErrorResponse') {
          error = "Canot access url Order ";
          if (ex.url) {
            error += ex.url;
          }
        }
      }
    } else {
      error = "adapter order not configured";
    }
    return error;
  }
  async saveOrder(cart: DtoCart, guidId: string) {
    var order: Order = {
      id: guidId,
      status: "B_PLC",
      merchantId: this.selectedSvc.selectedMerchant?.id,
      customerId: undefined,
      addressId: undefined,
      addressIdNavigation: undefined,
      orderItem: [],
      couponId: undefined,
      couponIdNavigation: undefined,
      deliveryDateTime: undefined,
      deliveryFee: undefined,
      // deliveryTimeWindow: undefined,
      // discountDeliveryFee: undefined,
      orderTiming: undefined,
      orderType: undefined,
      // payment: undefined,
      subTotal: undefined,
      // total: undefined,
      // whereToLeave: undefined,
      // merchantGroupId: this.manifestSvc.merchantGroupId,
      salesChannel: "ODP",
      isTest: false,
      orderMode: undefined,
      customerIdNavigation: undefined,
      additionalFees: undefined,
      benefits: undefined,
      deliveryBy: "MERCHANT",
      externalId: undefined,
      observations: undefined,
      postBackUrl: undefined,
      table: undefined
    };
    var keysToSend = Object.keys(order);
    var keysCart = Object.keys(cart);
    for (let i = 0; i < keysCart.length; i++) {
      if (keysToSend.indexOf(keysCart[i]) >= 0) {
        (<any>order)[keysCart[i]] = (<any>cart)[keysCart[i]];
      }
      const element = keysCart[i];
    }
    (<any>order.orderItem) = [];
    for (let idxCat = 0; idxCat < cart.categorizedItems.length; idxCat++) {
      const element = cart.categorizedItems[idxCat];
      for (let idxIt = 0; idxIt < cart.categorizedItems[idxCat].items.length; idxIt++) {
        const it = cart.categorizedItems[idxCat].items[idxIt];
        if (it.type == "PIZZA") {
          var p: Product = {
            name: it.name
          };
          it.item.productIdNavigation = p;
        }
        var oI: OrderItem =
        {
          observations: it.comments,
          orderId: order.id,
          unitPrice: it.item.price,
          externalCode: it.item.externalCode,
          itemIdNavigation: it.item,
          addition: it.optionsPrice,
          quantity: it.quantity,
          itemId: it.item.id,
          type: it.type,
          fractions: it.fractions
        };        
        if (it.options) {
          oI.orderItemOption = [];
          for (let idxOp = 0; idxOp < it.options.length; idxOp++) {
            const op = it.options[idxOp];
            var opPush: OrderItemOption = {
              optionId: op.OptionId,
              quantity: op.Quantity,
              type: op.Type,
              unitPrice: op.Price,
              optionIdNavigation: {
                productIdNavigation: {
                  name: op.Name
                }
              }
            }
            oI.orderItemOption.push(opPush);
          }
        }
        order.orderItem?.push(oI);
      }
    }
    order.subTotal = cart.subtotal;
    // order.total = cart.total;
    order.deliveryFee = cart.subtotalDeliveryFee;

    //to test
    order.customerIdNavigation = <Customer>{
      documentNumber: "12345612345",
      email: "tony@avengers.com",
      name: "Tony Stark",
      phoneNumber: "12345678901",
    }
    if (order.orderType == OrderType.DELIVERY) {
      order.addressIdNavigation = cart.address;
    }
    this.orderStorageSvc.addOrder(order);
    // await _DB.localorders.add(order);
  }
}
