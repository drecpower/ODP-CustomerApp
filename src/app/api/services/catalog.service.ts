/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Catalog } from '../models/catalog';
@Injectable({
  providedIn: 'root',
})
class CatalogService extends __BaseService {
  static readonly getApiCatalogMerchantMerchantIdPath = '/api/Catalog/merchant/{merchantId}';
  static readonly getApiCatalogIdPath = '/api/Catalog/{id}';
  static readonly putApiCatalogIdPath = '/api/Catalog/{id}';
  static readonly deleteApiCatalogIdPath = '/api/Catalog/{id}';
  static readonly postApiCatalogPath = '/api/Catalog';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param merchantId undefined
   * @return Success
   */
  getApiCatalogMerchantMerchantIdResponse(merchantId: string): __Observable<__StrictHttpResponse<Array<Catalog>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Catalog/merchant/${encodeURIComponent(String(merchantId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Catalog>>;
      })
    );
  }
  /**
   * @param merchantId undefined
   * @return Success
   */
  getApiCatalogMerchantMerchantId(merchantId: string): __Observable<Array<Catalog>> {
    return this.getApiCatalogMerchantMerchantIdResponse(merchantId).pipe(
      __map(_r => _r.body as Array<Catalog>)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiCatalogIdResponse(id: string): __Observable<__StrictHttpResponse<Catalog>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Catalog/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Catalog>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiCatalogId(id: string): __Observable<Catalog> {
    return this.getApiCatalogIdResponse(id).pipe(
      __map(_r => _r.body as Catalog)
    );
  }

  /**
   * @param params The `CatalogService.PutApiCatalogIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiCatalogIdResponse(params: CatalogService.PutApiCatalogIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Catalog/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `CatalogService.PutApiCatalogIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiCatalogId(params: CatalogService.PutApiCatalogIdParams): __Observable<null> {
    return this.putApiCatalogIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiCatalogIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Catalog/${encodeURIComponent(String(id))}`,
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
  deleteApiCatalogId(id: string): __Observable<null> {
    return this.deleteApiCatalogIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiCatalogResponse(body?: Catalog): __Observable<__StrictHttpResponse<Catalog>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Catalog`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Catalog>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiCatalog(body?: Catalog): __Observable<Catalog> {
    return this.postApiCatalogResponse(body).pipe(
      __map(_r => _r.body as Catalog)
    );
  }
}

module CatalogService {

  /**
   * Parameters for putApiCatalogId
   */
  export interface PutApiCatalogIdParams {
    id: string;
    body?: Catalog;
  }
}

export { CatalogService }
