import { Component, Input, OnInit, HostListener, ViewChild } from '@angular/core';
import { Catalog } from 'src/app/api/models/catalog';
import { IconsService } from 'src/app/services/icons.service';
import { MatTabGroup } from "@angular/material/tabs";
import { DataService } from 'src/app/services/data/data.service';
import { Router } from '@angular/router';
import { Item } from 'src/app/api/models';
import { SelectedService } from 'src/app/services/selected/selected.service';
import { DtoCategory } from 'src/app/dto/dto-category';
import { DtoPizzaSizeFraction } from 'src/app/dto/dto-pizza-size-fraction';
import * as Enumerable from 'linq';

@Component({
  selector: 'app-catalog-content',
  templateUrl: './catalog-content.component.html',
  styleUrls: ['./catalog-content.component.scss']
})
export class CatalogContentComponent implements OnInit {

  @ViewChild("tabgrp")
  tabgrp?: MatTabGroup;

  isScrolling: boolean = false;
  list: DtoCategory[] = [];
  @Input() catalog: Catalog = {};
  constructor(
    public icons: IconsService,
    public dataSvc: DataService,
    public selectedSvc: SelectedService,
    private router: Router
  ) {
    try {
    } catch (error) {

    }
    this.selectedSvc.onSelectCatalog.subscribe(d => {
      this.populateList();
    });
  }

  ngOnInit(): void {
    // this.get();
    this.populateList();
  }
  ready: boolean = false;
  @HostListener("window:scroll", ['$event'])
  scrollMe(event: any) {
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (!this.isScrolling && this.catalog.category) {
      for (let index = 0; index < this.catalog.category!.length; index++) {
        const element = this.catalog.category![index];
        const rect = document.querySelector('.grpindex-' + index)!.getBoundingClientRect();
        if (rect.y > -50 && rect.y < 300) {
          if (this.tabgrp!.selectedIndex != index) {
            this.tabgrp!.selectedIndex = index;
          }
          return;
        }
      }
    }
  }

  go(item: Item) {
    if (this.selectedSvc.isReadyToSell)
      this.router.navigateByUrl('/catalog/' + item.id, { state: item });
  }
  goPizza(pizza: DtoPizzaSizeFraction) {
    if (this.selectedSvc.isReadyToSell)
      this.router.navigateByUrl('/catalog/' + pizza.id, { state: pizza });
  }
  cancelTimeout?: any;
  onSelectTab(tab: any) {
    if (this.cancelTimeout) {
      clearTimeout(this.cancelTimeout);
    }
    this.isScrolling = true;
    setTimeout(() => {
      document.querySelector('.grpindex-' + tab.index)?.scrollIntoView({
        behavior: 'smooth'
      });
      this.cancelTimeout = setTimeout(() => {
        this.isScrolling = false;
      }, 3000);
    }, 10);
  }

  async get() {
    var _self = this;
    for (let i = 0; i < this.list!.length; i++) {
      try {
        var items = await _self.dataSvc.items(_self.selectedSvc.selectedMerchantGroup!.id!, _self.selectedSvc.selectedMerchant?.id!, _self.list![i].category!.catalogId!, _self.list![i].category!.id!);
        if (items) {
          for (let i = 0; i < items.length; i++) {
            items[i].price = items[i].price! - 0; //When it is static the price is returned in string
          }
          _self.list![i].items = items;
          if (_self.list![i].category!.template == "PIZZA") {
            try {
              _self.list![i].pizzas = [];
              // var p =_self.list[i].items![0].productIdNavigation;
              var p = await _self.dataSvc.product(_self.list[i].items![0].productId!);
              if (p) {
                if (p.optionGroupProduct) {
                  for (let j = 0; j < p.optionGroupProduct.length; j++) {
                    p.optionGroupProduct[j].optionGroupIdNavigation = await _self.dataSvc.optionGroup(_self.selectedSvc.selectedMerchantGroup!.id!, _self.selectedSvc.selectedMerchant?.id!, p.optionGroupProduct[j].optionGroupId!)
                    if (p.optionGroupProduct[j].optionGroupIdNavigation?.type == "FLAVOR") {
                      var af = p.optionGroupProduct[j].acceptedFractions?.split(",");
                      for (let index = 0; index < af!.length; index++) {
                        var pizza: DtoPizzaSizeFraction = {};
                        pizza.id = _self.list![i].items![0].id!;
                        pizza.item = _self.list[i].items![0];
                        pizza.product = p;
                        pizza.minimalValue = Enumerable.from(p.optionGroupProduct[j].optionGroupIdNavigation!.option!).orderBy(or => or.price!).select(s => s.price).defaultIfEmpty(undefined).firstOrDefault();
                        pizza.selectedFraction = parseInt(af![index]);
                        pizza.sizeOptionGroupId = p.optionGroupProduct[j].optionGroupId;
                        pizza.name = p.optionGroupProduct[j].optionGroupIdNavigation?.name?.toUpperCase();
                        if (pizza.selectedFraction > 1) {
                          pizza.name += " ( " + pizza.selectedFraction!.toString() + " " + "FLAVOR )";
                        }
                        _self.list![i].pizzas?.push(pizza);
                      }
                    }

                  }
                }
              }

            } catch (error) {

            }
          }
        }
      } catch (error) {

      }
      finally {

      }
      this.ready = true;
    }

  }
  populateList() {
    this.list = [];
    for (let i = 0; i < this.catalog.category!.length; i++) {
      try {
        if (this.catalog.category![i].template == "PIZZA") {
          this.list.push({ category: this.catalog.category![i], pizzas: [] });
        } else {
          this.list.push({ category: this.catalog.category![i], items: [] });
        }
      } catch (error) {

      }
      finally {

      }

    }
    this.get();
  }
}
