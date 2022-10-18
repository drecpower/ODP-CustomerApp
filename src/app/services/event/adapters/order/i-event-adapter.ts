import { Observable } from "rxjs";
import { CustomerAppEndpoint, DtoEvent, DtoEventsRequest, DtoOrderDetails, OrderEvent } from "src/app/api/models";
import { DtoEndpoint } from "src/app/dto/dto-endpoint";

/* tslint:disable */
export interface IEventAdapter {
    name:string;
    config:CustomerAppEndpoint;
    onNewEvents:Observable<OrderEvent[]>;
    doPooling(requests:DtoEventsRequest[]):void;
    changeStatus(id:string,code:string):Promise<boolean>;
  }