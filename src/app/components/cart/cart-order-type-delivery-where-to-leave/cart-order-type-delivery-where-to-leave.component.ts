import { Component, OnInit } from '@angular/core';
import * as Enumerable from 'linq';
import { CartService } from 'src/app/services/cart.service';
import { IconsService } from 'src/app/services/icons.service';

@Component({
  selector: 'app-cart-order-type-delivery-where-to-leave',
  templateUrl: './cart-order-type-delivery-where-to-leave.component.html',
  styleUrls: ['./cart-order-type-delivery-where-to-leave.component.scss']
})
export class CartOrderTypeDeliveryWhereToLeaveComponent implements OnInit {

  leaveOrder = [
    { type: "House / Building Gate", value: "GATE" },
    { type: "House / Building Concierge", value: "CONCIERGE" },
    { type: "Find the Delivery Man", value: "MAN" }
  ];
  selectedIndexWhereToLeave: number = 0;
  constructor(
    public icons: IconsService,
    private cartSvc: CartService
  ) { }

  ngOnInit(): void {
    try {
      if (this.cartSvc.whereToLeave) {
        var item = Enumerable.from(this.leaveOrder).where(x => x.value == this.cartSvc.whereToLeave).defaultIfEmpty().firstOrDefault();
        if (item) {
          this.selectedIndexWhereToLeave = this.leaveOrder.indexOf(item);
        }
      }
    } catch (error) {

    }
  }

  selectWhereToLeave(index: any) {
    this.selectedIndexWhereToLeave = index;
    //console.log("sl" + index);
    this.cartSvc.selectWhereToLeave(this.leaveOrder[index].value);
    let el = document.getElementById("sl" + index);
    el?.scrollIntoView();
  }
  moveRight(div: any) {
    //console.log('moveright')
    document.getElementById(div)!.scrollLeft += 100;
  }

  moveLeft(div: any) {
    //console.log(div)
    document.getElementById(div)!.scrollLeft += -100;
  }

}
