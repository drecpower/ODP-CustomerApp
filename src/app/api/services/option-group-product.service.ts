/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OptionGroupProduct } from '../models/option-group-product';
@Injectable({
  providedIn: 'root',
})
class OptionGroupProductService extends __BaseService {
  static readonly getApiOptionGroupProductPath = '/api/OptionGroupProduct';
  static readonly postApiOptionGroupProductPath = '/api/OptionGroupProduct';
  static readonly getApiOptionGroupProductIdPath = '/api/OptionGroupProduct/{id}';
  static readonly putApiOptionGroupProductIdPath = '/api/OptionGroupProduct/{id}';
  static readonly deleteApiOptionGroupProductIdPath = '/api/OptionGroupProduct/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiOptionGroupProductResponse(): __Observable<__StrictHttpResponse<Array<OptionGroupProduct>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/OptionGroupProduct`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<OptionGroupProduct>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiOptionGroupProduct(): __Observable<Array<OptionGroupProduct>> {
    return this.getApiOptionGroupProductResponse().pipe(
      __map(_r => _r.body as Array<OptionGroupProduct>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiOptionGroupProductResponse(body?: OptionGroupProduct): __Observable<__StrictHttpResponse<OptionGroupProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/OptionGroupProduct`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OptionGroupProduct>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiOptionGroupProduct(body?: OptionGroupProduct): __Observable<OptionGroupProduct> {
    return this.postApiOptionGroupProductResponse(body).pipe(
      __map(_r => _r.body as OptionGroupProduct)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiOptionGroupProductIdResponse(id: string): __Observable<__StrictHttpResponse<OptionGroupProduct>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/OptionGroupProduct/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OptionGroupProduct>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiOptionGroupProductId(id: string): __Observable<OptionGroupProduct> {
    return this.getApiOptionGroupProductIdResponse(id).pipe(
      __map(_r => _r.body as OptionGroupProduct)
    );
  }

  /**
   * @param params The `OptionGroupProductService.PutApiOptionGroupProductIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiOptionGroupProductIdResponse(params: OptionGroupProductService.PutApiOptionGroupProductIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/OptionGroupProduct/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `OptionGroupProductService.PutApiOptionGroupProductIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiOptionGroupProductId(params: OptionGroupProductService.PutApiOptionGroupProductIdParams): __Observable<null> {
    return this.putApiOptionGroupProductIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiOptionGroupProductIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/OptionGroupProduct/${encodeURIComponent(String(id))}`,
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
  deleteApiOptionGroupProductId(id: string): __Observable<null> {
    return this.deleteApiOptionGroupProductIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module OptionGroupProductService {

  /**
   * Parameters for putApiOptionGroupProductId
   */
  export interface PutApiOptionGroupProductIdParams {
    id: string;
    body?: OptionGroupProduct;
  }
}

export { OptionGroupProductService }
