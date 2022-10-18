import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Address } from 'src/app/api/models';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { GeocoderService } from 'src/app/services/geocoder/geocoder.service';
import { IconsService } from 'src/app/services/icons.service';
import { PostalCodeInfoService } from 'src/app/services/postal-code-info/postal-code-info.service';
import { ChooseStreetNumberComponent } from '../choose-street-number/choose-street-number.component';

import { AppshellService } from 'src/app/services/appshell.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Merchant } from 'src/app/api/models';
import { ChooseMerchantComponent } from '../choose-merchant/choose-merchant.component';
import { DtoCart } from 'src/app/dto/dto-cart';
import * as Enumerable from 'linq';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DialogType, DtoDialog } from 'src/app/dto/dto-dialog';
import { AddressEditorComponent } from '../address-editor/address-editor.component';
import { SelectedService } from 'src/app/services/selected/selected.service';
import { OrderType } from 'src/enum/enums';

@Component({
  selector: 'app-choose-order-type',
  templateUrl: './choose-order-type.component.html',
  styleUrls: ['./choose-order-type.component.scss']
})

export class ChooseOrderTypeComponent implements OnInit {
  acceptTakeout: boolean | undefined;
  acceptDelivery: boolean | undefined;
  acceptTable: boolean | undefined;

  constructor(public cartSvc: CartService, public icons: IconsService, public userSvc: UserService, private selectedSvc: SelectedService,public dialogSvc: DialogService,
    private routerSvc: Router){

    if (selectedSvc.selectedMerchantGroup && selectedSvc.selectedMerchantGroup.merchant) {
      if (Enumerable.from(selectedSvc.selectedMerchantGroup.merchant).where(x => x.acceptDeliveryOrder == true).any()) {
        this.acceptDelivery = true;
      }
      if (Enumerable.from(selectedSvc.selectedMerchantGroup.merchant).where(x => x.acceptTakeoutOrder == true).any()) {
        this.acceptTakeout = true;
      }
      if (Enumerable.from(selectedSvc.selectedMerchantGroup.merchant).where(x => x.acceptTableOrder == true).any()) {
        this.acceptTable = true;
      }
    }
  }

  postalCode: string | undefined;
  ngOnInit(): void {

  }
  ngOnDestroy() {
    // if (window.history.state.modal) {
    //   this.dialogSvc.ignoreBack++;
    //   history.back();
    //   console.log('choose-order-type back');

    // }
  }
  onChoosedAddress() {
    var _self = this;
    console.log("onChoosedAddres");
    if (!(location.href.indexOf("catalog") >= 0)) {
      this.goCatalog();
    } else {
    setTimeout(() => {
      console.log("back 68");
      _self.dialogSvc.back();
    }, 100);
    }
  }

  goCatalog() {
    try {
      this.dialogSvc.back();
    } catch (e) { }
    var _self = this;
    // if (!this.modeDialog) {
    setTimeout(() => {
      _self.routerSvc.navigateByUrl("/catalog");
    }, 100);
    // }

  }

  takeOut() {
    var _self = this;
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
          console.log('takeout afterClosed')
          _self.goCatalog();
        }
      },
      (err: any) => {
        //console.log("err: " + err)
      }
    )
  }
  table() {
    var _self = this;
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
          console.log('table afterClosed')
          await _self.cartSvc.selectOrderType(OrderType.TABLE, false);
          _self.selectedSvc.selectedMerchant=merchant;
          _self.goCatalog();
        }
      },
      (err: any) => {
        //console.log("err: " + err)
      }
    )
  }
  back() {
    //  this.dialogRef.close();
    this.dialogSvc.back();
  }
}
