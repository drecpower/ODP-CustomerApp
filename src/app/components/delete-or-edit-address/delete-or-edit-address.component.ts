import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Address } from 'src/app/api/models/address';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-delete-or-edit-address',
  templateUrl: './delete-or-edit-address.component.html',
  styleUrls: ['./delete-or-edit-address.component.scss']
})
export class DeleteOrEditAddressComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: Address, public dialogSvc: DialogService) { }

  ngOnInit(): void {
  }

  close(action:string) {
    this.dialogSvc.close(action);
  }
}
