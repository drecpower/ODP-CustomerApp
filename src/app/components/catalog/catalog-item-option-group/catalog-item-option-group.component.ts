import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import * as Enumerable from 'linq';
import { DtoItemOptions } from 'src/app/dto/dto-item-options';
import { DtoOptionsSelected } from 'src/app/dto/dto-options-selected';

import { Option } from 'src/app/api/models/option';
import { OptionGroupProduct } from 'src/app/api/models/option-group-product';
import { IconsService } from 'src/app/services/icons.service';
import { DataService } from 'src/app/services/data/data.service';
import { SelectedService } from 'src/app/services/selected/selected.service';

@Component({
  selector: 'app-catalog-item-option-group',
  templateUrl: './catalog-item-option-group.component.html',
  styleUrls: ['./catalog-item-option-group.component.scss']
})
export class CatalogItemOptionGroupComponent implements OnInit {
  private _ogp: OptionGroupProduct | undefined;
  @Input() set ogp(value: OptionGroupProduct | undefined) {
    this._ogp = value;
    try {
      this.matRadioGroupName += "_" + value?.id?.toString();
    } catch (error) {

    }
    this.get(value);
  }
  get ogp() {
    return this._ogp;
  }
  private _selectedOptions: DtoOptionsSelected[] = [];
  @Input() set selectedOptions(value: DtoOptionsSelected[] | undefined) {
    if (value != undefined && this.selectedOptionsLoaded == false) {
      this._selectedOptions = value;
      this.selectedOptionsLoaded = true;
    }
  }
  get selectedOptions(): DtoOptionsSelected[] {
    return this._selectedOptions;
  }
  selectedOptionsLoaded: boolean = false;
  private _singleOptionSelected: Option | undefined;
  set singleOptionSelected(value: Option | undefined) {
    var options: DtoOptionsSelected[] = [];
    if (value != undefined) {
      this._singleOptionSelected = value;
      options = [{
        OptionId: value.id,
        Name: value?.productIdNavigation?.name,
        Price: value?.price,
        Quantity: 1,
        OptionGroupProductId: this.ogp?.id
      }];
    } else {
      options = [];
    }
    this.updatedOption.emit(<DtoItemOptions>{ options: options, optionGroupProductId: this.ogp?.id, valid: 1 >= (this.ogp!.min!) });
  }
  get singleOptionSelected() {
    return this._singleOptionSelected;
  }
  lstQtd: number[] = [];
  qtdTotal: number = 0;
  @Output() updatedOption = new EventEmitter();
  loading: boolean = false;
  matRadioGroupName: string = "";

  constructor(private dataSvc: DataService, public icons: IconsService, private selectedSvc: SelectedService) {
    try {

      this.matRadioGroupName = Math.floor(Math.random() * 10000).toString();
    } catch (error) {

    }
  }

  ngOnInit(): void {
  }
  async get(ogp: OptionGroupProduct | undefined) {
    var _self = this;
    try {
      _self.loading = true;
      _self.ogp!.optionGroupIdNavigation = await _self.dataSvc.optionGroup(_self.selectedSvc.selectedMerchantGroup!.id!, _self.selectedSvc.selectedMerchant!.id!, ogp!.optionGroupId!);
      try {
        for (let i = 0; i < _self.ogp!.optionGroupIdNavigation!.option!.length; i++) {
          try {
            _self.ogp!.optionGroupIdNavigation!.option![i].productIdNavigation = await _self.dataSvc.product(_self.ogp!.optionGroupIdNavigation!.option![i].productId!);
            var value = Enumerable.from(_self._selectedOptions).where(x => x.OptionId == _self.ogp!.optionGroupIdNavigation!.option![i].id).defaultIfEmpty(undefined).firstOrDefault();
            if (value != undefined) {
              if (_self.ogp!.max == 1) {
                _self._singleOptionSelected = _self.ogp!.optionGroupIdNavigation!.option![i];
              } else {
                _self.lstQtd[i] = value.Quantity!;
              }
              _self.qtdTotal += value.Quantity!;
            } else {
              _self.lstQtd[i] = 0;
            }
          } catch (error) { }
        }
      } catch (error) { }
    } catch (error) { }
    finally {
      _self.loading = false;
    }
  }
  toggleRadio(op: Option) {
    if (this.singleOptionSelected == op) {
      this.singleOptionSelected = undefined;
      this.updatedOption.emit(<DtoItemOptions>{ options: [], optionGroupProductId: this.ogp?.id, valid: ((this.ogp!.min!) == 1 ? false : true) });
    } else {
      this.singleOptionSelected = op;
      this.updatedOption.emit(<DtoItemOptions>{
        options: [{
          OptionId: op.id,
          Name: op.productIdNavigation?.name,
          Price: op.price,
          Type: this.ogp!.optionGroupIdNavigation?.type,
          Quantity: 1,
          OptionGroupProductId: this.ogp?.id
        }], optionGroupProductId: this.ogp?.id, valid: true
      });
    }
  }
  add(i: number) {
    if (this.qtdTotal < this.ogp!.max! || this.ogp!.max == 0) {
      this.lstQtd[i]++;
      this.qtdTotal++;
      this.multipleEmit();
    }
  }
  remove(i: number) {
    if (this.lstQtd[i] > 0) {
      this.lstQtd[i]--;
      this.qtdTotal--;
      this.multipleEmit();
    }
  }
  multipleEmit() {
    var options: DtoOptionsSelected[] = [];
    for (let i = 0; i < this.ogp!.optionGroupIdNavigation!.option!.length; i++) {
      const op = this.ogp!.optionGroupIdNavigation!.option![i];
      if (this.lstQtd[i] > 0) {
        options.push({
          OptionId: op.id,
          Name: op.productIdNavigation?.name,
          Type: this.ogp!.optionGroupIdNavigation?.type,
          Price: op.price,
          Quantity: this.lstQtd[i],
          OptionGroupProductId: this.ogp?.id,
        });
      }// else if (this.ogp!.optionGroupIdNavigation?.type == 'FLAVOR') {
      //   options.push({
      //     OptionId: op.id,
      //     Name: op.productIdNavigation?.name,
      //     Type: this.ogp!.optionGroupIdNavigation?.type,
      //     Price: op.price,
      //     Quantity: 1,
      //     OptionGroupProductId: this.ogp?.id,
      //   });
      // }
    }
    this.updatedOption.emit(<DtoItemOptions>{ options: options, optionGroupProductId: this.ogp?.id, valid: this.qtdTotal >= this.ogp!.min! });
  }
}
