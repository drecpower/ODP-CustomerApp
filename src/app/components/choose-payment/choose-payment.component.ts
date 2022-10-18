import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { IconsService } from 'src/app/services/icons.service';
import { Location } from '@angular/common';
import { ElementSchemaRegistry } from '@angular/compiler';
import { DtoCart } from 'src/app/dto/dto-cart';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-choose-payment',
  templateUrl: './choose-payment.component.html',
  styleUrls: ['./choose-payment.component.scss']
})

export class ChoosePaymentComponent implements OnInit {
  @Input() cart?: DtoCart;
  @Input() data: any;
  selectedTab: number = 0;
  @Output() closeEvent = new EventEmitter();

  constructor(
    public icons: IconsService, private cartSvc: CartService
  ) { }

  ngOnInit(): void {
    try {
      if (this.cartSvc.payment?.type =="OFFLINE") {
        this.selectedTab = 1;
      }
    } catch (error) {

    }
  }

  selectTab(index: any) {
    this.selectedTab=index;
  }

}
