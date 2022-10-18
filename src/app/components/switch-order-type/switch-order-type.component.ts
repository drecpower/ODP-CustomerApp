import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { SelectedService } from 'src/app/services/selected/selected.service';
import { AppOperation, OrderType } from 'src/enum/enums';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DialogType } from 'src/app/dto/dto-dialog';
import { ChooseMerchantComponent } from '../choose-merchant/choose-merchant.component';
import { Merchant } from 'src/app/api/models/merchant';
import { ChooseAddressComponent } from '../choose-address/choose-address.component';
import { Address } from 'src/app/api/models';
import * as Enumerable from 'linq';


@Component({
  selector: 'app-switch-order-type',
  templateUrl: './switch-order-type.component.html',
  styleUrls: ['./switch-order-type.component.scss']
})
export class SwitchOrderTypeComponent implements OnInit {
  OrderType = OrderType;
  block: boolean = true;

  private _selected: OrderType | undefined;
  public get selected(): OrderType | undefined {
    return this._selected;
  }
  public set selected(v: OrderType | undefined) {
    this._selected = v;
    this.validate();
  }
  acceptTakeout: boolean = false;
  acceptDelivery: boolean = false;

  constructor(public cartSvc: CartService, public selectedSvc: SelectedService,
    public snackBar: MatSnackBar, public dialogSvc: DialogService) {
    if (this.cartSvc.orderType) {
      this._selected = this.cartSvc.orderType;
    }
    if (this.selectedSvc.type == AppOperation.SINGLE_MERCHANT) {
      if (this.selectedSvc && this.selectedSvc.selectedMerchant) {
        if (this.selectedSvc.selectedMerchant.acceptDeliveryOrder) {
          this.acceptDelivery = true;
        }
        if (this.selectedSvc.selectedMerchant.acceptTakeoutOrder) {
          this.acceptTakeout = true;
        }
      }
    }else if (this.selectedSvc.type == AppOperation.MULTI_MERCHANT){
      if (selectedSvc.selectedMerchantGroup && selectedSvc.selectedMerchantGroup.merchant) {
        if (Enumerable.from(selectedSvc.selectedMerchantGroup.merchant).where(x => x.acceptDeliveryOrder == true).any()) {
          this.acceptDelivery = true;
        }
        if (Enumerable.from(selectedSvc.selectedMerchantGroup.merchant).where(x => x.acceptTakeoutOrder == true).any()) {
          this.acceptTakeout = true;
        }
        // if (Enumerable.from(selectedSvc.selectedMerchantGroup.merchant).where(x => x.acceptTableOrder == true).any()) {
        //   this.acceptTable = true;
        // }
      }
    }
  }


  ngOnInit(): void {
  }
  validate(orderType: any = "") {
    if (orderType == OrderType.TAKEOUT) {
      if (this.acceptTakeout) {
        this.selected = orderType;
      } else {
        this.showSnackBar("This option is currently unavailable in this store.");
      }
    } else if (orderType == OrderType.DELIVERY) {
      if (this.acceptDelivery) {
        this.selected = orderType;
      } else {
        this.showSnackBar("This option is currently unavailable in this store.");
      }
    }
  }

  showSnackBar(msg: string) {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
  confirm() {
    var _self = this;
    if (_self.cartSvc.orderType != _self.selected) {
      if (_self.selectedSvc.type == AppOperation.MULTI_MERCHANT) {
        if (_self.selected == OrderType.TAKEOUT) {
          var dialogRef = this.dialogSvc.open(
            {
              type: DialogType.MAT_DIALOG,
              component: ChooseMerchantComponent,
              closeOnNavigation: false
            }
          );
          dialogRef.afterClosed().subscribe(
            async (merchant: Merchant) => {
              if (merchant) {
                _self.close();
              }
            },
            (err: any) => {
              //console.log("err: " + err)
            }
          )
        } else if (_self.selected == OrderType.DELIVERY && !_self.cartSvc.address && !_self.cartSvc.gpsAddress) {
          var dialogRef = this.dialogSvc.open(
            {
              type: DialogType.MAT_DIALOG,
              component: ChooseAddressComponent,
              closeOnNavigation: false,
              data: { address: undefined, needValidAddress: true }
            }
          );
          dialogRef.afterClosed().subscribe(
            async (address: Address) => {
              _self.close();
              if (address) {
              }
            },
            (err: any) => {
              //console.log("err: " + err)
            }
          )
        } else {
          this.cartSvc.selectOrderType(this.selected).then(function (d) {
            if (d == _self.selected) {
              _self.close();
            }
          })
        }
      } else {
        this.cartSvc.selectOrderType(this.selected).then(function (d) {
          if (d == _self.selected) {
            _self.close();
          }
        })
      }


    } else {
      this.close();
    }

  }
  close() {
    this.dialogSvc.back();
  }

  capitalizeFirstLetter(type: string | undefined) {
    var ret = "";
    if (type) {
      ret = type.toLowerCase().charAt(0).toUpperCase() + type.toLowerCase().slice(1);
    }
    return ret;
  }
}
