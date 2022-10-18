import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderType } from 'src/enum/enums';
import { IconsService } from 'src/app/services/icons.service';
import { SelectedService } from 'src/app/services/selected/selected.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-cart-confirmation',
  templateUrl: './cart-confirmation.component.html',
  styleUrls: ['./cart-confirmation.component.scss']
})
export class CartConfirmationComponent implements OnInit {

  constructor(public cartSvc: CartService,
    public selectedSvc: SelectedService,
    public icons: IconsService,
    public dialogSvc:DialogService
  ) { }
  OrderType = OrderType;

  ngOnInit(): void {
  }

}
