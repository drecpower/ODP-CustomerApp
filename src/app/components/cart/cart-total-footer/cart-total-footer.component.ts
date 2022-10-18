import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IconsService } from 'src/app/services/icons.service';
import { CartValuesComponent } from '../cart-values/cart-values.component';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DialogType, DtoDialog } from 'src/app/dto/dto-dialog';

@Component({
  selector: 'app-cart-total-footer',
  templateUrl: './cart-total-footer.component.html',
  styleUrls: ['./cart-total-footer.component.scss']
})
export class CartTotalFooterComponent implements OnInit {

  constructor(public cartSvc:CartService,public icons:IconsService,
    public dialogSvc: DialogService
    ) { }

  ngOnInit(): void {
  }
  open(){
    var dialogRef = this.dialogSvc.open({
        type: DialogType.MAT_BOTTOM_SHEET,
        component: CartValuesComponent,
        //data: data,
        closeOnNavigation: false
      });
    
  }
}
