import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IconsService } from 'src/app/services/icons.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
@Component({
  selector: 'app-choose-card-type',
  templateUrl: './choose-card-type.component.html',
  styleUrls: ['./choose-card-type.component.scss']
})
export class ChooseCardTypeComponent implements OnInit {

  constructor(public icons: IconsService, public dialogSvc: DialogService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {title: string, cardTypes:any, icon:any }) { }

  ngOnInit(): void {
  }

  close(card: any = null){
    this.dialogSvc.close(card);
  }
}
