import { Component, Input, OnInit } from '@angular/core';
import { IconsService } from 'src/app/services/icons.service';
import { DtoCart } from 'src/app/dto/dto-cart';
import { CartService } from 'src/app/services/cart.service';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-choose-payment-on-delivery',
  templateUrl: './choose-payment-on-delivery.component.html',
  styleUrls: ['./choose-payment-on-delivery.component.scss']
})
export class ChoosePaymentOnDeliveryComponent implements OnInit {
  @Input() cart?: DtoCart;

  constructor(public paymentSvc: PaymentService, public cartSvc: CartService, public icontns: IconsService) { }

  ngOnInit(): void {
    
  }
}
