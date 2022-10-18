import { Component, OnInit, Optional } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-page-payment',
  templateUrl: './page-payment.component.html',
  styleUrls: ['./page-payment.component.scss']
})
export class PagePaymentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string} ) { }

  ngOnInit(): void {
  }

}
