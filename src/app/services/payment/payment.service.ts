import { Injectable } from '@angular/core';
import * as Enumerable from 'linq';
import { PaymentMethod } from 'src/app/api/models';
import { DtoPaymentOnDelivery } from 'src/app/dto/dto-payment-on-delivery';
import { DtoCustomerCard } from 'src/app/dto/dto-customer-card';
import { SelectedService } from '../selected/selected.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  paymentsOffline: DtoPaymentOnDelivery[] = [];
  paymentsOnline: PaymentMethod[] = [];
  onlineMethod:PaymentMethod|undefined;
  constructor(private selectedSvc: SelectedService) { 
    try {
      var _self = this;
      if (this.selectedSvc.paymentMethodList) {
        _self.process(this.selectedSvc.paymentMethodList);
      }
      this.selectedSvc.onPaymentMethodList.subscribe(d => {
        if (this.selectedSvc.paymentMethodList) {
          _self.process(this.selectedSvc.paymentMethodList);
          //_self.coupons = appshellSvc.selectedMerchant?.coupon;
        }
        // _self.process(this.selectedSvc.paymentMethodList);
      });
    } catch (error) {

    }
  }
  process(payments: PaymentMethod[] | undefined) {
    this.paymentsOffline = [];
    this.paymentsOnline = [];
    if (payments) {
      var list = ["Money", "Credit", "Debit","Voucher","Food_Voucher","Meal_Voucher"];
      for (let i = 0; i < list.length; i++) {
        var onlineMethods = Enumerable.from(payments).where(x => x.type =="OFFLINE" && x.method == list[i].toUpperCase()).toArray();
        if (onlineMethods.length > 0) {
          this.paymentsOffline.push(
            {
              groupName: list[i],
              items: onlineMethods
            });
        }
      }
       this.paymentsOnline = Enumerable.from(payments).where(x => x.type =="ONLINE" && x.method=="DIGITAL_WALLET").toArray();
     
      var onlineMethod=Enumerable.from(payments).where(x => x.type =="ONLINE" && (x.method=="CREDIT" || x.method=="DEBIT") )
      .firstOrDefault();
      if(onlineMethod){
        this.onlineMethod = onlineMethod
      }
    }
  }
}
