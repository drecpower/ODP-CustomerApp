import { Injectable } from '@angular/core';
import * as Enumerable from 'linq';
import { DtoCustomerCard } from '../dto/dto-customer-card';
import { PaymentService } from './payment/payment.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerCardService {

  cards: DtoCustomerCard[] | undefined;
  constructor(private paymentSvc: PaymentService) { 
    this.readCards();
  }
  readCards() {
    if (this.paymentSvc.onlineMethod) {
      this.cards = Enumerable.from(this.lst).where(x => x.gateway == this.paymentSvc.onlineMethod?.gateway).toArray();
    }
  }
  lst = [{
    brand: 'VISA',
    method: 'CREDIT',
    number: '******2311',
    name: 'John Wick',
    documentNumber: '121***333/*3',
    nickname: 'Guns',
    gateway: "REDE"
  },
  {
    brand: 'ELO',
    method: 'DEBIT',
    number: '****1995',
    name: 'Peter Pan',
    documentNumber: '111***711/*3',
    nickname: 'Green',
    gateway: "REDE"
  },
  {
    brand: 'MASTER',
    method: 'DEBIT',
    number: '****1995',
    name: 'Michael Jackson',
    documentNumber: '111***122/*1',
    nickname: 'Green',
    gateway: "CIELO"
  },
  ]
}
