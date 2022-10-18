import { Injectable } from '@angular/core';
import { Address } from 'src/app/api/models';
import { DtoCartItemCategory } from 'src/app/dto/dto-categorized-cart-items';
import { DeliveryFeeService } from '../delivery-fee/delivery-fee.service';
import { DtoDeliveryAddressResult } from './dto-delivery-address-result';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAddressService {

  constructor(private deliveryFeeSvc: DeliveryFeeService) { }

  checkAddress(address: Address) {
    var dto = this.getAddressDetails(address);
    //valid if addres is deriverable
    if (dto.deliverable) {
      //calc delivery fee
      dto.deliveryFee = this.deliveryFeeSvc.calc(dto.radiusDistance, undefined);

    } else {
      dto.message = "Address not deliverable";
    }
    return dto;
  }
  getAddressDetails(address: Address) {
    var dto: DtoDeliveryAddressResult = {
      deliverable: undefined,
      deliveryFee: undefined,
      radiusDistance: undefined,
      merchantId: undefined,
      message: undefined
    };
    try {
      dto.deliverable = true;//Math.random() < 0.5;
      dto.radiusDistance = Math.random() * 1000;
      dto.merchantId = "55d0e3fb-f932-11eb-b388-000d3a8abda5";
    } catch (error) {

    }
    return dto;
  }
}
