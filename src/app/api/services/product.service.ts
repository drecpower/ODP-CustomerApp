/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Product } from '../models/product';
import { DtoProductSharing } from '../models/dto-product-sharing';
@Injectable({
  providedIn: 'root',
})
class ProductService extends __BaseService {
  static readonly getApiProductPath = '/api/Product';
  static readonly postApiProductPath = '/api/Product';
  static readonly getApiProductIdPath = '/api/Product/{id}';
  static readonly putApiProductIdPath = '/api/Product/{id}';
  static readonly deleteApiProductIdPath = '/api/Product/{id}';
  static readonly getApiProductIdSharingCountPath = '/api/Product/{id}/sharingCount';
  static readonly getApiProductMerchantGroupMerchantGroupIdPath = '/api/Product/merchantGroup/{merchantGroupId}';
  static readonly putApiProductIdStatusPath = '/api/Product/{id}/status';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiProductResponse(): __Observable<__StrictHttpResponse<Array<Product>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Product`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Product>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiProduct(): __Observable<Array<Product>> {
    return this.getApiProductResponse().pipe(
      __map(_r => _r.body as Array<Product>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiProductResponse(body?: Product): __Observable<__StrictHttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Product`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Product>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiProduct(body?: Product): __Observable<Product> {
    return this.postApiProductResponse(body).pipe(
      __map(_r => _r.body as Product)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiProductIdResponse(id: string): __Observable<__StrictHttpResponse<Product>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Product/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Product>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiProductId(id: string): __Observable<Product> {
    return this.getApiProductIdResponse(id).pipe(
      __map(_r => _r.body as Product)
    );
  }

  /**
   * @param params The `ProductService.PutApiProductIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiProductIdResponse(params: ProductService.PutApiProductIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Product/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `ProductService.PutApiProductIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiProductId(params: ProductService.PutApiProductIdParams): __Observable<null> {
    return this.putApiProductIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiProductIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Product/${encodeURIComponent(String(id))}`,
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
  deleteApiProductId(id: string): __Observable<null> {
    return this.deleteApiProductIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiProductIdSharingCountResponse(id: string): __Observable<__StrictHttpResponse<DtoProductSharing>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Product/${encodeURIComponent(String(id))}/sharingCount`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DtoProductSharing>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiProductIdSharingCount(id: string): __Observable<DtoProductSharing> {
    return this.getApiProductIdSharingCountResponse(id).pipe(
      __map(_r => _r.body as DtoProductSharing)
    );
  }

  /**
   * @param merchantGroupId undefined
   * @return Success
   */
  getApiProductMerchantGroupMerchantGroupIdResponse(merchantGroupId: string): __Observable<__StrictHttpResponse<Array<Product>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Product/merchantGroup/${encodeURIComponent(String(merchantGroupId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Product>>;
      })
    );
  }
  /**
   * @param merchantGroupId undefined
   * @return Success
   */
  getApiProductMerchantGroupMerchantGroupId(merchantGroupId: string): __Observable<Array<Product>> {
    return this.getApiProductMerchantGroupMerchantGroupIdResponse(merchantGroupId).pipe(
      __map(_r => _r.body as Array<Product>)
    );
  }

  /**
   * @param params The `ProductService.PutApiProductIdStatusParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `status`:
   *
   * - `resources`:
   */
  putApiProductIdStatusResponse(params: ProductService.PutApiProductIdStatusParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.status != null) __params = __params.set('status', params.status.toString());
    (params.resources || []).forEach(val => {if (val != null) __params = __params.append('resources', val.toString())});
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Product/${encodeURIComponent(String(params.id))}/status`,
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
   * @param params The `ProductService.PutApiProductIdStatusParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `status`:
   *
   * - `resources`:
   */
  putApiProductIdStatus(params: ProductService.PutApiProductIdStatusParams): __Observable<null> {
    return this.putApiProductIdStatusResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ProductService {

  /**
   * Parameters for putApiProductId
   */
  export interface PutApiProductIdParams {
    id: string;
    body?: Product;
  }

  /**
   * Parameters for putApiProductIdStatus
   */
  export interface PutApiProductIdStatusParams {
    id: string;
    status?: string;
    resources?: Array<string>;
  }
}

export { ProductService }
