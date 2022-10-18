/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Category } from '../models/category';
@Injectable({
  providedIn: 'root',
})
class CategoryService extends __BaseService {
  static readonly getApiCategoryCatalogCatalogIdPath = '/api/Category/catalog/{catalogId}';
  static readonly getApiCategoryIdPath = '/api/Category/{id}';
  static readonly putApiCategoryIdPath = '/api/Category/{id}';
  static readonly deleteApiCategoryIdPath = '/api/Category/{id}';
  static readonly postApiCategoryPath = '/api/Category';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param catalogId undefined
   * @return Success
   */
  getApiCategoryCatalogCatalogIdResponse(catalogId: string): __Observable<__StrictHttpResponse<Array<Category>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Category/catalog/${encodeURIComponent(String(catalogId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Category>>;
      })
    );
  }
  /**
   * @param catalogId undefined
   * @return Success
   */
  getApiCategoryCatalogCatalogId(catalogId: string): __Observable<Array<Category>> {
    return this.getApiCategoryCatalogCatalogIdResponse(catalogId).pipe(
      __map(_r => _r.body as Array<Category>)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiCategoryIdResponse(id: string): __Observable<__StrictHttpResponse<Category>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Category/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Category>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiCategoryId(id: string): __Observable<Category> {
    return this.getApiCategoryIdResponse(id).pipe(
      __map(_r => _r.body as Category)
    );
  }

  /**
   * @param params The `CategoryService.PutApiCategoryIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiCategoryIdResponse(params: CategoryService.PutApiCategoryIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Category/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `CategoryService.PutApiCategoryIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiCategoryId(params: CategoryService.PutApiCategoryIdParams): __Observable<null> {
    return this.putApiCategoryIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiCategoryIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Category/${encodeURIComponent(String(id))}`,
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
  deleteApiCategoryId(id: string): __Observable<null> {
    return this.deleteApiCategoryIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiCategoryResponse(body?: Category): __Observable<__StrictHttpResponse<Category>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Category`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Category>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiCategory(body?: Category): __Observable<Category> {
    return this.postApiCategoryResponse(body).pipe(
      __map(_r => _r.body as Category)
    );
  }
}

module CategoryService {

  /**
   * Parameters for putApiCategoryId
   */
  export interface PutApiCategoryIdParams {
    id: string;
    body?: Category;
  }
}

export { CategoryService }
