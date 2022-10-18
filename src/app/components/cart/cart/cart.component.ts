import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogType, DtoDialog } from 'src/app/dto/dto-dialog';
import { CartService } from 'src/app/services/cart.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { IconsService } from 'src/app/services/icons.service';
import { animSlideInOutAnimation } from 'src/app/shared/animations';
import { OrderType } from 'src/enum/enums';
import { UserService } from 'src/app/services/user.service';
import { ChooseAddressComponent } from '../../choose-address/choose-address.component';
import { SplashScreenComponent } from '../../splash-screen/splash-screen.component';
import { CartConfirmationComponent } from '../cart-confirmation/cart-confirmation.component';
import { CartSendSplashComponent } from '../cart-send-splash/cart-send-splash.component';
import { CustomerEditorComponent } from 'src/app/components/customer-editor/customer-editor.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [
    animSlideInOutAnimation
  ]
})
export class CartComponent implements OnInit {
  private _tab: string = "item";
  @Input() set tab(value: string | undefined) {
    if (value == undefined || value == null || value == "") {
      this.tab = "items"
    } else {
      this._tab = value;
    }
  }
  get tab() {
    return this._tab;
  }
  constructor(public cartSvc: CartService, public icons: IconsService, public userSvc: UserService,
    private router: Router, public dialogSvc: DialogService) { }
  continueText = "Continue";
  ngOnInit(): void {
    // var bottomSheet: DtoDialog = {
    //   type: DialogType.MAT_BOTTOM_SHEET,
    //   component: CartConfirmationComponent,
    //   data: {},
    //   closeOnNavigation: false
    // };
    // var bottomSheetRef = this.dialogSvc.open(bottomSheet);
    // bottomSheetRef.afterDismissed().subscribe(
    //   (ok: any) => {
    //     if (ok) {
    //       // var ret = this.deliveryAddressSvc.checkAddress(data);;
    //       // if (ret.deliverable) {
    //       //   if (ok == "WITHOUT_STREET_NUMBER") {
    //       //     data.withotStreetNumber = true;
    //       //   } else {
    //       //     data.streetNumber = ok;
    //       //   }
    //       //   this.tempEditAddress(data);
    //       //   bottomSheetRef.dismiss();
    //       // } else {
    //       //   this.showSnackBar("This store does not work at this address.");
    //       // }
    //       this.cartSvc.send();
    //     }
    //   },
    //   (err: any) => {
    //   }
    // );
  }
  sendOrder() {

  }
  continue() {
    var _self = this;
    if (this.tab == "items") {
      //validade if ok..
      this.router.navigateByUrl('/cart/type');
      if (this.cartSvc.orderType == OrderType.DELIVERY && this.cartSvc.gpsAddress) {
        this.continueText = "Define address"
      } else {
        this.continueText = "Continue"
      }
      this.tab = "type";
    } else if (this.tab == "type") {
      //validade if ok..
      if (this.validateGo("payment")) {
        this.router.navigateByUrl('/cart/payment');
        this.continueText = "Send order"
      }
    } else {
      if (!(this.userSvc.user && this.userSvc.user?.id) && this.completData()) {
        var dialog: DtoDialog = {
          type: DialogType.MAT_DIALOG,
          component: CustomerEditorComponent,
          closeOnNavigation: false
        };
        var dialogRef = this.dialogSvc.open(dialog);
        dialogRef.afterClosed().subscribe(
          (d: any) => {
            if (!this.completData()) {
              this.continue();
            }
          },
          (err: any) => {
            //console.log("err: " + err)
          }
        );
      } else {
        var bottomSheet: DtoDialog = {
          type: DialogType.MAT_BOTTOM_SHEET,
          component: CartConfirmationComponent,
          data: {},
          closeOnNavigation: false
        };
        var bottomSheetRef = this.dialogSvc.open(bottomSheet);
        bottomSheetRef.afterDismissed().subscribe(
          (ok: any) => {
            if (ok) {
              // var dialogRef = this.dialogSvc.open({
              //   type: DialogType.MAT_DIALOG,
              //   component: CartSendSplashComponent,
              //   data: {},
              //   closeOnNavigation: false
              // });
              // dialogRef.afterClosed().subscribe(
              //   (d: any) => {
              //     if (d) {

              //     }
              //   },
              //   (err: any) => {

              //   }
              // )
              if (ok) {
                this.cartSvc.send();

              }
            }
          },
          (err: any) => {
          }
        );
      }
    }
  }
  completData() {
    var ret = true;
    if (this.userSvc.user?.name != '' && this.userSvc.user?.name != undefined &&
      this.userSvc.user?.email != '' && this.userSvc.user?.email != undefined &&
      this.userSvc.user?.phoneNumber != '' && this.userSvc.user?.phoneNumber != undefined &&
      this.userSvc.user?.documentNumber != '' && this.userSvc.user?.documentNumber != undefined) {
      ret = false;
      console.log("have user");
    } else {
      console.log("not have user");
    }
    return ret;
  }
  back() {
    if (this.tab == "payment") {
      //validade if ok..
      this.continueText = "Continue"
      this.router.navigateByUrl('/cart/type');
    } else if (this.tab == "type") {
      //validade if ok..
      this.continueText = "Continue"
      this.router.navigateByUrl('/cart/');
    }
  }
  catalog() {

  }
  clear() {
    //Do you really ?
    this.cartSvc.clear();
    this.router.navigate(['/catalog']);
  }
  validateGo(route: string) {
    var go = false;
    if (route == "payment") {
      if (this.cartSvc.orderType == OrderType.DELIVERY) {
        if (this.cartSvc.gpsAddress || this.cartSvc.address == undefined || (this.cartSvc.address && this.cartSvc.address.streetNumber == undefined && this.cartSvc.address.withotStreetNumber != true)) {

          var dialogRef = this.dialogSvc.open({
            type: DialogType.MAT_DIALOG,
            component: ChooseAddressComponent,
            data: { address: this.cartSvc.gpsAddress, needValidAddress: true },
            closeOnNavigation: false
          });
          dialogRef.afterClosed().subscribe(
            (d: any) => {
              if (d) {
                this.continueText = "Continue";
              }
            },
            (err: any) => {
              //console.log("err: " + err)
            }
          );
        } else {
          go = true;
        }
      } else if (this.cartSvc.orderType == OrderType.TAKEOUT) {
        go = true;
      }
    }
    return go;

  }

}
