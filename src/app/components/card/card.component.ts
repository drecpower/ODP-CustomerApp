import { Component, Inject, Input, OnInit } from '@angular/core';
import { IconsService } from 'src/app/services/icons.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DtoCustomerCard } from 'src/app/dto/dto-customer-card';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor(public icons: IconsService, @Inject(MAT_DIALOG_DATA) public data: { title: string, cardType: { name: string, value: string } }) { 
    this.card.method= data.cardType.value;
  }

  submitted = false;
  card: DtoCustomerCard = new DtoCustomerCard();
  ngOnInit(): void {
  }

  validateNo(e: any): boolean {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }
  detectCardType() {
    var k = undefined;
    if (this.card.number && this.card.number) {
      var re = {
        electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
        elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
        maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
        dankort: /^(5019)\d+$/,
        interpayment: /^(636)\d+$/,
        unionpay: /^(62|88)\d+$/,
        visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        mastercard: /^5[1-5][0-9]{14}$/,
        amex: /^3[47][0-9]{13}$/,
        aura: /^(5078\d{2})(\d{2})(\d{11})$/,
        hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
        diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        jcb: /^(?:2131|1800|35\d{3})\d{11}$/
      }

      for (var key in re) {
        var r = new RegExp((<any>re)[key]);
        if (r.test(this.card.number)) {
          k = key.toUpperCase();
        }
      }
    }
    this.card.brand = k;
  }
  onSubmit() { this.submitted = true; }
}
