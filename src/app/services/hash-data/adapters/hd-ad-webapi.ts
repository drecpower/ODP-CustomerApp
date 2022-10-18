import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { Subject } from "rxjs/internal/Subject";
import { CustomerAppEndpoint } from "src/app/api/models/customer-app-endpoint";
import { DtoEndpoint } from "src/app/dto/dto-endpoint";
import { IHashDataAdapter } from "./i-hash-data-adapter";

export class HdAdWebapi implements IHashDataAdapter {
    endpoint: CustomerAppEndpoint;
    private _onNewHashDataSubject = new Subject<string>();
    public onNewHashData = this._onNewHashDataSubject.asObservable();

    constructor(endpoint: CustomerAppEndpoint) {
        this.endpoint = endpoint;
        var _self = this;
        //console.log(this.endpoint.uri!.indexOf('webhook.site') >= 0)
        if (this.endpoint.uri!.indexOf('webhook.site') >= 0) {
            var txt = sessionStorage.getItem("last_hash_data");
            if (txt != null) {
                setTimeout(function () {
                    if (txt) {
                        _self._onNewHashDataSubject.next(txt);
                        console.log('localstorage last_hash_data')
                    }
                }, 500);
            } else {
                _self.loadLastHash();
            }
        } else {
            _self.loadLastHash();
        }
    }
    loadLastHash() {
        var hash = "";
        const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
        var _self = this;
        //console.log('loadLastHash()');
        //console.log(window.location.hostname);

        var path = new DtoEndpoint(this.endpoint)
        httpClient.get(path.fullPath()).subscribe({
            next: (data) => {
                if (data) {
                    _self._onNewHashDataSubject.next((<any>data).hash);
                    sessionStorage.setItem("last_hash_data", (<any>data).hash)
                }
            }, error: (e) => {
            }
        });
    }
}       