import { Injectable } from '@angular/core';
import * as Enumerable from 'linq';
import { CustomerAppEndpoint } from '../api/models';
import { DataService } from './data/data.service';

@Injectable({
  providedIn: 'root'
})
export class ManifestService {
  public merchantGroupId = "";

  // public initialDataGateway = "{http://localhost:4200/data}";
  // public dataGateway = "{https://gw.crustapps.net/ipfs/{publicKey}}";
  // public initialHashData = "QmNtgm5VfKezgEX5KLYiaof4q2ZhavoVJJzkvQBe4bJSiE";
  // public initialProtocolType = "ipfs";
  public googleMapsApiUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBRB_0zi-jjoy6gxheEWrENm3FA73zl0_w";

  public endpoints: CustomerAppEndpoint[] = [];

  public ipfsgatewayUri:string="";

  constructor() {
    //console.log("ManifestService initiated");
    this.loadWebManifestData();
  }

  async loadWebManifestData() {
    var lastIpfsCid = sessionStorage.getItem("last_ipfs_cid");

    if (document.location.hash.indexOf("?cid=") > -1 || lastIpfsCid) {
      const ipfsFileCID = lastIpfsCid ? lastIpfsCid : document.location.hash.substring(document.location.hash.indexOf("?cid=") + 5);
      sessionStorage.setItem("last_ipfs_cid", ipfsFileCID);
      console.log(ipfsFileCID);
      this.endpoints = [
        {
          "createdAt": "",
          "headers": "",
          "index": 0,
          "params": "",
          "privateKey": "",
          "publicKey": ipfsFileCID,
          "status": "ACTIVE",
          "type": "DATA",
          "protocolType": "IPFS",
          "uri": "https://gw.crustapps.net/ipfs/{publicKey}"
        }
      ];
      const response = await (await fetch(this.endpoints[0].uri!.replace("{publicKey}", ipfsFileCID) + "/id")).text();
      this.merchantGroupId = response;

    } else {
      const link = document.head.querySelector<HTMLLinkElement>('link[rel="manifest"]')
      if (link) {
        try {
          const response = await fetch(link.href);
          const json = await response.json();
          this.endpoints = json.endpoints;
          this.merchantGroupId = json.merchantGroupId;
        } catch (error) {
          console.error(error);
          setTimeout(() => {
            this.loadWebManifestData();
          }, 3000);
        }

      }
    }

    this.ipfsgatewayUri=(<string>Enumerable.from(this.endpoints)
    .where(p=>p.protocolType?.toLocaleLowerCase()=="ipfs")
    .select(p=>p.uri)
    .defaultIfEmpty("")
    .firstOrDefault())
    .replace("{publicKey}","")
    ;
  }


}
