import { Component, Input, OnInit } from '@angular/core';
import { DtoCart } from 'src/app/dto/dto-cart';
import { CouponsComponent } from '../../coupons/coupons.component';
import { Coupon } from 'src/app/api/models/coupon';
import { CouponService } from 'src/app/services/coupon/coupon.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DialogType, DtoDialog } from 'src/app/dto/dto-dialog';

@Component({
  selector: 'app-cart-coupons',
  templateUrl: './cart-coupons.component.html',
  styleUrls: ['./cart-coupons.component.scss']
})
export class CartCouponsComponent implements OnInit {

  @Input() coupon?:  Coupon;
  constructor(public couponSvc: CouponService, public dialogSvc: DialogService) {

  }

  ngOnInit(): void {
  }

  AddCoupon() {
    return new Promise<Coupon>(
      (resolve, reject) => {
        // var dialogData: any = {
        //   title: title,
        // }
        var dialogRef = this.dialogSvc.open({
          type: DialogType.MAT_DIALOG,
          component: CouponsComponent,
//        data: dialogData, 
          closeOnNavigation: false
        });
        dialogRef.afterClosed().subscribe(
          (ok: any) => {
            resolve(ok);
          },
          (err: any) => {
            resolve({});
          }
        )
      }
    )
  }

  // addCupom() {
  //   this.router.navigateByUrl('/cupom');
  // }

}
