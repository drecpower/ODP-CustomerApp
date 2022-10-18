import { Injectable } from '@angular/core';
import * as Enumerable from 'linq';
import { Customer } from '../api/models';
import { Address } from '../api/models/address';
import { DtoCustomerCard } from '../dto/dto-customer-card';
import { PaymentService } from './payment/payment.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  address: Address[] | undefined = [];
  user: Customer | undefined;
  constructor() {
    this.read();
  }

  Can(roleName: string) {
    return true; //TODO: logic here
  }

  addAddress(address: Address) {
    if (this.address) {
      if (this.address.indexOf(address) < 0) {
        this.address?.push(address);
      }
      this.persist();
    }
  }

  updateAddress(address: Address, oldAddress: Address) {
    if (this.address && this.address.indexOf(oldAddress) >= 0) {
      this.address[this.address.indexOf(oldAddress)] = address;
    } else{
      this.addAddress(address);
    }
    this.persist();
  }

  removeAddress(address: Address) {
    if (this.address) {
      if (this.address.indexOf(address) >= 0) {
        this.address.splice(this.address.indexOf(address), 1);
      }
      this.persist();
    }
  }

  persist() {
    localStorage.setItem("address", JSON.stringify(this.address));
  }

  read() {
    var str = localStorage.getItem("address");
    if (str) {
      var ad: Address[] = JSON.parse(str!);
      if (ad) {
        this.address = ad;
        //console.log("read");
        //console.log(this.address);
      }
    }
  }

  clear() {
    this.address = undefined;
    this.persist();
  }

  setCustomerId(id:string|undefined){
    if(id){
      if(!this.user){
        this.user={};
      }
      if(this.user){
        this.user.id = id;
      }
    }
  }

}
