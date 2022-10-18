import { Injectable } from '@angular/core';
import * as Enumerable from 'linq';
import { Subject } from 'rxjs';
import { Catalog, Coupon, CustomerAppEndpoint, Merchant, MerchantGroup, PaymentMethod } from 'src/app/api/models';
import { ChooseOrderTypeComponent } from 'src/app/components/choose-order-type/choose-order-type.component';
import { DialogType, DtoDialog } from 'src/app/dto/dto-dialog';
import { AppOperation, OrderType } from 'src/enum/enums';
import { DataService } from '../data/data.service';
import { DialogService } from '../dialog/dialog.service';
import { HashDataService } from '../hash-data/hash-data.service';
import { ManifestService } from '../manifest.service';

@Injectable({
  providedIn: 'root'
})
export class SelectedService {
  //Type
  private _type: AppOperation | undefined;
  public get type(): AppOperation | undefined {
    return this._type;
  }
  private set type(v: AppOperation | undefined) {
    this._type = v;
    console.info("TYPE: " + v);
    // this.checkMerchant();
  }

  //SelectedMerchantGroup
  public loadingMerchantGroup: boolean = false;
  private _onSelectMerchantGroupSubject = new Subject<MerchantGroup | undefined>();
  public onSelectMerchantGroup = this._onSelectMerchantGroupSubject.asObservable();
  private _selectedMerchantGroup?: MerchantGroup | undefined;
  get selectedMerchantGroup(): MerchantGroup | undefined {
    return this._selectedMerchantGroup;
  }
  set selectedMerchantGroup(value: MerchantGroup | undefined) {
    this._selectedMerchantGroup = value;
    this._onSelectMerchantGroupSubject.next(value);
    if (this._selectedMerchantGroup && this._selectedMerchantGroup.merchant) {
      if (this._selectedMerchantGroup.merchant?.length == 1) {
        this.type = AppOperation.SINGLE_MERCHANT;
      } else if (this._selectedMerchantGroup.merchant?.length > 1) {
        this.type = AppOperation.MULTI_MERCHANT;
      }
    }
  }

  //SelectedMerchant
  public loadingMerchant: boolean = false;
  private _selectedMerchant?: Merchant;
  get selectedMerchant() {
    return this._selectedMerchant;
  }
  public set selectedMerchant(value: Merchant | undefined) {
    this._selectedMerchant = value;
    if (value) {
      this.loadCatalogList(value.id)
      this.loadChildren();
    }
    this._onSelectMerchantSubject.next(value)
  }
  private _onSelectMerchantSubject = new Subject<Merchant | undefined>();
  public onSelectMerchant = this._onSelectMerchantSubject.asObservable();

  //Catalog List
  public loadingCatalogList: boolean = false;
  private _catalogList?: Catalog[];
  get catalogList() {
    return this._catalogList;
  }
  private set catalogList(value: Catalog[] | undefined) {
    this._catalogList = value;
    this._onCatalogListSubject.next(value)
  }
  private _onCatalogListSubject = new Subject<Catalog[] | undefined>();
  public onCatalogList = this._onSelectMerchantSubject.asObservable();

  //Catalog
  public loadingCatalog: boolean = false;
  private _selectedCatalog?: Catalog | undefined;
  get selectedCatalog() {
    return this._selectedCatalog;
  }
  set selectedCatalog(value: Catalog | undefined) {
    this._selectedCatalog = value;
    this._onSelectCatalogSubject.next(value);
  }
  private _onSelectCatalogSubject = new Subject<Catalog | undefined>();
  public onSelectCatalog = this._onSelectCatalogSubject.asObservable();
  //CouponList
  public loadingCouponList: boolean = false;
  private _couponList?: Coupon[] | undefined;
  get couponList() {
    return this._couponList;
  }
  set couponList(value: Coupon[] | undefined) {
    this._couponList = value;
    this._onCouponListSubject.next(value);
  }
  private _onCouponListSubject = new Subject<Coupon[] | undefined>();
  public onCouponList = this._onCouponListSubject.asObservable();

  //PaymentMethodList
  public loadingPaymentMethodList: boolean = false;
  private _paymentMethodList?: PaymentMethod[] | undefined;
  get paymentMethodList() {
    return this._paymentMethodList;
  }
  set paymentMethodList(value: PaymentMethod[] | undefined) {
    this._paymentMethodList = value;
    this._onPaymentMethodListSubject.next(value);
  }
  private _onPaymentMethodListSubject = new Subject<PaymentMethod[] | undefined>();
  public onPaymentMethodList = this._onPaymentMethodListSubject.asObservable();

  //CustomerAppEndpointList
  public loadingCustomerAppEndpointList: boolean = false;
  private _customerAppEndpointList?: CustomerAppEndpoint[] | undefined;
  get customerAppEndpointList() {
    return this._customerAppEndpointList;
  }
  set customerAppEndpointList(value: CustomerAppEndpoint[] | undefined) {
    this._customerAppEndpointList = value;
    this._onCustomerAppEndpointListSubject.next(value);
  }
  private _onCustomerAppEndpointListSubject = new Subject<CustomerAppEndpoint[] | undefined>();
  public onCustomerAppEndpointList = this._onCustomerAppEndpointListSubject.asObservable();

  //isReadyToSell
  isReadyToSell: boolean = false;
  private _isSystemReadyToSell = new Subject<boolean>();
  public isSystemReadyToSellAsync = this._isSystemReadyToSell.asObservable();

  catalogId: string | undefined;
  orderType: OrderType | undefined;
  constructor(private manifestSvc: ManifestService,
    private hashDataSvc: HashDataService, private dataSvc: DataService, private dialogSvc: DialogService) {
    this.dataSvc.isReady.subscribe((d) => {
      this.load(d);
    });
  }
  currentHashData: string | undefined;
  async load(newHashData: string | undefined) {
    var _self = this;
    console.warn("selectedService.load(" + newHashData + ")");
    if (newHashData && newHashData != this.currentHashData) {
      this.currentHashData = newHashData;
      await this.checkMerchantGroup();
      if (this.selectedMerchantGroup && this.selectedMerchantGroup.merchant?.length == 1) {
        this.selectedMerchant = this.selectedMerchantGroup.merchant[0];
      } else if (this.selectedMerchant && this.selectedMerchant.id) {
        this.selectedMerchant = this.selectedMerchant;
      }
      this.loadCatalog(true);
    }
    if (this.hashDataSvc.externalHashReceived) {
      await this.loadCustomerAppEndpoints();
      this.loadingCatalog = false;
      setTimeout(() => {
        _self.isReadyToSell = true;
      });
    }
  }
  async checkMerchantGroup() {
    if (!(this.selectedMerchantGroup) && !this.loadingMerchantGroup) {
      try {
        this.loadingMerchantGroup = true;
        var _self = this;
        console.warn('checkMerchantGroup')
        // setTimeout(async function () {
        _self.selectedMerchantGroup = await _self.dataSvc.brandData(_self.manifestSvc.merchantGroupId);
        //console.log('merchantGroup loaded');
        // console.dir(_self.selectedMerchantGroup);
        // }, 500);
      } catch (error) {

      }
      finally {
        this.loadingMerchantGroup = false;
      }
    }
  }
  setSelectedMerchantById(merchantid: string) {
    if (this.selectedMerchantGroup && this.selectedMerchantGroup.merchant) {
      var merchant = Enumerable.from(this.selectedMerchantGroup.merchant).where(x => x.id == merchantid).defaultIfEmpty(undefined).firstOrDefault();
      if (merchant) {
        this.selectedMerchant = merchant;
        this.loadCatalog();
      }
    }
  }
  async loadChildren() {
    this.loadCoupons();
    this.loadPaymentMethods();
    this.loadCustomerAppEndpoints();
  }
  async loadCoupons() {
    if (this.selectedMerchantGroup && this.selectedMerchant) {
      try {
        this.loadingCouponList = true;
        this.couponList = undefined;
        var coupons = await this.dataSvc.coupons(this.selectedMerchantGroup.id!, this.selectedMerchant?.id!);
        if (coupons) {
          this.couponList = coupons;
        }
      } catch (error) {

      } finally {
        this.loadingCouponList = false;
      }
    }
  }
  async loadPaymentMethods() {
    if (this.selectedMerchantGroup && this.selectedMerchant) {
      try {
        this.loadingPaymentMethodList = true;
        this.paymentMethodList = undefined;
        var paymentMethods = await this.dataSvc.paymentMethods(this.selectedMerchantGroup.id!, this.selectedMerchant?.id!);
        if (paymentMethods) {
          this.paymentMethodList = paymentMethods;
        }
      } catch (error) {

      } finally {
        this.loadingPaymentMethodList = false;
      }
    }
  }
  async loadCustomerAppEndpoints() {
    if (this.selectedMerchantGroup && this.selectedMerchant) {
      try {
        this.loadingCustomerAppEndpointList = true;
        this.customerAppEndpointList = undefined;
        var customerAppEndpoints = await this.dataSvc.customerAppEndpoints(this.selectedMerchantGroup.id!, this.selectedMerchant?.id!);
        if (customerAppEndpoints) {
          this.customerAppEndpointList = customerAppEndpoints;
        }
      } catch (error) {

      } finally {
        this.loadingCustomerAppEndpointList = false;
      }
    }
  }
  // async setSelectedMerchant(id: string) {
  //   console.log('selectedSvc.setSelectedMerchant(id:string)');
  //   if (this._selectedMerchantGroup) {
  //     try {
  //       this.loadingMerchant = true;
  //       var merchant = await this.dataSvc.get("merchant", this._selectedMerchantGroup.merchant![0].id!);
  //       if (merchant) {
  //         console.warn('merchant :' + merchant.id);
  //         this.selectedMerchant = merchant;
  //       }
  //     } catch (error) {

  //     } finally {
  //       this.loadingMerchant = false
  //     }
  //   }
  // }
  async loadCatalogList(merchantId: string | undefined) {
    console.log('selectedSvc.setSelectedMerchant(id:string)');
    if (this.selectedMerchantGroup && merchantId) {
      try {
        this.loadingCatalogList = true;
        var list = await this.dataSvc.catalogs(this.selectedMerchantGroup.id!, merchantId);
        if (list) {
          console.dir(list);
          this.catalogList = list;
          this.loadCatalog();
        }
      } catch (error) {

      } finally {
        this.loadingCatalogList = false
      }
    }
  }
  async setOrderType(type: OrderType | undefined, loadCatalog: boolean = true) {
    this.orderType = type;
    if (loadCatalog == true) {
      await this.loadCatalog();
    }
  }
  async loadCatalog(newHash?: boolean) {
    var _self=this;
    if (_self.selectedMerchant && !_self.catalogList && !_self.loadingCatalogList) {
      await this.loadCatalogList(_self.selectedMerchant.id);
    }

    if (this.selectedMerchantGroup && this.selectedMerchant && this.catalogList && this.catalogList
      && (
        newHash == true
        || this.selectedCatalog == null
        || (this.selectedCatalog != null &&
          (this.selectedCatalog.merchantId != this.selectedMerchant.id || this.selectedCatalog.type != this.orderType)
        )

      )) {
      console.warn('loadCatalog()');
      this.loadingCatalog = true;
      this.isReadyToSell = false;
      var catalog = undefined;
      if (Enumerable.from(this.catalogList).where(x => x.status?.toUpperCase() == "ACTIVE").count() == 1
        && this.catalogList[0].type == OrderType.DELIVERY.toString()
      ) {
        catalog = Enumerable.from(this.catalogList).where(x => x.status?.toUpperCase() == "ACTIVE").defaultIfEmpty(undefined).firstOrDefault();
      } else if (this.orderType) {
        catalog = Enumerable.from(this.catalogList)
          .where(x => x.type?.toUpperCase() == this.orderType?.toUpperCase()
            && x.status?.toUpperCase() == "ACTIVE"
          ).defaultIfEmpty(undefined).firstOrDefault();
      }
      if (catalog) {
        console.warn('catalog loaded');
        this.catalogId = catalog.id!;
        var categories = await this.dataSvc.categories(this.selectedMerchantGroup.id!, this.selectedMerchant.id!, this.catalogId);
        if (categories) {
          catalog.category = categories;
          this.selectedCatalog = catalog;
        }
        console.dir(this.selectedCatalog);
      } else {
        console.warn('clear catalog');
        this.selectedCatalog = undefined;
      }
      if (this.hashDataSvc.externalHashReceived || Enumerable.from(this.manifestSvc.endpoints).where(ep=>ep.type?.toUpperCase()=="HASH_DATA").count()==0 ) {
        this.isReadyToSell = true;
      }
      this.loadingCatalog = false;
    }
  }

  async checkMerchant() {
    var _self = this;
    return new Promise<boolean>(
      async (resolve, reject) => {
        try {
          if (this.type == AppOperation.SINGLE_MERCHANT && this.selectedMerchantGroup && this.selectedMerchantGroup.merchant && !this.selectedMerchant) {
            try {
              this.selectedMerchant = this.selectedMerchantGroup!.merchant[0];
              resolve(true);
            } catch (error) {

            } finally {
            }
          } else if (this.type == AppOperation.MULTI_MERCHANT && !this.selectedMerchant) {
            var dialog: DtoDialog = {
              type: DialogType.MAT_DIALOG,
              component: ChooseOrderTypeComponent,
              closeOnNavigation: false
            };
            var dialogRef = this.dialogSvc.open(dialog);
            dialogRef.afterClosed().subscribe(
              (d: any) => {
                resolve(true);
              },
              (err: any) => {
              }
            )
          }
        } catch (error) {

        }
      }
    );

  }
}
