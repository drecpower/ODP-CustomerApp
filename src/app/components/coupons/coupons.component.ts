import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IconsService } from 'src/app/services/icons.service';
import { MatRadioModule } from '@angular/material/radio';
import { CouponService } from 'src/app/services/coupon/coupon.service';
import { Coupon } from 'src/app/api/models/coupon';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import * as moment from 'moment';
@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {
  code?: string = undefined;
  addCode?: string;
  selectedCoupon: Coupon | undefined;
  selectedTab: string = "";
  coupons: Coupon[] = [];
  public readonly AVAILABLE="AVAILABLE";
  public readonly UNAVAILABLE="UNAVAILABLE";
  constructor(public cartSvc: CartService, public couponSvc: CouponService, public icons: IconsService, public dialogSvc: DialogService) { }
  ngOnInit(): void {
    this.selectedTab = this.AVAILABLE;
    if (this.couponSvc.couponsAvailables) {
      this.coupons = this.couponSvc.couponsAvailables;
    }
    if (this.cartSvc.coupon) {
      this.code = this.cartSvc.coupon.code!;
      this.selectedCoupon = this.cartSvc.coupon;
    }
  }

  addCoupon() {
    if (this.code) {
      if (this.couponSvc.addCoupon(this.code)) {
        this.dialogSvc.back();
      }
    }
  }

  selectCoupon(coupon?: MatRadioModule) {
    if(this.selectedTab == this.AVAILABLE){
      this.selectedCoupon = coupon;
      this.cartSvc.selectCoupon(this.selectedCoupon);
      this.dialogSvc.back();
    }
  }

  selectTab(index: any) {
    if (index == 0) {
      this.selectedTab = this.AVAILABLE;
      if (this.couponSvc.couponsAvailables) {
        this.coupons = this.couponSvc.couponsAvailables;
      }
    } else {
      this.selectedTab = this.UNAVAILABLE;
      if (this.couponSvc.couponsUnavailables) {
        this.coupons = this.couponSvc.couponsUnavailables;
      }
    }

    //console.log(index);
  }

  m(d:any){
    return moment().isSameOrBefore(d);
  }
}
