import { Component, Input, OnInit } from '@angular/core';
import { DtoPizzaSizeFraction } from 'src/app/dto/dto-pizza-size-fraction';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IconsService } from 'src/app/services/icons.service';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data/data.service';
import { SelectedService } from 'src/app/services/selected/selected.service';
import { Item, OptionGroup, OptionGroupProduct, Product } from 'src/app/api/models';
import { DtoItemOptions } from 'src/app/dto/dto-item-options';
import * as Enumerable from 'linq';
import { DtoOptionsSelected } from 'src/app/dto/dto-options-selected';
import { PizzaFactoryService } from 'src/app/services/pizza-factory.service';
import { DtoCartItem } from 'src/app/dto/dto-cart-item';

@Component({
  selector: 'app-catalog-pizza-detail',
  templateUrl: './catalog-pizza-detail.component.html',
  styleUrls: ['./catalog-pizza-detail.component.scss']
})
export class CatalogPizzaDetailComponent implements OnInit {

  private _id: string = "";
  @Input() set id(value: string) {
    this._id = value;
    //this.get();
    //console.log('set item detail');

  }
  get id() {
    return this._id;
  }
  private _index: number | undefined;
  @Input() set index(value: number | undefined) {
    if (value != undefined && value >= 0) {
      this._index = value;
      this.mode = "mini";
    }
  }
  get index() {
    return this._index;
  }

  private _pizza: DtoPizzaSizeFraction = {};
  @Input() set pizza(v: DtoPizzaSizeFraction) {
    var _self = this;
    _self._pizza = v;
    if (!this.pizza.item && !this.pizza.item!.id) {
      _self.getItem();
      _self.pizza.item = _self.item;
    }
    _self.loadListOgp(_self.pizza.selectedFraction!);

    setTimeout(function () {
      try {
        _self.initOptions();
      } catch (error) {
      }
      if (_self._index && _self._index >= 0) {
        _self.getCartItem(_self._index);
      }else{
        _self.optionsReady = true;
      }
    }, 100);
  }

  public get pizza(): DtoPizzaSizeFraction {
    return this._pizza;
  }

  item: Item = {};
  // public get item(): Item {
  //   return this._item;
  // }
  // public set item(v: Item) {
  //   this._item = v;
  //   var _self = this;
  //   // setTimeout(async function () {
  //   //   try {
  //   //     // if (_self.item.productIdNavigation!.optionGroupProduct! && _self.item.productIdNavigation!.optionGroupProduct!.length) {
  //   //     //   _self.initOptions();
  //   //     // }
  //   //   } catch (error) {

  //   //   }
  //   //   // if (_self._index && _self._index >= 0) {
  //   //   //   _self.dtoCartItem = _self.cartSvc.getCartItem(_self.item.categoryId, _self._index);
  //   //   //   _self.pizza = await _self.pizzaFactorySvc.create(_self.item, _self.dtoCartItem?.selectedFraction, _self.dtoCartItem?.sizeOptionGroupId);
  //   //   // }

  //   // }, 100);
  // }
  canContinue: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public location: Location,
    private router: Router,
    public icons: IconsService,
    public cartSvc: CartService,
    public dataSvc: DataService,
    public selectedSvc: SelectedService,
    private pizzaFactorySvc: PizzaFactoryService
  ) { }
  ready: boolean = true;
  quantity: number = 1;
  comments: string = "";
  loading: boolean = false;
  mode: string = "full";
  optionsPrice: number = 0;
  options: DtoItemOptions[] = [];
  optionsReady: boolean = false;
  listOgp: OptionGroupProduct[] = [];
  dtoCartItem?: DtoCartItem;
  ngOnInit(): void {
    var _self = this;
    if (_self.item && _self.item.id) {
      // console.dir(d);
      // _self.item = d;
      this.optionsReady = true;
      this.loading = false;
      this.ready = true;
    }
    else {
      if (_self.pizza.item && _self.pizza.item.id) {
        _self.item = _self.pizza.item;
      } else {
        _self.getItem();
      }
    }
  }

  async getItem() {
    var _self = this;
    try {
      _self.loading = true;
      var it = await _self.dataSvc.item(_self.id, true);
      if (it) {
        _self.item = it;
      }
      if (_self.index == undefined) {
        _self.optionsReady = true;
      }
      _self.loading = false;
      _self.ready = true
    } catch (error) {
      _self.ready = false
    }
    finally {
      _self.loading = false
    }
  }
  loadListOgp(selectedFraction: number) {
    var _self = this;
    _self.listOgp = [];
    var obj = Enumerable.from(this.pizza.product?.optionGroupProduct!)
      .where(x => x.optionGroupId == this.pizza.sizeOptionGroupId).defaultIfEmpty(undefined).firstOrDefault();
    if (obj) {
      obj.max = selectedFraction;
      _self.listOgp.push(obj);
    }
    var lst = Enumerable.from(this.pizza.product?.optionGroupProduct!)
      .where(x => x.optionGroupIdNavigation?.type != "FLAVOR").toArray();
    if (lst) {
      for (let i = 0; i < lst.length; i++) {
        _self.listOgp.push(lst[i])
      }
    }
  }
  initOptions() {
    var _self = this;
    try {
      this.options = [];
      for (let i = 0; i < this.listOgp.length; i++) {
        this.options.push(<DtoItemOptions>{
          optionGroupProductId: this.listOgp[i].id!,
          options: [],
          i: i
        });
      }
      if (this.options.length > 0) {
        this.canContinue = false;
      }
    } catch (error) {
      console.error(error);
    }
  }
  getCartItem(index: number) {
    var _self = this;
    var item = this.cartSvc.getCartItem(this.item.categoryId, index);
    if (item != undefined) {
      this.comments = item.comments;
      this.quantity = item.quantity
      if (item.options && item.options.length) {
        for (let i = 0; i < this.options.length; i++) {
          this.options[i].options = Enumerable.from(item.options).where(x => x.OptionGroupProductId == this.options[i].optionGroupProductId).toArray();
          this.options[i].valid = true;
        }
        this.calcOptionsPrice();
        this.checkCanContinue();
      }
    }
    _self.optionsReady = true;
  }
  add() {
    this.quantity++;
  }
  remove() {
    if (this.index != undefined && this.index >= 0) {
      if (this.quantity > 0) {
        this.quantity--;
      }
    } else {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
  }
  addItem() {
    //TODO remove empty options
    if (this.canContinue) {
      var optionsPrice = 0;
      var options = this.getOptions();
      if (options.length > 0)
        optionsPrice = this.optionsPrice;
      if (this.index != undefined && this.index >= 0) {
        this.cartSvc.update(this.index, this.item, this.quantity, this.comments, options, this.optionsPrice, "PIZZA", this.pizza.selectedFraction, this.pizza.sizeOptionGroupId, "PIZZA", this.pizza.name);
      }
      else {
        this.cartSvc.add(this.pizza.item!, this.quantity, this.comments, options, this.optionsPrice, "PIZZA", this.pizza.selectedFraction, this.pizza.sizeOptionGroupId, "PIZZA", this.pizza.name);
      }
      this.close();
    }
  }

  close() {
    if (window.history.length <= 2) {  // Check if the browser has previous browsing history
      this.router.navigateByUrl("/catalog/");
    } else {
      this.location.back();
    }
  }

  getOptions() {
    var options: DtoOptionsSelected[] = [];
    try {
      for (let i = 0; i < this.options.length; i++) {
        if (this.options[i].options && this.options[i].options!.length > 0) {
          options = options.concat(this.options![i].options!);
        }
      }
    } catch (error) { }
    return options;
  }
  updatedOption(event: DtoItemOptions) {
    var op = Enumerable.from(this.options).where(x => x.optionGroupProductId == event.optionGroupProductId).firstOrDefault();
    var expensivePrice = undefined;
    expensivePrice = 0;
    if (op != null) {
      var optionGroupProductFlavorIds = Enumerable.from(this.listOgp).where(x => x.optionGroupIdNavigation?.type == "FLAVOR").select(x => x.id).toArray();
      if (optionGroupProductFlavorIds.indexOf(event.optionGroupProductId!) >= 0) {
        expensivePrice = Enumerable.from(event.options!).select(s => s.Price!).orderByDescending(o => o).defaultIfEmpty(0).firstOrDefault();
        if (expensivePrice && expensivePrice > 0) {
          expensivePrice = expensivePrice / this.pizza.selectedFraction!;
        }
        for (let i = 0; i < event.options!.length; i++) {
          event.options ![i].Price = expensivePrice;
        }
      }
      op.options = event.options;
      op.valid = event.valid;
      this.calcOptionsPrice();
      this.checkCanContinue();
    }
  }
  calcOptionsPrice() {
    this.optionsPrice = Enumerable.from(this.options)
      .select(s1 => Enumerable.from(s1.options!).sum(s2 => (s2.Price! * s2.Quantity!)))
      .sum();
  }
  checkCanContinue() {
    if (Enumerable.from(this.options).where(x => x.valid != true).any()) {
      this.canContinue = false;
    } else {
      this.canContinue = true;
    }
  }
}
