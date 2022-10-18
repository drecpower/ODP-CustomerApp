/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OrderItemOption } from '../models/order-item-option';
@Injectable({
  providedIn: 'root',
})
class OrderItemOptionService extends __BaseService {
  static readonly getApiOrderItemOptionPath = '/api/OrderItemOption';
  static readonly postApiOrderItemOptionPath = '/api/OrderItemOption';
  static readonly getApiOrderItemOptionIdPath = '/api/OrderItemOption/{id}';
  static readonly putApiOrderItemOptionIdPath = '/api/OrderItemOption/{id}';
  static readonly deleteApiOrderItemOptionIdPath = '/api/OrderItemOption/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiOrderItemOptionResponse(): __Observable<__StrictHttpResponse<Array<OrderItemOption>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/OrderItemOption`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<OrderItemOption>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiOrderItemOption(): __Observable<Array<OrderItemOption>> {
    return this.getApiOrderItemOptionResponse().pipe(
      __map(_r => _r.body as Array<OrderItemOption>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiOrderItemOptionResponse(body?: OrderItemOption): __Observable<__StrictHttpResponse<OrderItemOption>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/OrderItemOption`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OrderItemOption>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiOrderItemOption(body?: OrderItemOption): __Observable<OrderItemOption> {
    return this.postApiOrderItemOptionResponse(body).pipe(
      __map(_r => _r.body as OrderItemOption)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiOrderItemOptionIdResponse(id: string): __Observable<__StrictHttpResponse<OrderItemOption>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/OrderItemOption/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OrderItemOption>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiOrderItemOptionId(id: string): __Observable<OrderItemOption> {
    return this.getApiOrderItemOptionIdResponse(id).pipe(
      __map(_r => _r.body as OrderItemOption)
    );
  }

  /**
   * @param params The `OrderItemOptionService.PutApiOrderItemOptionIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiOrderItemOptionIdResponse(params: OrderItemOptionService.PutApiOrderItemOptionIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/OrderItemOption/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `OrderItemOptionService.PutApiOrderItemOptionIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiOrderItemOptionId(params: OrderItemOptionService.PutApiOrderItemOptionIdParams): __Observable<null> {
    return this.putApiOrderItemOptionIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiOrderItemOptionIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/OrderItemOption/${encodeURIComponent(String(id))}`,
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
  deleteApiOrderItemOptionId(id: string): __Observable<null> {
    return this.deleteApiOrderItemOptionIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module OrderItemOptionService {

  /**
   * Parameters for putApiOrderItemOptionId
   */
  export interface PutApiOrderItemOptionIdParams {
    id: string;
    body?: OrderItemOption;
  }
}

export { OrderItemOptionService }
