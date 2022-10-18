import { Injectable } from '@angular/core';
import * as Enumerable from 'linq';
import { Item } from '../api/models';
import { DtoCategory } from '../dto/dto-category';
import { DtoPizzaSizeFraction } from '../dto/dto-pizza-size-fraction';
import { DataService } from './data/data.service';
import { SelectedService } from './selected/selected.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaFactoryService {

  constructor(private dataSvc: DataService, private selectedSvc: SelectedService) { }

  async create(itemId: string, item?: Item, selectedFraction?: number, sizeOptionGroupId?: string) {
    var _self = this;
    try {
      if(!item){
        item = await _self.dataSvc.item(itemId!, true);
      }
    } catch (error) {
      var a = error;
    }
    var ret: DtoPizzaSizeFraction = {};
    try {
      var p = await _self.dataSvc.product(item!.productId!);
      if (p) {
        if (p.optionGroupProduct) {
          for (let j = 0; j < p.optionGroupProduct.length; j++) {
            p.optionGroupProduct[j].optionGroupIdNavigation = await _self.dataSvc.optionGroup(_self.selectedSvc.selectedMerchantGroup!.id!, _self.selectedSvc.selectedMerchant?.id!, p.optionGroupProduct[j].optionGroupId!)
            if (p.optionGroupProduct[j].optionGroupIdNavigation?.type == "FLAVOR" && p.optionGroupProduct[j].optionGroupId == sizeOptionGroupId) {
              var pizza: DtoPizzaSizeFraction = {};
              pizza.id = item!.id;
              pizza.product = p;
              pizza.item = item;
              pizza.minimalValue = Enumerable.from(p.optionGroupProduct[j].optionGroupIdNavigation!.option!).orderBy(or => or.price!).select(s => s.price).defaultIfEmpty(undefined).firstOrDefault();
              pizza.selectedFraction = selectedFraction;
              pizza.sizeOptionGroupId = sizeOptionGroupId;
              pizza.name = p.optionGroupProduct[j].optionGroupIdNavigation?.name?.toUpperCase();
              if (pizza.selectedFraction && pizza.selectedFraction > 1) {
                pizza.name += " ( " + pizza.selectedFraction!.toString() + " " + "FLAVOR )";
              }
              ret = pizza;
            }

          }
        }
      }
    } catch (error) {

    }
    return ret;
  }
  async createAll(productId: string, itemId: string, item?: Item) {
    var _self = this;
    var list: DtoPizzaSizeFraction[] = [];
    if (!item && itemId) {
      item = await _self.dataSvc.item(itemId);
    }
    var p = await _self.dataSvc.product(productId);
    if (p) {
      if (p.optionGroupProduct) {
        for (let j = 0; j < p.optionGroupProduct.length; j++) {
          p.optionGroupProduct[j].optionGroupIdNavigation = await _self.dataSvc.optionGroup(_self.selectedSvc.selectedMerchantGroup!.id!, _self.selectedSvc.selectedMerchant?.id!, p.optionGroupProduct[j].optionGroupId!)
          if (p.optionGroupProduct[j].optionGroupIdNavigation?.type == "FLAVOR") {
            var af = p.optionGroupProduct[j].acceptedFractions?.split(",");
            for (let index = 0; index < af!.length; index++) {
              var pizza: DtoPizzaSizeFraction = {};
              pizza.id = itemId;
              pizza.product = p;
              pizza.item = item;
              pizza.minimalValue = Enumerable.from(p.optionGroupProduct[j].optionGroupIdNavigation!.option!).orderBy(or => or.price!).select(s => s.price).defaultIfEmpty(undefined).firstOrDefault();
              pizza.selectedFraction = parseInt(af![index]);
              pizza.sizeOptionGroupId = p.optionGroupProduct[j].optionGroupId;
              pizza.name = p.optionGroupProduct[j].optionGroupIdNavigation?.name?.toUpperCase();
              if (pizza.selectedFraction > 1) {
                pizza.name += " ( " + pizza.selectedFraction!.toString() + " " + "FLAVOR )";
              }
              list.push(pizza);
            }
          }

        }
      }
    }
  }
}
