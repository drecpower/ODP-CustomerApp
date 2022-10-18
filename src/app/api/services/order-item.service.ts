/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OrderItem } from '../models/order-item';
@Injectable({
  providedIn: 'root',
})
class OrderItemService extends __BaseService {
  static readonly getApiOrderItemPath = '/api/OrderItem';
  static readonly postApiOrderItemPath = '/api/OrderItem';
  static readonly getApiOrderItemIdPath = '/api/OrderItem/{id}';
  static readonly putApiOrderItemIdPath = '/api/OrderItem/{id}';
  static readonly deleteApiOrderItemIdPath = '/api/OrderItem/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiOrderItemResponse(): __Observable<__StrictHttpResponse<Array<OrderItem>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/OrderItem`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<OrderItem>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiOrderItem(): __Observable<Array<OrderItem>> {
    return this.getApiOrderItemResponse().pipe(
      __map(_r => _r.body as Array<OrderItem>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiOrderItemResponse(body?: OrderItem): __Observable<__StrictHttpResponse<OrderItem>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/OrderItem`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OrderItem>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiOrderItem(body?: OrderItem): __Observable<OrderItem> {
    return this.postApiOrderItemResponse(body).pipe(
      __map(_r => _r.body as OrderItem)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiOrderItemIdResponse(id: string): __Observable<__StrictHttpResponse<OrderItem>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/OrderItem/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OrderItem>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiOrderItemId(id: string): __Observable<OrderItem> {
    return this.getApiOrderItemIdResponse(id).pipe(
      __map(_r => _r.body as OrderItem)
    );
  }

  /**
   * @param params The `OrderItemService.PutApiOrderItemIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiOrderItemIdResponse(params: OrderItemService.PutApiOrderItemIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/OrderItem/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `OrderItemService.PutApiOrderItemIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiOrderItemId(params: OrderItemService.PutApiOrderItemIdParams): __Observable<null> {
    return this.putApiOrderItemIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiOrderItemIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/OrderItem/${encodeURIComponent(String(id))}`,
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
  deleteApiOrderItemId(id: string): __Observable<null> {
    return this.deleteApiOrderItemIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module OrderItemService {

  /**
   * Parameters for putApiOrderItemId
   */
  export interface PutApiOrderItemIdParams {
    id: string;
    body?: OrderItem;
  }
}

export { OrderItemService }
