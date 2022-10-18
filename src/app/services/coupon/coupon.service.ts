import { Injectable } from '@angular/core';
import * as Enumerable from 'linq';
import * as moment from 'moment';
import { Coupon } from 'src/app/api/models';
import { SelectedService } from '../selected/selected.service';

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private coupons: Coupon[] | undefined;
  public couponsAvailables: Coupon[] | undefined;
  public couponsUnavailables: Coupon[] | undefined;

  constructor(private selectedSvc: SelectedService) {
    var _self = this;
    if (selectedSvc.couponList) {
      _self.coupons = selectedSvc.couponList;
      _self.processCoupons();
    }
    selectedSvc.onCouponList.subscribe(d => {
      if (selectedSvc.couponList) {
        _self.coupons = selectedSvc.couponList;
      }
      _self.processCoupons();
    });
  }
  processCoupons() {
    if (this.coupons) {
      this.couponsAvailables = [];
      this.couponsUnavailables = [];
      var d = moment();
      this.couponsAvailables = Enumerable.from(this.coupons)
        .where(x =>
          x.status == "ACTIVE" &&
          (x.initialValidity == undefined ||
            (
              x.initialValidity != undefined && d.isSameOrAfter(x.initialValidity)
            ))
          &&
          (x.finalValidity == undefined ||
            (
              x.finalValidity != undefined && d.isSameOrBefore(x.finalValidity)
            ))
        ).toArray();
      this.couponsUnavailables = Enumerable.from(this.coupons).where(x => this.couponsAvailables!.indexOf(x) < 0).toArray();
    } else {
      this.couponsAvailables = undefined;
      this.couponsUnavailables = undefined;
    }
  }
  addCoupon(code: string) {
    var ok = false;
    try {
      ok = true;
    } catch (error) {

    }
    return ok;
  }
}
