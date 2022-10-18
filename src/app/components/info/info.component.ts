import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DialogService } from 'src/app/services/dialog/dialog.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data:{title: "", description: "", buttonText:""},public dialogSvc:DialogService) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogSvc.back();
  }

}
