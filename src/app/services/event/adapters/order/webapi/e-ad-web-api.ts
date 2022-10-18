import { HttpClient, HttpHandler, HttpRequest, HttpXhrBackend } from "@angular/common/http";
import { Subject } from "rxjs";
import { ApiConfiguration } from "src/app/api/api-configuration";
import { DtoEvent, DtoEventsRequest, DtoOrderDetails, OrderEvent } from "src/app/api/models";
import { IEventAdapter } from "../i-event-adapter";
import { CustomerAppEndpoint, Order } from 'src/app/api/models';
import * as Enumerable from "linq";
import { OrderService } from "src/app/api/services/order.service";
import { EventsService } from "src/app/api/services";
import { DtoEndpoint } from "src/app/dto/dto-endpoint";


export class EAdWebApi implements IEventAdapter {
  private static _instance: EAdWebApi;
  config:CustomerAppEndpoint;

  constructor(config: CustomerAppEndpoint) {
    // this.name = config.name;
    // this.sourceName = config.sourceName;
    this.config = config;
    this.initialize();
  }
  public name: string="";
  // public sourceName: string;

  private _onNewEventsSubject = new Subject<OrderEvent[]>();
  public onNewEvents = this._onNewEventsSubject.asObservable();

  public promisses: { id: string, resolve: any }[] = [];
  private EventsSvc?: EventsService;
  private async initialize() {
    if (this.config.uri) {
      var config = new ApiConfiguration();
      config.rootUrl = this.config.uri;
      const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
      this.EventsSvc = new EventsService(config, httpClient);
    }
  }
  private async poolingLoopRoutine(requests:DtoEventsRequest[]) {
    try {
      var _self=this;
      if (this.EventsSvc) {
        // let _eventsArray = await this.EventsSvc.postApiEvents(requests).toPromise();
        const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
        var path = new DtoEndpoint(this.config);
        httpClient.post(path.fullPath(), requests).subscribe({
          next: (data:any) => {
              if (data) {
                  _self._onNewEventsSubject.next(data);
              } else {
              }
          }, error: (e) => {
          }
      });

       
      }
    } catch (error) {
      var a = error;
    }
  }
  public doPooling(requests:DtoEventsRequest[]): void {
    this.poolingLoopRoutine(requests);
  }

  public async changeStatus(orderId: string, code: string): Promise<boolean> {
    let ret = false;
    try {
      if (this.EventsSvc) {

        // switch (code) {
        //   case "confirm":
        //     await this.EventsSvc.postApiOrderV10IdConfirm(orderId).toPromise();
        //     ret = true;
        //     break;
        //   case "startPreparation":
        //     await this.EventsSvc.postApiOrderV10IdStartPreparation(orderId).toPromise();
        //     ret = true;
        //     break;
        //   case "readyToPickup":
        //     await this.EventsSvc.postApiOrderV10IdReadyToPickup(orderId).toPromise();
        //     ret = true;
        //     break;
        //   case "dispatch":
        //     await this.EventsSvc.postApiOrderV10IdDispatch(orderId).toPromise();
        //     ret = true;
        //     break;
        //   case "requestCancellation":
        //     await this.EventsSvc.postApiOrderV10IdRequestCancellation(orderId).toPromise();
        //     ret = true;
        //     break;
        //   case "acceptCancellation":
        //     await this.EventsSvc.postApiOrderV10IdAcceptCancellation(orderId).toPromise();
        //     ret = true;
        //     break;
        //   case "denyCancellation":
        //     await this.EventsSvc.postApiOrderV10IdDenyCancellation(orderId).toPromise();
        //     ret = true;
        //     break;

        //   default:
        //     break;
        // }
      }
    } catch (error) {

    }
    return ret;
  }

}
