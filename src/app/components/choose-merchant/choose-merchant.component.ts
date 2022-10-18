import { Component, HostListener, OnInit } from '@angular/core';
import { Merchant } from 'src/app/api/models';
import { DataService } from 'src/app/services/data/data.service';
import { IconsService } from 'src/app/services/icons.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { SelectedService } from 'src/app/services/selected/selected.service';
import * as Enumerable from 'linq';
import { CartService } from 'src/app/services/cart.service';
import { OrderType } from 'src/enum/enums';


@Component({
  selector: 'app-choose-merchant',
  templateUrl: './choose-merchant.component.html',
  styleUrls: ['./choose-merchant.component.scss']
})
export class ChooseMerchantComponent implements OnInit {

  selectedMerchant: Merchant | undefined
  lstMerchant: Merchant[] | undefined;
  constructor(public selectedSvc: SelectedService, public cartSvc: CartService,public icons: IconsService,
    public dialogSvc:DialogService) {
  }
  ngOnInit(): void {
    // const modalState = {
    //   modal: true,
    //   desc: 'ChooseMerchantComponent'
    // };
    // (<any>history).pushState(modalState, "Choose Merchant");
    if (this.selectedSvc.selectedMerchantGroup && this.selectedSvc.selectedMerchantGroup.merchant) {
      this.lstMerchant = Enumerable.from(this.selectedSvc.selectedMerchantGroup.merchant).where(x => x.acceptTakeoutOrder == true).toArray();
      this.selectedMerchant = this.lstMerchant[0];
    }
  }

  ngOnDestroy() {
    // if (window.history.state.modal) {
    //   this.dialogSvc.ignoreBack++;
    //   history.back();
    //   console.log('choose-merchant back');

    // }
  }
   selectMerchant(merchant: Merchant) {
    this.selectedMerchant = merchant;

  }
  async confirm(){
    // this.dialogRef.close(this.selectedMerchant);
    var merchant = undefined;
    if(this.selectedMerchant){

      await this.cartSvc.selectOrderType(OrderType.TAKEOUT, false);
      this.selectedSvc.selectedMerchant=this.selectedMerchant;
      merchant = this.selectedMerchant;
    }
    this.dialogSvc.close(merchant);

  }
  back(){
    // this.dialogRef.close(this.selectedMerchant);
    this.dialogSvc.back();
  }
}