import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { OrderType } from 'src/enum/enums';
import { SelectedService } from 'src/app/services/selected/selected.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DialogType, DtoDialog } from 'src/app/dto/dto-dialog';
import { Address } from 'src/app/api/models/address';
import { ChooseAddressComponent } from '../choose-address/choose-address.component';
import { IconsService } from 'src/app/services/icons.service';
import { ChooseMerchantComponent } from '../choose-merchant/choose-merchant.component';
import { Merchant } from 'src/app/api/models/merchant';
import { InfoComponent } from '../info/info.component';


@Component({
  selector: 'app-address-header',
  templateUrl: './address-header.component.html',
  styleUrls: ['./address-header.component.scss']
})
export class AddressHeaderComponent implements OnInit {

  constructor(public cartSvc: CartService, private location: Location, public selectedSvc: SelectedService, public dialogSvc: DialogService, public icons: IconsService) { }

  ngOnInit(): void {
  }

  back() {
    this.location.back();
  }

  chooseAddress() {
    var address: Address | undefined;
    if (this.cartSvc.address) {
      address = this.cartSvc.address;
    } else {
      address = this.cartSvc.gpsAddress;
    }
    var dialog: DtoDialog = {
      type: DialogType.MAT_DIALOG,
      component: ChooseAddressComponent,
      data: { address: address, needValidAddress: false },
      closeOnNavigation: false
    };
    var dialogRef = this.dialogSvc.open(dialog);
    dialogRef.afterClosed().subscribe(
      (d: any) => {
        if (d) {
        }
      },
      (err: any) => {
        //console.log("err: " + err)
      }
    );

  }

  chooseMerchant() {
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
          // _self.goCatalog();
        }
      },
      (err: any) => {
        //console.log("err: " + err)
      }
    )
  }
}
