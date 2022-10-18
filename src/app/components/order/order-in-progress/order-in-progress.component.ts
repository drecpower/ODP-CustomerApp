import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/api/models';
import { DialogType } from 'src/app/dto/dto-dialog';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { IconsService } from 'src/app/services/icons.service';
import { OrderType } from 'src/enum/enums';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

@Component({
  selector: 'app-order-in-progress',
  templateUrl: './order-in-progress.component.html',
  styleUrls: ['./order-in-progress.component.scss']
})
export class OrderInProgressComponent implements OnInit {

order:Order|undefined;
OrderType=OrderType;
  constructor(
    public dialogSvc: DialogService,
    public icons: IconsService, 
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) { 
    if (data) {
      this.order = data;
    }
  }
  
  openOrder(order: Order|undefined) {
    var _self = this;
    var dialogRef = this.dialogSvc.open(
      {
        type: DialogType.MAT_DIALOG,
        component: OrderDetailComponent,
        closeOnNavigation: false,
        data: order
      }
    );
    dialogRef.afterClosed().subscribe(
      async (merchant: Order) => {
        if (merchant) {
          console.log('table afterClosed')

        }
      },
      (err: any) => {
        //console.log("err: " + err)
      }
    )
  }
  ngOnInit(): void {
  }

  back(){
    this.dialogSvc.back();
  }

  chat(){
    
  }

  call(){
    
  }

}
