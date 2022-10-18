import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { DtoCartToSend } from "src/app/api/models";
import { CustomerAppEndpoint } from "src/app/api/models/customer-app-endpoint";
import { DtoEndpoint } from "src/app/dto/dto-endpoint";
import { IOrderAdapter } from "./i-order-adapter";

export class OAdWebApi implements IOrderAdapter {
    endpoint: CustomerAppEndpoint;
    readyToSend:boolean=true;
    constructor(endpoint: CustomerAppEndpoint) {
        this.endpoint = endpoint;
    }
    send(cart: DtoCartToSend) {
        var p = new Promise<any>(
            async (resolve, reject) => {
                var hash = "";
                const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
                var _self = this;
                var path = new DtoEndpoint(this.endpoint)
                //console.log('order');
                //console.log(path.fullPath());
                httpClient.post(path.fullPath(), cart).subscribe({
                    next: (data) => {
                        if (data) {
                            resolve(data)
                        } else {
                            reject(data);
                        }
                    }, error: (e) => {
                        setTimeout(() => {
                            reject(e);
                          }, 7000);
                    }
                });

            }
        )
        return p;
    }
    // send(cart: DtoCart): void {

    // }

}