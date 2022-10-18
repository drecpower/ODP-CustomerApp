import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/api/models/item';
import { CartService } from 'src/app/services/cart.service';
import { IconsService } from 'src/app/services/icons.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { INPUT_MODALITY_DETECTOR_OPTIONS } from '@angular/cdk/a11y';
import { DtoOptionsSelected } from 'src/app/dto/dto-options-selected';
import { DtoItemOptions } from 'src/app/dto/dto-item-options';
import * as Enumerable from 'linq';
import { SelectedService } from 'src/app/services/selected/selected.service';
import { ManifestService } from 'src/app/services/manifest.service';
@Component({
  selector: 'app-catalog-item-detail',
  templateUrl: './catalog-item-detail.component.html',
  styleUrls: ['./catalog-item-detail.component.scss']
})
export class CatalogItemDetailComponent implements OnInit {

  private _id: string = "";
  @Input() set id(value: string) {
    this._id = value;
    // this.get();
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

  @Input() set currentItem(v : Item) {
    this.item = v;
  }

  private _item: Item|undefined = undefined;
  public get item(): Item {
    return <any>this._item;
  }
  public set item(v: Item) {
    this._item = v;
    var _self = this;
    setTimeout(function () {
      try {
        if (_self.item!.productIdNavigation!.optionGroupProduct! && _self.item!.productIdNavigation!.optionGroupProduct!.length) {
          _self.initOptions();
        }
      } catch (error) {

      }
      if (_self._index && _self._index >= 0) {
        _self.getCartItem(_self._index);
      }

    }, 100);
  }
  canContinue: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public location: Location,
    private router: Router,
    public icons: IconsService,
    public cartSvc: CartService,
    public dataSvc: DataService,
    public selectedSvc:SelectedService,
    public manifestSvc:ManifestService
  ) { }
  ready: boolean = false;
  quantity: number = 1;
  comments: string = "";
  loading: boolean = false;
  mode: string = "full";
  optionsPrice: number = 0;
  options: DtoItemOptions[] = [];
  optionsReady: boolean = false;
  ngOnInit(): void {
    var _self = this;
    // var d: Item = <Item>this.location.getState();
    //console.log('init item detail');

    if (_self.item && _self.item.id) {
      // console.dir(d);
      // _self.item = d;
      this.optionsReady = true;
      this.loading = false;
      this.ready = true;
    }
    else {
      _self.get();
    }
  }

  async get() {
    var _self=this;
    try {
      this.loading = true;
      if (_self.id){
        var it= await this.dataSvc.item(this.id,true);
        if(it){
          this.item = it;
        }
      }
      
      if (this.index == undefined) {
        this.optionsReady = true;
      }
      this.loading = false;
      this.ready = true
    } catch (error) {
      this.ready = false
    }
    finally {
      this.loading = false
    }
  }
  initOptions() {
    var _self = this;
    try {
      this.options = [];
      for (let i = 0; i < this.item.productIdNavigation!.optionGroupProduct!.length; i++) {
        this.options.push(<DtoItemOptions>{
          optionGroupProductId: _self.item.productIdNavigation!.optionGroupProduct![i].id!,
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
    this.optionsReady = true;
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
        this.cartSvc.update(this.index, this.item, this.quantity, this.comments, options, this.optionsPrice,undefined,undefined,undefined,undefined,this.item.productIdNavigation?.name);
      }
      else {
        this.cartSvc.add(this.item, this.quantity, this.comments, options, this.optionsPrice,undefined,undefined,undefined,undefined,this.item.productIdNavigation?.name);
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
    if (op != null) {
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
