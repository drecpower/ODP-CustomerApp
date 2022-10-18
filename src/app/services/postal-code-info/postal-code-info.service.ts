import { Injectable } from '@angular/core';
import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { Subject } from "rxjs/internal/Subject";
import { CustomerAppEndpoint } from "src/app/api/models/customer-app-endpoint";
import { DtoEndpoint } from "src/app/dto/dto-endpoint";
import { Address } from 'src/app/api/models';
import { PciAdViaCep } from './adapters/pci-ad-viacep';
import { IPostalCodeInfoAdapter } from './adapters/i-postalcodeinfo-adapter';


@Injectable({
  providedIn: 'root'
})
export class PostalCodeInfoService {
  adapter:IPostalCodeInfoAdapter;
  constructor() {
    this.adapter=new PciAdViaCep();
  }

  getPostalCode(postalCode: string|undefined): Promise<Address> {
    return new Promise<Address>((resolve, reject) => {
      this.adapter.getAddressByPostalCode(postalCode).then(function (d) {
        resolve(d);
      });
    });

  }
}
