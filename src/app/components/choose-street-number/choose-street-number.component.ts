import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Address } from 'src/app/api/models/address';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-choose-street-number',
  templateUrl: './choose-street-number.component.html',
  styleUrls: ['./choose-street-number.component.scss']
})
export class ChooseStreetNumberComponent implements OnInit {
  number: number | undefined = undefined;
  @ViewChild('inputNumber') input: ElementRef | undefined;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: Address, public dialogSvc: DialogService) { }

  ngOnInit(): void {
    var _self = this;
    setTimeout(() => {
      _self.input!.nativeElement.focus();
    }, 1000);
  }

  close(withoutNumber?: boolean) {
    if (withoutNumber == true) {
      this.dialogSvc.close("WITHOUT_STREET_NUMBER");
    } else {
      this.dialogSvc.close(this.number);
    }

  }
}
