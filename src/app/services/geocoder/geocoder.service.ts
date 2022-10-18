import { Injectable } from '@angular/core';
import { Address } from 'src/app/api/models/address';
import { GeoAdGoogle } from './adapters/geo-ad-google';
import { IGeocoderAdapter } from './adapters/i-geocoder-adapter';

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {

  // private lastAddress:Address|undefined;

  private _lastAddress: Address | undefined;
  public get lastAddress(): Address | undefined {
    if (!this._lastAddress) {
      var strAddress = localStorage.getItem("ODP_LAST_ADDRESS");
      if (strAddress) {
        var lsAddress = JSON.parse(strAddress);
        if (lsAddress) {
          this._lastAddress = lsAddress;
        }
      }
    }
    return this._lastAddress;
  }
  public set lastAddress(v: Address | undefined) {
    this._lastAddress = v;
    localStorage.setItem("ODP_LAST_ADDRESS", JSON.stringify(v));
  }

  constructor() {
    this.adapter = new GeoAdGoogle();
  }
  adapter: IGeocoderAdapter | undefined;
  getAddressByLatLong(lat: number, long: number): Promise<Address> {
    var _self = this;
    return new Promise<Address>((resolve, reject) => {
      if (_self.lastAddress && _self.lastAddress.latitude == lat, _self.lastAddress?.longitude == long) {
        resolve(_self.lastAddress);
      } else if (_self.adapter) {
        {
          var address: Address;
          _self.adapter.getAddressByLatLong(lat, long).then(function (d) {
            _self.lastAddress = d;
            resolve(d);
          }).catch(function (e) {
            reject(e);
          })
        }
      }
    });
  }
}
