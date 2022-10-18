import { Injectable } from '@angular/core';
import { SSAuthentication } from './authentication';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  public publicKey: CryptoKey|null = null;
  public privateKey: CryptoKey|null = null;

  public static Instance:CryptoService;

  constructor() {
    SSAuthentication.cryptoService=this;
    CryptoService.Instance=this;
   }

  
    /*
  Convert a string into an ArrayBuffer
  from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  */
  private str2ab(str:any) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

    /*
  Convert  an ArrayBuffer into a string
  from https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
  */
  private ab2str(buf:any) {
    return String.fromCharCode.apply(null, <any>new Uint8Array(buf));
  }

  public async generateNewKeys() {
    let keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
      },
      true,
      ["encrypt", "decrypt"]
    );

    var pubkStr = "";
    var prikStr = "";

    var pubk:any = await window.crypto.subtle.exportKey(
      "spki", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      keyPair.publicKey! //can be a publicKey or privateKey, as long as extractable was true
    );
    pubkStr = `-----BEGIN PUBLIC KEY-----\n${btoa(this.ab2str(pubk))}\n-----END PUBLIC KEY-----`;

    var prik:any = await window.crypto.subtle.exportKey(
      "pkcs8", //can be "jwk" (public or private), "spki" (public only), or "pkcs8" (private only)
      keyPair.privateKey! //can be a publicKey or privateKey, as long as extractable was true
    );
    prikStr = `-----BEGIN PRIVATE KEY-----\n${btoa(this.ab2str(prik))}\n-----END PRIVATE KEY-----`

    return {
      privateKey: prikStr,
      publicKey: pubkStr
    }
  }

  public async encrypt(text: string,publicKey:any=null) {
    var _self=this;
    let encoded = this.str2ab(text);
    let buffermsg = await window.crypto.subtle.encrypt("RSA-OAEP",
      (publicKey==null?this.publicKey:publicKey),
      encoded);
    let cmsg = btoa(this.ab2str(buffermsg));
    return cmsg;
  }

  public async decrypt(text:any,privateKey:any=null) {
    let encoded = this.str2ab(atob(text));
    let buffermsg = await window.crypto.subtle.decrypt("RSA-OAEP",
      (privateKey==null?this.privateKey:privateKey),
      encoded);
    let msg = (this.ab2str(buffermsg));
    return msg;
  }

  public async importPublicKey(keystr: string):Promise<CryptoKey> {
    const pemContents = keystr.replace('\r', '').replace('\r', '').replace('\r', '').replace('\r', '').replace('\r', '').split('\n')[5].trim();
    const binaryDerString = atob(pemContents);
    const binaryDer = this.str2ab(binaryDerString);
    return await window.crypto.subtle.importKey(
      "spki",
      binaryDer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256"
      },
      true,
      ["encrypt"]
    );
  }

  public async importJustPublicKey(keystr: string):Promise<CryptoKey> {
    const pemContents = keystr.replace('\r', '').replace('\r', '').replace('\r', '').replace('\r', '').replace('\r', '').split('\n')[1].trim();
    const binaryDerString = atob(pemContents);
    const binaryDer = this.str2ab(binaryDerString);
    return await window.crypto.subtle.importKey(
      "spki",
      binaryDer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256"
      },
      true,
      ["encrypt"]
    );
  }

  public async importPrivateKey(keystr: string):Promise<CryptoKey> {
    const pemContents = keystr.replace('\r', '').replace('\r', '').replace('\r', '').replace('\r', '').replace('\r', '').split('\n')[1].trim();
    const binaryDerString = atob(pemContents);
    const binaryDer = this.str2ab(binaryDerString);
    return await window.crypto.subtle.importKey(
      "pkcs8",
      binaryDer,
      <any>{
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
      },
      true,
      ["decrypt"]
    );
  }

}
