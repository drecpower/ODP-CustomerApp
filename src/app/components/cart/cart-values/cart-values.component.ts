import { Component, Input, OnInit } from '@angular/core';
import { DtoCart } from 'src/app/dto/dto-cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-values',
  templateUrl: './cart-values.component.html',
  styleUrls: ['./cart-values.component.scss']
})
export class CartValuesComponent implements OnInit {

  constructor(public cartSvc:CartService) { }

  ngOnInit(): void {
  }

  addCupom(){

  }
}
