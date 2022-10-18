import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DtoCustomerCard } from 'src/app/dto/dto-customer-card';
import { IconsService } from 'src/app/services/icons.service';
import { Location } from '@angular/common';
import { DtoCart } from 'src/app/dto/dto-cart';
import { CartService } from 'src/app/services/cart.service';
import { DtoCard } from 'src/app/api/models';
import { CardComponent } from '../../card/card.component';
import { ChooseCardTypeComponent } from '../../choose-card-type/choose-card-type.component';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { UserService } from 'src/app/services/user.service';
import { CustomerCardService } from 'src/app/services/customer-card.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DialogType, DtoDialog } from 'src/app/dto/dto-dialog';
@Component({
  selector: 'app-choose-payment-by-app',
  templateUrl: './choose-payment-by-app.component.html',
  styleUrls: ['./choose-payment-by-app.component.scss'],
})
export class ChoosePaymentByAppComponent implements OnInit {
  @Input() cart?: DtoCart;
  @Input() data: DtoCustomerCard = {};
  cardTypes: any[] = [
    { name: "Credit", value: "CREDIT", icon: "credit_card" },
    { name: "Debit", value: "DEBIT", icon: "credit_card" },
    { name: "Meal Ticket", value: "MEAL_TICKET", icon: "restaurant" },
    { name: "Food Ticket", value: "FOOD_TICKET", icon: "local_grocery_store" },
    { name: "Other Vouchers", value: "OTHER_VOUCHERS", icon: "card_giftcard" }
  ];

  constructor(public customerCardSvc: CustomerCardService, public cartSvc: CartService, public paymentSvc: PaymentService, public icons: IconsService, public location: Location, public router: Router, public dialogSvc: DialogService) { }

  ngOnInit(): void {

  }

  selectPayment(payment: DtoCustomerCard) {
    try {
      this.customerCardSvc.cards?.push(payment);
      this.cartSvc.selectPayment(payment);
    } catch (error) {

    }
  }
  selectCustomerCard(c: DtoCustomerCard) {
    if (this.paymentSvc.onlineMethod) {
      this.cartSvc.selectCustomerCard(c, this.paymentSvc.onlineMethod);
    }
  }

  async addNewCard() {
    try {
      var selectedCardType = await this.chooseCardType("Choose cart type");
      if (selectedCardType) {
        try {
          var card = await this.addCard("Add new card", selectedCardType);
          if(card){
            this.selectPayment(card);
          }
        } catch (error: any) {

        }
      }
    } catch (error: any) {

    }
  }

  async chooseCardType(title: string) {
    return new Promise<{ name: string, value: string }|undefined>(
      (resolve, reject) => {
        var dialogData: any = {
          title: title,
          cardTypes: this.cardTypes
        }
        var bottomSheet = this.dialogSvc.open({
          type: DialogType.MAT_BOTTOM_SHEET,
          component: ChooseCardTypeComponent,
          data: dialogData,
          closeOnNavigation: false
        });
        bottomSheet.afterDismissed().subscribe(
          (ok: any) => {
            bottomSheet.dismiss();
            resolve(ok);
          },
          (err: any) => {
            resolve(undefined);
          }
        )
      }
    )
  }

  async addCard(title: string, cardType: { name: string, value: string }) {
    return new Promise<DtoCustomerCard>(
      (resolve, reject) => {
        var dialogData: any = {
          title: title,
          cardType: cardType
        }
        var dialogRef = this.dialogSvc.open({
          type: DialogType.MAT_DIALOG,
          component: CardComponent,
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
