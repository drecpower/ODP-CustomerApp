import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DtoCart } from 'src/app/dto/dto-cart';
import { IconsService } from 'src/app/services/icons.service';
import { PagePaymentComponent } from 'src/app/pages/page-payment/page-payment.component';
import { DtoCustomerCard } from 'src/app/dto/dto-customer-card';
import { CartService } from 'src/app/services/cart.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DialogType, DtoDialog } from 'src/app/dto/dto-dialog';

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.scss']
})
export class CartPaymentComponent implements OnInit {
  ret: DtoCustomerCard = {};

  constructor(public cartSvc:CartService, public icons: IconsService, public router: Router, public dialogSvc: DialogService
    ) { }

  ngOnInit(): void {
  }

  async changePay() {
    try {
      this.ret = await this.changePayment("Payment Way");
      //console.log(this.ret);
    } catch (error:any) {

    }
  }

  async changePayment(title: string) {
    return new Promise<DtoCustomerCard>(
      (resolve, reject) => { 
        var dialogData: any = {
          title: title,
        }
        var dialogRef = this.dialogSvc.open({
          type: DialogType.MAT_DIALOG,
          component: PagePaymentComponent,
          data: dialogData,
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
}


