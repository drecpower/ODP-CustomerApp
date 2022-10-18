import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Address } from 'src/app/api/models';
import { CartService } from 'src/app/services/cart.service';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { IconsService } from 'src/app/services/icons.service';
import { FavoriteType, OrderType } from 'src/enum/enums';

@Component({
  selector: 'app-address-editor',
  templateUrl: './address-editor.component.html',
  styleUrls: ['./address-editor.component.scss']
})
export class AddressEditorComponent implements OnInit {

  number: string | undefined;
  complement: string | undefined;
  reference: string | undefined;
  favoriteType: string | undefined;

  constructor(public dialogSvc: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: Address, public icons: IconsService) { }

  ngOnInit(): void {
    this.number = this.data.streetNumber;
    this.complement = this.data.complement;
    this.reference = this.data.reference;
    this.favoriteType = this.data.favoriteType;
    console.log('address')
    console.log(this.data.favoriteType)
  }

  setFavoriteType(type: FavoriteType) {
    this.favoriteType = type;
  }

  selectedFavoriteType(type: number) {
    if (type == 1) {
      if (this.favoriteType != FavoriteType.HOME) {
        this.favoriteType = FavoriteType.HOME
      } else {
        this.favoriteType = undefined;
      }
    } else {
      if (this.favoriteType != FavoriteType.WORK) {
        this.favoriteType = FavoriteType.WORK
      } else {
        this.favoriteType = undefined;
      }
    }
  }

  checkFavoriteWork(type: string | undefined) {
    var ret = false;
    if (type == FavoriteType.WORK) {
      ret = true;
    }
    return ret;
  }

  checkFavoriteHome(type: string | undefined) {
    var ret = false;
    if (type == FavoriteType.HOME) {
      ret = true;
    }
    return ret;
  }


  back() {
    this.dialogSvc.back();
  }
  save() {
    this.data.streetNumber = this.number
    this.data.complement = this.complement
    this.data.reference = this.reference
    this.data.favoriteType = this.favoriteType
    this.dialogSvc.close(this.data);
  }
}
