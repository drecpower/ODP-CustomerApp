import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Enumerable from 'linq';
import { Subject } from 'rxjs';
import { Catalog, Category, Coupon, CustomerAppEndpoint, Merchant, MerchantGroup, OptionGroup, PaymentMethod, Product } from 'src/app/api/models';
import { Item } from '../../api/models/item';
import { HashDataService } from '../hash-data/hash-data.service';
import { ManifestService } from '../manifest.service';
import { DAdIpfs } from './adapters/d-ad-ipfs';
import { DAdWebApi } from './adapters/d-ad-webapi';
import { IDataAdapter } from './adapters/i-data-adapter';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private adapter: IDataAdapter | undefined;
  endpoint: CustomerAppEndpoint | undefined;
  hashData: string | undefined;

  private _isReady = new Subject<string>();
  public isReady = this._isReady.asObservable();

  constructor(private httpClient: HttpClient, private manifestSvc: ManifestService,
    private hashDataSvc: HashDataService) {
    //console.log("DataService initiated");
    var _self = this;
    // setTimeout(function () {
    hashDataSvc.onSelectHashData.subscribe((d) => {
      //console.log('**onSelectHashData:' + (d ? d : ""));
      if (d) {
        if (d != _self.hashData) {
          _self.hashData = d;
          _self.initialize();
        }
        this._isReady.next(d);
      }
    });
    // }, 100);
  }
  initialize() {
    //console.log('data service initialize()')
    if (this.hashData) {
      this.endpoint = Enumerable.from(this.manifestSvc.endpoints)
        .where(x => x.type == "DATA").defaultIfEmpty(undefined).firstOrDefault();
      if (this.endpoint) {
        this.endpoint.publicKey = this.hashData;
        switch (this.endpoint.protocolType) {
          case "IPFS":
            this.adapter = new DAdIpfs(this.endpoint);
            break;
          case "WEB_API":
            this.adapter = new DAdWebApi(this.endpoint);
            break;
          default:
            break;
        }
        this.adapter!.currentUri = this.endpoint?.uri!;
        console.warn('dataSvc is ready');
      }
    }
  }

  async get(entity: string, id: string, navigations?: string[], merchantId?: string, catalogId?: string, categoryId?: string):Promise<any> {
    var ret;
    console.log("getting entity: "+entity +" / "+id);
    try {
       ret = await this.adapter?.get(entity, id, navigations, merchantId, catalogId, categoryId);
    } catch (error) {
      if((<any>this.endpoint)["uriFallback"]!= null){
        this.getNextUri();
        //pass uri
        ret = await this.get(entity, id, navigations, merchantId, catalogId, categoryId);
      }
    }

    return ret;
  }

  async items(brandId: string, merchantId: string, catalogId: string, categoryId: string):Promise<Item[] | undefined>{
    var ret;
    try {
      ret = await this.adapter?.items(brandId, merchantId, catalogId, categoryId);
    } catch (error) {
      if((<any>this.endpoint)["uriFallback"]!= null){
        this.getNextUri();
        //pass uri
        ret = await this.items(brandId, merchantId, catalogId, categoryId);
      }
    }
    return ret;
  }

  async product(id: string): Promise<Product | undefined> {
    var ret;
    try {
      ret = await this.adapter?.product(id);
    } catch (error) {
      if((<any>this.endpoint)["uriFallback"]!= null){
        this.getNextUri();
        //pass uri
        ret = await this.product(id);
      }
    }
    return ret;
  }

  async optionGroup(brandId: string, merchantId: string, id: string): Promise<OptionGroup | undefined> {
    var ret;
    try {
      ret = await this.adapter?.optionGroup(brandId, merchantId, id);
    } catch (error) {
      if((<any>this.endpoint)["uriFallback"]!= null){
        this.getNextUri();
        //pass uri
        ret = await this.optionGroup(brandId, merchantId, id);
      }
    }
    return ret;
  }

  async item(id: string, includeProduct?: boolean, includeCategory?: boolean): Promise<Item | undefined> {
    var ret;
    try {
      ret = await this.adapter?.item(id, includeProduct, includeCategory);
    } catch (error) {
      if((<any>this.endpoint)["uriFallback"]!= null){
        this.getNextUri();
        //pass uri
        ret = await this.item(id, includeProduct, includeCategory);
      }
    }
    return ret;
  }

  async categories(brandId: string, merchantId: string, catalogId: string): Promise<Category[] | undefined> {
    var ret;
    try {
      ret = await this.adapter?.categories(brandId, merchantId, catalogId);
    } catch (error) {
      if((<any>this.endpoint)["uriFallback"]!= null){
        this.getNextUri();
        //pass uri
        ret = await this.categories(brandId, merchantId, catalogId);
      }
    }
    return ret;
  }

  async catalogs(brandId: string, merchantId: string): Promise<Catalog[] | undefined> {
    var ret;
    try {
      ret = await this.adapter?.catalogs(brandId, merchantId);
    } catch (error) {
      if((<any>this.endpoint)["uriFallback"]!= null){
        this.getNextUri();
        //pass uri
        ret = await this.catalogs(brandId, merchantId);
      }
    }
    return ret;
  }

  async customerAppEndpoints(brandId: string, merchantId: string): Promise<CustomerAppEndpoint[] | undefined> {
    var ret;
    try {
      ret = await this.adapter?.customerAppEndpoints(brandId, merchantId);
    } catch (error) {
      if((<any>this.endpoint)["uriFallback"]!= null){
        this.getNextUri();
        //pass uri
        ret = await this.customerAppEndpoints(brandId, merchantId);
      }
    }
    return ret;
  }
  async paymentMethods(brandId: string, merchantId: string): Promise<PaymentMethod[] | undefined> {
    var ret;
    try {
      ret = await this.adapter?.paymentMethods(brandId, merchantId);
    } catch (error) {
      if((<any>this.endpoint)["uriFallback"]!= null){
        this.getNextUri();
        //pass uri
        ret = await this.paymentMethods(brandId, merchantId);
      }
    }
    return ret;
  }

  async coupons(brandId: string, merchantId: string): Promise<Coupon[] | undefined> {
    var ret;
    try {
      ret = await this.adapter?.coupons(brandId, merchantId);
    } catch (error) {
      if((<any>this.endpoint)["uriFallback"]!= null){
        this.getNextUri();
        //pass uri
        ret = await this.coupons(brandId, merchantId);
      }
    }
    return ret;
  }

  async brandData(id: string): Promise<MerchantGroup | undefined> {
    var ret;
    try {
      ret = await this.adapter?.brandData(id);
    } catch (error) {
      if((<any>this.endpoint)["uriFallback"]!= null){
        this.getNextUri();
        ret = await this.brandData(id);
      }
    }
    return ret;
  }
  
  async products(brandId: string): Promise<Product[] | undefined> {
    var ret;
    try {
      ret = await this.adapter?.products(brandId);
    } catch (error) {
      if((<any>this.endpoint)["uriFallback"]!= null){
        this.getNextUri();
        ret = await this.products(brandId);
      }
    }
    return ret;
  }

  async merchants(brandId: string):  Promise<Merchant[] | undefined>{
    var ret;
    try {
      ret = await this.adapter?.merchants(brandId);
    } catch (error) {
      if((<any>this.endpoint)["uriFallback"]!= null){
        this.getNextUri();
        ret = await this.merchants(brandId);
      }
    }
    return ret;
  }

  tsLastUri:any =(new Date());
  getNextUri(){
    console.log("Error getting data. Checking uriFallback...");
    var fallbackString:string =(<any>this.endpoint)["uriFallback"];
    var fallbackList =[];
    if(fallbackString && ((<any>new Date())-this.tsLastUri)>1000){
      console.log("Set next URI from uriFallback:");
      this.tsLastUri=(new Date());
      fallbackList = fallbackString.split(";");
      var idx = fallbackList.indexOf(this.adapter!.currentUri.replace("ipfs/{publicKey}",''));
      if(idx<0){
        this.adapter!.currentUri = fallbackList[0]+"ipfs/{publicKey}";
      }else{
        if(idx+1 <=fallbackList.length-1 && fallbackList[idx+1].toLowerCase().indexOf("http")>=0){
          this.adapter!.currentUri = fallbackList[idx+1]+"ipfs/{publicKey}";
        }else{
          this.adapter!.currentUri = this.endpoint!.uri!;
        }
      }
      this.manifestSvc.ipfsgatewayUri=this.adapter!.currentUri.replace("{publicKey}","");
      console.log(this.adapter!.currentUri);
    }


  }

  tst() {
    this.hashDataSvc.tst();
  }

}
