import { Injectable } from '@angular/core';
import * as Enumerable from 'linq';
import { CustomerAppEndpoint, Merchant } from '../api/models';
import { DtoEndpoint } from '../dto/dto-endpoint';
import { ManifestService } from './manifest.service';
import { SelectedService } from './selected/selected.service';

@Injectable({
  providedIn: 'root'
})
export class LibraryLauncherService {

  LIBRARIES_FROM_MERCHANT: string[] = ["GOOGLE_MAPS_API"];
  constructor(private selectedSvc: SelectedService,private manifestSvc:ManifestService) {
    var _self = this;
    try {
      _self.loadLibrariesFromManifest();
    } catch (error) {
      
    }
    try {
      if (selectedSvc.selectedMerchant) {
        _self.loadLibrariesByMerchant(selectedSvc.selectedMerchant);
      }
      selectedSvc.onSelectMerchant.subscribe(d => {
        _self.loadLibrariesByMerchant(d);
      });
    } catch (error) {
      
    }
  }
  loadLibrariesFromManifest(){
    try {
      if(this.manifestSvc.googleMapsApiUrl)
      {
        this.loadGOOGLE_MAPS_API(this.manifestSvc.googleMapsApiUrl)
      }
    } catch (error) {
      
    }
  }
  loadLibrariesByMerchant(merchant: Merchant | undefined) {
    if (merchant && this.selectedSvc.customerAppEndpointList) {
      var list = Enumerable.from(this.selectedSvc.customerAppEndpointList)
        .where(x => this.LIBRARIES_FROM_MERCHANT.indexOf(x.type!) >= 0).toArray();
      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        (<any>this)["load" + element.type](element);
      }
    }
  }

  loadGOOGLE_MAPS_API(url:string) {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type", "text/javascript");
    script_tag.setAttribute("name", "google-maps-api");
    script_tag.setAttribute("src", url);
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
  }
}
