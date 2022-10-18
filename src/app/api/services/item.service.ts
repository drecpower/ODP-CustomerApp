/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Item } from '../models/item';
@Injectable({
  providedIn: 'root',
})
class ItemService extends __BaseService {
  static readonly getApiItemPath = '/api/Item';
  static readonly postApiItemPath = '/api/Item';
  static readonly getApiItemIdPath = '/api/Item/{id}';
  static readonly putApiItemIdPath = '/api/Item/{id}';
  static readonly deleteApiItemIdPath = '/api/Item/{id}';
  static readonly getApiItemCategoryCategoryIdPath = '/api/Item/category/{categoryId}';
  static readonly putApiItemStatusPath = '/api/Item/status';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiItemResponse(): __Observable<__StrictHttpResponse<Array<Item>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Item`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Item>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiItem(): __Observable<Array<Item>> {
    return this.getApiItemResponse().pipe(
      __map(_r => _r.body as Array<Item>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiItemResponse(body?: Item): __Observable<__StrictHttpResponse<Item>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Item`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Item>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiItem(body?: Item): __Observable<Item> {
    return this.postApiItemResponse(body).pipe(
      __map(_r => _r.body as Item)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiItemIdResponse(id: string): __Observable<__StrictHttpResponse<Item>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Item/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Item>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiItemId(id: string): __Observable<Item> {
    return this.getApiItemIdResponse(id).pipe(
      __map(_r => _r.body as Item)
    );
  }

  /**
   * @param params The `ItemService.PutApiItemIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiItemIdResponse(params: ItemService.PutApiItemIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Item/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `ItemService.PutApiItemIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiItemId(params: ItemService.PutApiItemIdParams): __Observable<null> {
    return this.putApiItemIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiItemIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Item/${encodeURIComponent(String(id))}`,
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
  deleteApiItemId(id: string): __Observable<null> {
    return this.deleteApiItemIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param categoryId undefined
   * @return Success
   */
  getApiItemCategoryCategoryIdResponse(categoryId: string): __Observable<__StrictHttpResponse<Array<Item>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Item/category/${encodeURIComponent(String(categoryId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Item>>;
      })
    );
  }
  /**
   * @param categoryId undefined
   * @return Success
   */
  getApiItemCategoryCategoryId(categoryId: string): __Observable<Array<Item>> {
    return this.getApiItemCategoryCategoryIdResponse(categoryId).pipe(
      __map(_r => _r.body as Array<Item>)
    );
  }

  /**
   * @param params The `ItemService.PutApiItemStatusParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `productId`:
   *
   * - `items`:
   */
  putApiItemStatusResponse(params: ItemService.PutApiItemStatusParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.status != null) __params = __params.set('status', params.status.toString());
    if (params.productId != null) __params = __params.set('productId', params.productId.toString());
    (params.items || []).forEach(val => {if (val != null) __params = __params.append('items', val.toString())});
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Item/status`,
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
   * @param params The `ItemService.PutApiItemStatusParams` containing the following parameters:
   *
   * - `status`:
   *
   * - `productId`:
   *
   * - `items`:
   */
  putApiItemStatus(params: ItemService.PutApiItemStatusParams): __Observable<null> {
    return this.putApiItemStatusResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ItemService {

  /**
   * Parameters for putApiItemId
   */
  export interface PutApiItemIdParams {
    id: string;
    body?: Item;
  }

  /**
   * Parameters for putApiItemStatus
   */
  export interface PutApiItemStatusParams {
    status?: string;
    productId?: string;
    items?: Array<string>;
  }
}

export { ItemService }
