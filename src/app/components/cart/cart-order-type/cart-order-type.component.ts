import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DtoCart } from 'src/app/dto/dto-cart';
import { MatTabGroup } from "@angular/material/tabs";
import { IconsService } from 'src/app/services/icons.service';
import { MatTabsModule } from '@angular/material/tabs'
import { CartService } from 'src/app/services/cart.service';
import { DtoDeliveryTimeWindow } from 'src/app/dto/dto-delivery-time-window';
import { animFadeInOutAnimation, animFastFadeInOutAnimation, animGrowAnimation, animGrowMenuAnimation, animRouteTransition, animSlideInOutAnimation, AnimSlowFadeInOutAnimation, longAnimFadeInOutAnimation } from 'src/app/shared/animations';
import { AppOperation, OrderType } from 'src/enum/enums';
import { Address } from 'src/app/api/models/address';
import { SelectedService } from 'src/app/services/selected/selected.service';
@Component({
  selector: 'app-cart-order-type',
  templateUrl: './cart-order-type.component.html',
  styleUrls: ['./cart-order-type.component.scss'],
  animations: [
    animRouteTransition,
    animFadeInOutAnimation,
    longAnimFadeInOutAnimation,
    AnimSlowFadeInOutAnimation,
    animFastFadeInOutAnimation,
    animSlideInOutAnimation,
    animGrowAnimation,
    animGrowMenuAnimation]
})


export class CartOrderTypeComponent implements OnInit {

  tst = -1;
  deliveryType = [
    { type: "Order for Delivery", value: OrderType.DELIVERY },
    { type: "Take Out in Store", value: OrderType.TAKEOUT }
  ];
  active: boolean = false;
  selectedIndex: number = 0;
  constructor(
    public icons: IconsService,
    public cartSvc: CartService,
    public selectedSvc: SelectedService
  ) { }
  // address = {
  //   street: "Ebury Square",
  //   number: "29",
  //   district: "VSW1W 8LH",
  //   city: "London",
  //   state: "RU"
  // };
  leaveOrder = [
    { type: "House / Building Gate", value: "GATE" },
    { type: "House / Building Concierge", value: "CONCIERGE" },
    { type: "Find the Delivery Man", value: "MAN" }
  ];

  deliveryTimeWindow: DtoDeliveryTimeWindow[] = [];
  ngOnInit(): void {
    //console.log("ngOnInit - "+this.cartSvc.orderType);
    if (this.cartSvc.orderType == "TAKEOUT") {
      this.selectTab(1,true);
    } else {
      this.selectTab(0,true);
    }
  }

  selectTab(index: any, ignoreCart?: boolean) {
    var _self = this;
    var first = _self.selectedIndex == index;
    _self.selectedIndex = index;
    if (!ignoreCart && !first) {
      _self.cartSvc.selectOrderType(this.deliveryType[index].value).then(function (d) {
        if (d == OrderType.DELIVERY) {
          setTimeout(function(){
            _self.selectedIndex = 0;
          })
        } else if (d == OrderType.TAKEOUT) {
          setTimeout(function(){
            _self.selectedIndex = 1;
          })
        }
        _self.loadDeliveryTimeWindow()
      });
    }else{
      _self.loadDeliveryTimeWindow();
    }
  }
  loadDeliveryTimeWindow() {
    if (this.selectedIndex == 0) {
      this.deliveryTimeWindow = [
        {
          value: 6.99,
          nowTimeStart: "30",
          nowTimeEnd: "60",
          type: "DELIVERY"
        },
        {
          value: 8.99,
          dateStart: "2022-02-09 12:00",
          dateEnd: "2022-02-09 12:30",
          type: "DELIVERY"
        },
        {
          value: 5.99,
          dateStart: "2022-02-09 13:30",
          dateEnd: "2022-02-09 14:00",
          type: "DELIVERY"
        }
      ];
    } else {
      this.deliveryTimeWindow = [
        {
          value: 0,
          nowTimeStart: "30",
          nowTimeEnd: "60",
          type: "TAKEOUT"
        },
        {
          value: 0,
          dateStart: "2022-02-09 12:00",
          dateEnd: "2022-02-09 12:30",
          type: "TAKEOUT"
        },
        {
          value: 0,
          dateStart: "2022-02-09 13:30",
          dateEnd: "2022-02-09 14:00",
          type: "TAKEOUT"
        }
      ];
    }
  }
  
  get selectedAddress(): Address | undefined {
    var address: Address | undefined;
    if (this.cartSvc.orderType == "DELIVERY") {
      if (this.cartSvc.gpsAddress) {
        address = this.cartSvc.gpsAddress;
      } else if (this.cartSvc.address) {
        address = this.cartSvc.address;
      }
    } else if (this.selectedSvc.selectedMerchant) {
      address = this.selectedSvc.selectedMerchant;
    }
    return address;
  }

  changeAddress() {

  }

}
