/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Option } from '../models/option';
@Injectable({
  providedIn: 'root',
})
class OptionService extends __BaseService {
  static readonly getApiOptionPath = '/api/Option';
  static readonly postApiOptionPath = '/api/Option';
  static readonly getApiOptionIdPath = '/api/Option/{id}';
  static readonly putApiOptionIdPath = '/api/Option/{id}';
  static readonly deleteApiOptionIdPath = '/api/Option/{id}';
  static readonly putApiOptionStatusPath = '/api/Option/status';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiOptionResponse(): __Observable<__StrictHttpResponse<Array<Option>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Option`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Option>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiOption(): __Observable<Array<Option>> {
    return this.getApiOptionResponse().pipe(
      __map(_r => _r.body as Array<Option>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiOptionResponse(body?: Option): __Observable<__StrictHttpResponse<Option>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Option`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Option>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiOption(body?: Option): __Observable<Option> {
    return this.postApiOptionResponse(body).pipe(
      __map(_r => _r.body as Option)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiOptionIdResponse(id: string): __Observable<__StrictHttpResponse<Option>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Option/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Option>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiOptionId(id: string): __Observable<Option> {
    return this.getApiOptionIdResponse(id).pipe(
      __map(_r => _r.body as Option)
    );
  }

  /**
   * @param params The `OptionService.PutApiOptionIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiOptionIdResponse(params: OptionService.PutApiOptionIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Option/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `OptionService.PutApiOptionIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiOptionId(params: OptionService.PutApiOptionIdParams): __Observable<null> {
    return this.putApiOptionIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiOptionIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Option/${encodeURIComponent(String(id))}`,
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
  deleteApiOptionId(id: string): __Observable<null> {
    return this.deleteApiOptionIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `OptionService.PutApiOptionStatusParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `productId`:
   *
   * - `options`:
   */
  putApiOptionStatusResponse(params: OptionService.PutApiOptionStatusParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.status != null) __params = __params.set('status', params.status.toString());
    if (params.productId != null) __params = __params.set('productId', params.productId.toString());
    (params.options || []).forEach(val => {if (val != null) __params = __params.append('options', val.toString())});
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Option/status`,
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
   * @param params The `OptionService.PutApiOptionStatusParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `productId`:
   *
   * - `options`:
   */
  putApiOptionStatus(params: OptionService.PutApiOptionStatusParams): __Observable<null> {
    return this.putApiOptionStatusResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module OptionService {

  /**
   * Parameters for putApiOptionId
   */
  export interface PutApiOptionIdParams {
    id: string;
    body?: Option;
  }

  /**
   * Parameters for putApiOptionStatus
   */
  export interface PutApiOptionStatusParams {
    status?: string;
    productId?: string;
    options?: Array<string>;
  }
}

export { OptionService }
