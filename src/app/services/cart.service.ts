import { Injectable } from '@angular/core';
import { DtoCart } from '../dto/dto-cart';
import { DtoCartItem } from '../dto/dto-cart-item';
import { Item } from '../api/models/item';
import * as Enumerable from 'linq';
import { DtoDeliveryTimeWindow } from '../dto/dto-delivery-time-window';
import { DtoItemOptions } from '../dto/dto-item-options';
import { DtoOptionsSelected } from '../dto/dto-options-selected';
import { DtoCustomerCard } from '../dto/dto-customer-card';
import { OrderService } from './order/order.service';
import { Coupon } from '../api/models/coupon';
import { Address, Catalog, Category, Merchant, PaymentMethod } from '../api/models';
import { DtoCartItemCategory } from '../dto/dto-categorized-cart-items';
import { DeliveryAddressService } from './delivery-address/delivery-address.service';
import { SelectedService } from './selected/selected.service';
import { AppOperation, OrderType, Status } from '../../enum/enums';
import { Observable, Subject } from 'rxjs';
import { DialogService } from './dialog/dialog.service';
import { ChooseMerchantComponent } from '../components/choose-merchant/choose-merchant.component';
import { DialogType } from '../dto/dto-dialog';
import { Router } from '@angular/router';
import { OrderStorageService } from './order-storage/order-storage.service';
import { DataService } from './data/data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: DtoCart = new DtoCart();

  isReady: boolean = false;
  private _isReady = new Subject<boolean>();
  public isReadyAsync: Observable<boolean> = this._isReady.asObservable();
  public sendingOrder: boolean = false;

  constructor(private orderSvc: OrderService, private deliveryAddressSvc: DeliveryAddressService, private selectedSvc: SelectedService, private dialogSvc: DialogService, private router: Router, public orderStorageSvc: OrderStorageService, public dataSvc: DataService) {
    var _self = this;
    setTimeout(() => {
      _self._isReady.next(false);
    }, 1);
    selectedSvc.onSelectMerchantGroup.subscribe(
      (d) => {
        _self.read();
      }
    );
  }
  async add(item: Item, quantity: number, comments: string, options?: DtoOptionsSelected[], optionsPrice?: number, categoryTemplate?: string, selectedFraction?: number, optionGroupId?: string, type?: string, name?: string) {
    //TODO get correct name
    //console.log('add');
    var categoryName: string = "";
    var brandId = this.selectedSvc.selectedMerchantGroup!.id!;
    var catalogs: Catalog[] = this.selectedSvc.selectedMerchant?.catalog!;
    for (let i = 0; i < catalogs.length; i++) {
      var cat: Category[] = catalogs[i].category!;
      for (let j = 0; j < cat.length; j++) {
        if (cat[j].id == item.categoryId) {
          categoryName = cat[j].name!;
          break;
        }
      }
    }
    let category = Enumerable.from(this.cart.categorizedItems)
      .where(p => p.categoryId == item.categoryId)
      .defaultIfEmpty(undefined)
      .firstOrDefault();
    var dci = new DtoCartItem();
    dci.comments = comments;
    dci.item = item;
    dci.quantity = quantity;
    dci.options = options;
    if (type){
      dci.type = type;
    }
    if (name){
      console.log("DCI NAME: " +name)
      dci.name = name;
    }
    dci.fractions = 0;
    dci.fractions = selectedFraction;
    dci.sizeOptionGroupId = optionGroupId;
    dci.optionsPrice = optionsPrice;

    if (category == undefined) {

      category = {
        categoryId: item.categoryId!,
        categoryName: categoryName,
        template: categoryTemplate,
        items: [(dci)]
      };
      this.cart.categorizedItems.push(category);
    } else {
      let cartItem = Enumerable.from(category.items)
        .where(p => p.item.id == item.id)
        .defaultIfEmpty(undefined)
        .firstOrDefault();
      if (cartItem && cartItem.comments == comments && cartItem.options == options && optionsPrice == cartItem.optionsPrice) {
        cartItem.quantity += quantity;
      } else {
        category.items.push(dci);
      }
    }
    this.persist();
  }

  remove(item: Item, quantity?: number) {
    let category = Enumerable.from(this.cart.categorizedItems)
      .where(p => p.categoryId == item.categoryId)
      .defaultIfEmpty(undefined)
      .firstOrDefault();
    if (category != undefined) {
      let categoryIndex = this.cart.categorizedItems.indexOf(category);
      let cartItem = Enumerable.from(category.items)
        .where(p => p.item == item)
        .defaultIfEmpty(undefined)
        .firstOrDefault();
      if (cartItem) {
        let idx = category.items.indexOf(cartItem);
        if (quantity == undefined) quantity = 1;
        if (cartItem.quantity >= quantity) {
          cartItem.quantity -= quantity;
        } else {
          category.items.splice(idx, 1);
          if (category.items.length == 0) {
            this.cart.categorizedItems.splice(categoryIndex, 1);
          }
        }
      }
    }
  }
  update(index: number, item: Item, quantity: number, comments: string, options?: DtoOptionsSelected[], optionsPrice?: number, categoryTemplate?: string, selectedFraction?: number, optionGroupId?: string, type?: string, name?: string) {
    //console.log('update');
    let category = Enumerable.from(this.cart.categorizedItems)
      .where(p => p.categoryId == item.categoryId)
      .defaultIfEmpty(undefined)
      .firstOrDefault();
    if (category != undefined) {
      let categoryIndex = this.cart.categorizedItems.indexOf(category);
      if (quantity > 0) {
        var cartItem = new DtoCartItem();
        cartItem.comments = comments;
        cartItem.item = item;
        cartItem.quantity = quantity;
        cartItem.options = options;
        if (type){
          cartItem.type = type;
        }
        if (name){
          cartItem.name = name;
        }
        cartItem.fractions = selectedFraction;
        cartItem.sizeOptionGroupId = optionGroupId;
        cartItem.optionsPrice = optionsPrice
        category.items[index] = cartItem;
        category.template = categoryTemplate;
      } else {
        category.items.splice(index, 1);
        if (category.items.length == 0) {
          this.cart.categorizedItems.splice(categoryIndex, 1);
        }
      }
    }
    this.persist();
  }
  getCartItem(categoryId: string | undefined, index: number) {
    var item = undefined;
    try {
      var cat = Enumerable.from(this.cart.categorizedItems).where(x => x.categoryId == categoryId)
        .defaultIfEmpty(undefined).firstOrDefault();
      if (cat != undefined) {
        item = cat.items[index];
      }
    } catch (error) { }
    return item;
  }
  selectDeliveryTimeWindow(dtw: DtoDeliveryTimeWindow, deliveryType: OrderType | undefined) {
    //order.cs
    //order type delivery/takeout
    //order timing  immediate/scheduled
    this.cart.deliveryFee = dtw.value;
    this.selectOrderType(deliveryType);
    this.cart.deliveryTimeWindow = dtw;
    if (dtw.nowTimeStart != undefined)
      this.cart.orderTiming = "IMMEDIATE";
    else
      this.cart.orderTiming = "SCHEDULE";
    this.persist();
  }

  async selectOrderType(orderType: OrderType | undefined, loadCatalog: boolean = true) {
    var _self = this;
    return new Promise<OrderType | undefined>(
      async (resolve, reject) => {
        if (_self.validateToChangeCatalog(undefined, orderType)) {
          if (_self.cart.orderType != orderType && orderType == OrderType.TAKEOUT) {
            // await _self.dialogSvc.openWithPromisse({
            //   closeOnNavigation: false,
            //   component: ChooseMerchantComponent,
            //   type: DialogType.MAT_DIALOG
            // });
            _self.cart.deliveryFee = 0;
          }
          _self.cart.orderType = orderType;
          await _self.selectedSvc.setOrderType(orderType, loadCatalog);
          _self.persist();
          resolve(_self.cart.orderType);//_self.cart.orderType
        }
      }
    );

  }

  selectCoupon(coupon: Coupon | undefined) {
    this.cart.coupon = coupon;
    if (coupon) {
      if (coupon.value && coupon.value > 0) {
        this.cart.discount = coupon.value;
      } else if (coupon.percentage && coupon.percentage > 0) {
        this.cart.discount = this.cart.total * (coupon.percentage / 100);
      }
    } else {
      this.cart.discount = 0;
      this.cart.coupon = undefined;
    }
  }

  selectPayment(payment: PaymentMethod) {
    this.cart.customerCard = undefined;
    this.cart.payment = payment;
    this.persist();
  }

  selectCustomerCard(customerCard: DtoCustomerCard, payment: PaymentMethod) {
    this.cart.customerCard = customerCard;
    this.cart.payment = payment;
    this.cart.payment!.cardBrand = this.cart.customerCard?.brand;
    this.persist();
  }

  selectWhereToLeave(whereToLeave: string) {
    this.cart.whereToLeave = whereToLeave;
    this.persist();
  }
  async selectGpsAddress(gpsAddress: Address) {
    var result = this.deliveryAddressSvc.checkAddress(gpsAddress);
    if (result.deliverable && result.deliveryFee) {
      this.cart.address = undefined;
      this.cart.gpsAddress = gpsAddress
      this.cart.deliveryFee = result.deliveryFee;
      this.selectOrderType(OrderType.DELIVERY, false)

      this.selectedSvc.setSelectedMerchantById(result.merchantId!);
      this.persist();
    }
    return result;
  }
  async selectAddress(address: Address) {
    var result = this.deliveryAddressSvc.checkAddress(address);

    if (result.deliverable && result.deliveryFee) {
      this.cart.gpsAddress = undefined;
      this.cart.address = address;
      this.cart.deliveryFee = result.deliveryFee;
      this.selectOrderType(OrderType.DELIVERY, false)
      this.selectedSvc.setSelectedMerchantById(result.merchantId!);
      this.persist();
    }
    return result;
  }

  persist() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
  async read() {
    var str = localStorage.getItem("cart");
    if (str) {
      var obj: DtoCart = JSON.parse(str!);
      if (obj) {
        Object.setPrototypeOf(obj, new DtoCart)
        for (let i = 0; i < obj.categorizedItems.length; i++) {
          for (let j = 0; j < obj.categorizedItems[i].items.length; j++) {
            Object.setPrototypeOf(obj.categorizedItems[i].items[j], new DtoCartItem);
          }
        }
        this.cart = obj;
        if (obj.orderType) {
          this.selectedSvc.setOrderType(obj.orderType);
          if (obj.orderType == OrderType.DELIVERY) {
            if (this.cart.gpsAddress) {
              await this.selectGpsAddress(this.cart.gpsAddress);
            } else if (this.cart.address) {
              await this.selectAddress(this.cart.address);
            }
          }
        }
        this.isReady = true;
        this._isReady.next(true);
        // else if (this.selectedSvc.type == AppOperation.SINGLE_MERCHANT) {
        //   this.setOrderTypeAuto();
        // }
        // this.cart.__proto__ = DtoCart.prototype;
        // console.dir(this.cart);
      }
    } else {
      this.isReady = true;
      this._isReady.next(true);
    }
  }

  // setOrderTypeAuto() {
  //   if (this.selectedSvc.selectedMerchant && this.selectedSvc.selectedMerchant.catalog) {
  //     if (Enumerable.from(this.selectedSvc.selectedMerchant.catalog).
  //       where(x => x.type == OrderType.DELIVERY.toString() && x.status == Status.ACTIVE).any()) {
  //       this.cart.orderType = OrderType.DELIVERY
  //     }
  //     else if (Enumerable.from(this.selectedSvc.selectedMerchant.catalog)
  //       .where(x => x.type == OrderType.TAKEOUT && x.status == Status.ACTIVE).any()) {
  //       this.cart.orderType = OrderType.TAKEOUT;
  //     }
  //     else if (Enumerable.from(this.selectedSvc.selectedMerchant.catalog)
  //       .where(x => x.type == OrderType.TABLE && x.status == Status.ACTIVE).any()) {
  //       this.cart.orderType = OrderType.TABLE;
  //     }
  //   }
  // }
  clear() {
    this.cart.categorizedItems = [];
    this.cart.discount = 0;
    this.cart.deliveryFee = 0;
    this.cart.discountDeliveryFee = 0;
    this.cart.orderType = undefined;
    this.cart.address = undefined;
    this.persist();
  }

  isReadyToSend(){
    var ret=false;
    if (this.orderSvc.adapter){
      ret=this.orderSvc.adapter!.readyToSend;
    }
    return ret;
  }

  async send() {
    var _self = this;
    _self.sendingOrder = true;
    console.log(this.cart);
    if (this.validate()) {
      try {
        var err = await this.orderSvc.send(this.cart);
        if (err == "") {
          _self.sendingOrder = false;
          _self.router.navigateByUrl('/my-orders');
        } else {
          alert(err);
        }
      } catch (error) {
        alert('err');
        console.log("error to send order");
        console.dir(error);
      }
      finally {
        _self.sendingOrder = false;
      }
    }
  }
  validate() {
    return true;
  }
  validateToChangeCatalog(newMerchant: Merchant | undefined = undefined, newOrderType: OrderType | undefined) {
    return true;
  }

  get address(): Address | undefined {
    return this.cart.address;
  }
  get gpsAddress(): Address | undefined {
    return this.cart.gpsAddress;
  }
  get categorizedItems(): DtoCartItemCategory[] {
    return this.cart.categorizedItems;
  }
  get discount(): number {
    return this.cart.discount;
  }
  get coupon(): Coupon | undefined {
    return this.cart.coupon;
  }
  get payment(): PaymentMethod | undefined {
    return this.cart.payment;
  }
  get customerCard(): DtoCustomerCard | undefined {
    return this.cart.customerCard;
  }
  get discountDeliveryFee(): number {
    return this.cart.discountDeliveryFee;
  }
  get deliveryFee(): number {
    return this.cart.deliveryFee;
  }
  get orderType(): OrderType | undefined {
    return this.cart.orderType;
  }
  get orderMode(): string {
    return this.cart.orderMode;
  }
  get orderTiming(): string {
    return this.cart.orderTiming;
  }
  get deliveryDateTime(): string | undefined {
    return this.cart.deliveryDateTime;
  }
  get whereToLeave(): string {
    return this.cart.whereToLeave;
  }
  get deliveryTimeWindow(): DtoDeliveryTimeWindow | undefined {
    return this.cart.deliveryTimeWindow;
  }

  get subtotalDeliveryFee(): number {
    return this.cart.subtotalDeliveryFee;
  }
  get subtotal(): number {
    return this.cart.subtotal;

  }
  get total(): number {
    return this.cart.total;
  }



}
