import { Component, OnInit } from '@angular/core';
import { Merchant } from 'src/app/api/models';
import { DialogType } from 'src/app/dto/dto-dialog';
import { AppshellService } from 'src/app/services/appshell.service';
import { CartService } from 'src/app/services/cart.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { ManifestService } from 'src/app/services/manifest.service';
import { SelectedService } from 'src/app/services/selected/selected.service';
import { OrderType } from 'src/enum/enums';
import { ChooseDeliveryTimeWindowComponent } from '../../choose-delivery-time-window/choose-delivery-time-window.component';
import { InfoComponent } from '../../info/info.component';
import { SwitchOrderTypeComponent } from '../../switch-order-type/switch-order-type.component';

@Component({
  selector: 'app-catalog-header',
  templateUrl: './catalog-header.component.html',
  styleUrls: ['./catalog-header.component.scss']
})

export class CatalogHeaderComponent implements OnInit {
  name: string =""; 
  OrderType=OrderType;
  constructor(public selectedSvc:SelectedService, 
    public appshellSvc:AppshellService,
    public cartSvc:CartService,
    public dialogSvc:DialogService,
    public mani: ManifestService) { 
    
  }

  ngOnInit(): void {
    this.name = this.selectedSvc.selectedMerchantGroup?.name!;
    //this.mani.
    console.log(this.selectedSvc.selectedMerchantGroup);
    console.log("--------------------");
    console.log(this.selectedSvc.selectedMerchant);
  }

  openSwitchOrderType(){
    // var bottomSheet = this.bottomSheet.open(SwitchOrderTypeComponent, {
    //   data: data
    // });
    // bottomSheet.afterDismissed().pipe().subscribe(
    //   (ok) => {
    //     if (ok) {
    //       //console.log(ok)
    //     }
    //   },
    //   (err) => {
    //   }
    // )
  }

  changeOrderType() {
    var _self = this;
    var bottomSheet = this.dialogSvc.open(
      {
        type: DialogType.MAT_BOTTOM_SHEET,
        component: SwitchOrderTypeComponent,
        closeOnNavigation: false
      }
    );
    bottomSheet.afterDismissed().pipe().subscribe(
      (ok: any) => {
        if (ok) {
        }
      },
      (err: any) => {
      }
    )
  }

  changeDeliveryTimeWindow() {
    if (false) {
      var _self = this;
      var dialogRef = this.dialogSvc.open(
        {
          type: DialogType.MAT_DIALOG,
          component: ChooseDeliveryTimeWindowComponent,
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
    } else {
      var _self = this;
      var bottomSheet = this.dialogSvc.open(
        {
          type: DialogType.MAT_BOTTOM_SHEET,
          component: InfoComponent,
          data: {title: "Scheduling Unavailable", description: "This option is currently not available at the merchant.", buttonText:"Ok, I got it"},
          closeOnNavigation: false
        }
      );
      bottomSheet.afterDismissed().pipe().subscribe(
        (ok: any) => {
          if (ok) {
          }
        },
        (err: any) => {
        }
      )
    }
  }

  capitalizeFirstLetter(type: string | undefined) {
    var ret = "";
    if (type) {
      ret = type.toLowerCase().charAt(0).toUpperCase() + type.toLowerCase().slice(1);
    }
    return ret;
  }

  close(){

  }
  close2(){
    // this.dialogSvc.dialog.getDialogById("").clo
  }
}
