/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OrderEvent } from '../models/order-event';
@Injectable({
  providedIn: 'root',
})
class OrderEventService extends __BaseService {
  static readonly getApiOrderEventPath = '/api/OrderEvent';
  static readonly getApiOrderEventIdPath = '/api/OrderEvent/{id}';
  static readonly putApiOrderEventIdPath = '/api/OrderEvent/{id}';
  static readonly deleteApiOrderEventIdPath = '/api/OrderEvent/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiOrderEventResponse(): __Observable<__StrictHttpResponse<Array<OrderEvent>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/OrderEvent`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<OrderEvent>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiOrderEvent(): __Observable<Array<OrderEvent>> {
    return this.getApiOrderEventResponse().pipe(
      __map(_r => _r.body as Array<OrderEvent>)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiOrderEventIdResponse(id: string): __Observable<__StrictHttpResponse<OrderEvent>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/OrderEvent/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OrderEvent>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiOrderEventId(id: string): __Observable<OrderEvent> {
    return this.getApiOrderEventIdResponse(id).pipe(
      __map(_r => _r.body as OrderEvent)
    );
  }

  /**
   * @param params The `OrderEventService.PutApiOrderEventIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiOrderEventIdResponse(params: OrderEventService.PutApiOrderEventIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/OrderEvent/${encodeURIComponent(String(params.id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param params The `OrderEventService.PutApiOrderEventIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiOrderEventId(params: OrderEventService.PutApiOrderEventIdParams): __Observable<null> {
    return this.putApiOrderEventIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiOrderEventIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/OrderEvent/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id undefined
   */
  deleteApiOrderEventId(id: string): __Observable<null> {
    return this.deleteApiOrderEventIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module OrderEventService {

  /**
   * Parameters for putApiOrderEventId
   */
  export interface PutApiOrderEventIdParams {
    id: string;
    body?: OrderEvent;
  }
}

export { OrderEventService }
