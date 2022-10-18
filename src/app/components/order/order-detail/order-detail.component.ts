import { Component, OnInit, Inject } from '@angular/core';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DialogType, DtoDialog } from 'src/app/dto/dto-dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from 'src/app/api/models';
import { IconsService } from 'src/app/services/icons.service';


@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  panelOpenState: boolean = false;
  order: Order | undefined;
  buttonDisabled: boolean = false;
  constructor(
    public dialogSvc: DialogService,
    public icons: IconsService, 
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Order) {
    if (data) {
      this.order = data;
      var a = data.orderItem![0].orderItemOption![0];
      
    }
  }

  ngOnInit(): void {
  }
  navigateTo(str: string) {

  }

  add() {

  }

  back() {
    this.dialogSvc.back();
  }

}
