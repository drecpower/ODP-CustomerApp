import { HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { DtoCartToSend, DtoOauthRequest } from "src/app/api/models";
import { CryptoService } from "src/app/services/crypto/crypto.service";
import { concat as uint8ArrayConcat } from 'uint8arrays/concat'
import all from "it-all"
import { IIpfs } from "./ipfs.interface";



export class SSIpfs {

  public static active: boolean = false;
  public static _node: any = null;

  public static getIpfsScriptInstance() {
    return new Promise<HTMLScriptElement>(
      (resolve, reject) => {
        var ipfsScriptElement = <HTMLScriptElement>document.getElementById("jsipfslib");
        if (ipfsScriptElement == null) {
          ipfsScriptElement = document.createElement("script");
          ipfsScriptElement.id = "jsipfslib";
          ipfsScriptElement.src = "libs/jsipfs.min.js";
          ipfsScriptElement.addEventListener("load", () => {
            this._ipfs = (<any>window)['Ipfs'];
            setTimeout(() => {
              resolve(ipfsScriptElement);
            }, 500);

          });
          document.head.appendChild(ipfsScriptElement);
        } else {
          setTimeout(() => {
            resolve(ipfsScriptElement);
          }, 1500);
        }
      }
    );
  }

  public static getIpfsHttpScriptInstance() {
    return new Promise<HTMLScriptElement>(
      (resolve, reject) => {
        var ipfsScriptElement = <HTMLScriptElement>document.getElementById("ipfshttplib");
        if (ipfsScriptElement == null) {
          ipfsScriptElement = document.createElement("script");
          ipfsScriptElement.id = "ipfshttplib";
          ipfsScriptElement.src = "libs/ipfshttpclient.min.js";
          ipfsScriptElement.addEventListener("load", () => {
            resolve(ipfsScriptElement);
          });
          document.head.appendChild(ipfsScriptElement);
        } else {
          resolve(ipfsScriptElement);
        }
      }
    );
  }

  public static removeUndefineds(objParam: any) {
    var obj=JSON.parse(JSON.stringify(objParam));
    Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
    return obj;
  }


  public static async Ipfs() {
    if (!this._ipfs) {
      const scriptElement = await this.getIpfsScriptInstance();
    }
    return this._ipfs;
  }

  private static _ipfs: IIpfs | undefined = undefined;

  private static _isListenerLoaded = false;
  public static getNode(): Promise<any> {
    return new Promise<any>(
      async (resolve, reject) => {
        //var ipfsScriptElement=<HTMLScriptElement>document.getElementById("jsipfslib");
        var ipfsScriptElement = await this.getIpfsScriptInstance();
        if (!this._isListenerLoaded) {
          this._ipfs!.create({
            repo: 'customerclient_ipfs',
            pubsub: true,
            EXPERIMENTAL: {
              pubsub: true
            }
            , config: {
              Addresses: {
                Swarm: [
                  // This is a public webrtc-star server
                  //'/dns4/webrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star/',
                  '/dns4/intense-lake-89842.herokuapp.com/tcp/443/wss/p2p-webrtc-star/',
                  //'/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
                  //'/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star',

                  //'/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
                  //'/ip4/127.0.0.1/tcp/9090/wss/p2p-webrtc-star'
                ]
              },
              // If you want to connect to the public bootstrap nodes, remove the next line
              //Bootstrap: ['/ip4/177.95.228.226/tcp/4001/p2p/QmeSWa6nqZKJBxw4FNs4kQhuLsvRHnjo1eBzvcdYHpZ6Vb']
            }
          }).then(
            (d: any) => {
              this._node = d;
              this.active = true;
              resolve(this._node);
            }
          )
          this._isListenerLoaded = true;
        } else {
          if (this._node != null) {
            resolve(this._node);
          } else {
            setTimeout(() => {
              if (this._node != null) {
                resolve(this._node);
              }
            }, 500);
          }
        }
      }
    );
  }

  public static async getImageBlobFromIpfs(ipfsHash: string) {
    const ipfs = (await this.getNode());
    const arrBV = uint8ArrayConcat(await all(ipfs.cat(ipfsHash)));
    var blob = new Blob([arrBV], { type: 'application/image' });
    return blob;
  }

  public static async addFile(blob: Blob | File | ArrayBuffer) {
    const ipfs = (await this.getNode());
    return (await ipfs.add(blob, { pin: true }));
  }

}



