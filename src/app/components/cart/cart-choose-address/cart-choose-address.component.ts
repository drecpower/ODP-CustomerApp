import { Component, Input, OnInit } from '@angular/core';
import * as Enumerable from 'linq';
import { Address, Merchant } from 'src/app/api/models';
import { DialogType, DtoDialog } from 'src/app/dto/dto-dialog';
import { CartService } from 'src/app/services/cart.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { IconsService } from 'src/app/services/icons.service';
import { SelectedService } from 'src/app/services/selected/selected.service';
import { OrderType } from 'src/enum/enums';
import { ChooseAddressComponent } from '../../choose-address/choose-address.component';
import { ChooseMerchantComponent } from '../../choose-merchant/choose-merchant.component';

@Component({
  selector: 'app-cart-choose-address',
  templateUrl: './cart-choose-address.component.html',
  styleUrls: ['./cart-choose-address.component.scss']
})

export class CartChooseAddressComponent implements OnInit {
  @Input() addressObj: Address | undefined;
  @Input() deliveryType: any;
  @Input() change: boolean = false;
  @Input() near: boolean = false;
  multiMerchantTakeout:boolean = false;
  constructor(
    public icons: IconsService,
    public dialogSvc: DialogService,
    private cartSvc: CartService,
    private selectedSvc:SelectedService
  ) { 
    try{
      this.multiMerchantTakeout = Enumerable.from(this.selectedSvc.selectedMerchantGroup!.merchant!).where(x => x.acceptTakeoutOrder == true).count()>1;
    }catch(e){

    }
  }

  ngOnInit(): void {
  }

  changeAddress() {
    if (this.deliveryType == OrderType.DELIVERY) {
      var dialogRef = this.dialogSvc.open({
        type: DialogType.MAT_DIALOG,
        component: ChooseAddressComponent,
        data:  { address: this.addressObj, needValidAddress: true },
        closeOnNavigation: false
      });
      dialogRef.afterClosed().subscribe(
        (d: any) => {
          if (d) {
            // this.userSvc.updateAddress(d, address); 
          }
        },
        (err: any) => {
          //console.log("err: " + err)
        }
      );
    }else if(this.deliveryType == OrderType.TAKEOUT && this.multiMerchantTakeout) {
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
          }
        },
        (err: any) => {
          //console.log("err: " + err)
        }
      )
    }
  }
}
