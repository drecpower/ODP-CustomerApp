import { Component, Input, OnInit } from '@angular/core';
import * as Enumerable from 'linq';
import { DtoDeliveryTimeWindow } from 'src/app/dto/dto-delivery-time-window';
import { CartService } from 'src/app/services/cart.service';
import { IconsService } from 'src/app/services/icons.service';
import { OrderType } from 'src/enum/enums';

@Component({
  selector: 'app-cart-choose-time',
  templateUrl: './cart-choose-time.component.html',
  styleUrls: ['./cart-choose-time.component.scss']
})
export class CartChooseTimeComponent implements OnInit {

  private _time: DtoDeliveryTimeWindow[] = [];
  @Input() set time(value: DtoDeliveryTimeWindow[]) {
    this._time = value;
    this.selectTime();
  }
  get time() {
    return this._time;
  }
  @Input() type: OrderType|undefined;
  deliveryTimeWindowsSelected: DtoDeliveryTimeWindow | undefined = undefined;

  constructor(
    public icons: IconsService,
    private cartSvc: CartService
  ) { }

  ngOnInit(): void {
  }

  selectTime() {
    try {
      var idx = -1;
      if (this.cartSvc.deliveryTimeWindow != undefined  && this.cartSvc.deliveryTimeWindow.type == this.type) {
        var obj = Enumerable.from(this.time).where(x => x.value == this.cartSvc.deliveryTimeWindow!.value
          && ((x.nowTimeStart == this.cartSvc.deliveryTimeWindow!.nowTimeStart
            && x.nowTimeEnd == this.cartSvc.deliveryTimeWindow!.nowTimeEnd) ||
            (x.dateStart == this.cartSvc.deliveryTimeWindow!.dateStart
              && x.dateEnd == this.cartSvc.deliveryTimeWindow!.dateEnd))
        ).firstOrDefault();
        if (obj != undefined) {
          idx = this.time.indexOf(obj!);
        }
      } else {
        idx = 0;
        //console.log('else');
      }
      if (idx >= 0)
        this.selectDeliveryTimeWindow(this.time[idx], idx, "tdel" + idx);
    } catch (error) { }
  }
 
  selectDeliveryTimeWindow(timeWindow: DtoDeliveryTimeWindow, index: any, divId: string) {
    this.deliveryTimeWindowsSelected = timeWindow;
    //console.log('aa'+this.type);
    this.cartSvc.selectDeliveryTimeWindow(timeWindow, this.type);
    let el = document.getElementById(divId + index);
    el?.scrollIntoView();
  }

  moveRight(div: any) {
    document.getElementById(div)!.scrollLeft += 100;
  }

  moveLeft(div: any) {
    //console.log(div)
    document.getElementById(div)!.scrollLeft += -100;
  }

}
