import { Injectable } from '@angular/core';
import * as Enumerable from 'linq';
import { Subject } from 'rxjs/internal/Subject';
import { Merchant } from 'src/app/api/models';
import { CustomerAppEndpoint } from 'src/app/api/models/customer-app-endpoint';
import { AppshellService } from '../appshell.service';
import { ManifestService } from '../manifest.service';
import { HdAdOrbitdb } from './adapters/hd-ad-orbitdb';
import { HdAdWebapi } from './adapters/hd-ad-webapi';
import { IHashDataAdapter } from './adapters/i-hash-data-adapter';

@Injectable({
  providedIn: 'root'
})
export class HashDataService {
  endpoint: CustomerAppEndpoint | undefined;
  adapter: IHashDataAdapter | undefined;
  externalHashReceived: boolean = false;
  private _onSelectHashDataSubject = new Subject<string | undefined>();
  public onSelectHashData = this._onSelectHashDataSubject.asObservable();
  private firstTime: boolean = true;
  private _selectedHashData?: string;
  get selectedHashData() {
    return this._selectedHashData;
  }
  set selectedHashData(value: string | undefined) {
    console.log('selectedHashData() ' + value);
    if (value != this._selectedHashData || this.firstTime) {
      this.firstTime = false;
      this._selectedHashData = value;
      this._onSelectHashDataSubject.next(value);
    }
  }

  loadHashData(){
    setTimeout( () => {
      var endpoint = Enumerable.from(this.manifestSvc.endpoints)
        .where(x => x.type == "DATA").defaultIfEmpty(undefined).firstOrDefault(); 0
      if (endpoint) {
        this._selectedHashData = endpoint.publicKey;
        this._onSelectHashDataSubject.next(endpoint.publicKey);
        this.initialize();
      } else {
        this.loadHashData();
      }
    }, 500);
  }

  constructor(private manifestSvc: ManifestService) {
    //console.log("HashDataService initiated");
    var _self = this;
    this.loadHashData();
  }
  initialize() {
    var _self = this;
    try {
      this.endpoint = Enumerable.from(_self.manifestSvc.endpoints)
        .where(x => x.type == "HASH_DATA").defaultIfEmpty(undefined).firstOrDefault();
      if (this.endpoint) {
        switch (this.endpoint.protocolType) {
          case "ORBIT_DB":
            this.adapter = new HdAdOrbitdb(this.endpoint);
            break;
          case "WEB_API":
            this.adapter = new HdAdWebapi(this.endpoint);
            break;
          default:
            break;
        }
        if (_self.adapter) {
          _self.adapter.onNewHashData.subscribe(d => {
            _self.externalHashReceived = true;
            _self.selectedHashData = d;
            console.log('externalHashReceived: ' + _self.selectedHashData);
          })
        }
        // if (this.catalogId)
        //   this.get("catalog", this.catalogId);
      }
    } catch (error) {

    }
  }
  // connect(merchant: Merchant | undefined) {
  //   this.initialize(merchant);
  // }
  tst() {
    var endpoint = Enumerable.from(this.manifestSvc.endpoints)
      .where(x => x.type == "DATA").defaultIfEmpty(undefined).firstOrDefault();
    if (endpoint) {
      this.selectedHashData = endpoint.publicKey;
    }
  }
}
