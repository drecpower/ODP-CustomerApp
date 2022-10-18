/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Merchant } from '../models/merchant';
@Injectable({
  providedIn: 'root',
})
class MerchantService extends __BaseService {
  static readonly getApiMerchantPath = '/api/Merchant';
  static readonly postApiMerchantPath = '/api/Merchant';
  static readonly getApiMerchantIdPath = '/api/Merchant/{id}';
  static readonly putApiMerchantIdPath = '/api/Merchant/{id}';
  static readonly deleteApiMerchantIdPath = '/api/Merchant/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiMerchantResponse(): __Observable<__StrictHttpResponse<Array<Merchant>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Merchant`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Merchant>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiMerchant(): __Observable<Array<Merchant>> {
    return this.getApiMerchantResponse().pipe(
      __map(_r => _r.body as Array<Merchant>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiMerchantResponse(body?: Merchant): __Observable<__StrictHttpResponse<Merchant>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Merchant`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Merchant>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiMerchant(body?: Merchant): __Observable<Merchant> {
    return this.postApiMerchantResponse(body).pipe(
      __map(_r => _r.body as Merchant)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiMerchantIdResponse(id: string): __Observable<__StrictHttpResponse<Merchant>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Merchant/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Merchant>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiMerchantId(id: string): __Observable<Merchant> {
    return this.getApiMerchantIdResponse(id).pipe(
      __map(_r => _r.body as Merchant)
    );
  }

  /**
   * @param params The `MerchantService.PutApiMerchantIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiMerchantIdResponse(params: MerchantService.PutApiMerchantIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Merchant/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `MerchantService.PutApiMerchantIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiMerchantId(params: MerchantService.PutApiMerchantIdParams): __Observable<null> {
    return this.putApiMerchantIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiMerchantIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Merchant/${encodeURIComponent(String(id))}`,
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
  deleteApiMerchantId(id: string): __Observable<null> {
    return this.deleteApiMerchantIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module MerchantService {

  /**
   * Parameters for putApiMerchantId
   */
  export interface PutApiMerchantIdParams {
    id: string;
    body?: Merchant;
  }
}

export { MerchantService }
