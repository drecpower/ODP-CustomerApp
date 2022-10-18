/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { HashData } from '../models/hash-data';
@Injectable({
  providedIn: 'root',
})
class HashDataService extends __BaseService {
  static readonly getApiHashDataPath = '/api/HashData';
  static readonly postApiHashDataPath = '/api/HashData';
  static readonly getApiHashDataIdPath = '/api/HashData/{id}';
  static readonly putApiHashDataIdPath = '/api/HashData/{id}';
  static readonly deleteApiHashDataIdPath = '/api/HashData/{id}';
  static readonly getApiHashDataMerchantGroupIdPath = '/api/HashData/merchantGroup/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiHashDataResponse(): __Observable<__StrictHttpResponse<Array<HashData>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/HashData`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<HashData>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiHashData(): __Observable<Array<HashData>> {
    return this.getApiHashDataResponse().pipe(
      __map(_r => _r.body as Array<HashData>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiHashDataResponse(body?: HashData): __Observable<__StrictHttpResponse<HashData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/HashData`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<HashData>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiHashData(body?: HashData): __Observable<HashData> {
    return this.postApiHashDataResponse(body).pipe(
      __map(_r => _r.body as HashData)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiHashDataIdResponse(id: string): __Observable<__StrictHttpResponse<HashData>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/HashData/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<HashData>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiHashDataId(id: string): __Observable<HashData> {
    return this.getApiHashDataIdResponse(id).pipe(
      __map(_r => _r.body as HashData)
    );
  }

  /**
   * @param params The `HashDataService.PutApiHashDataIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiHashDataIdResponse(params: HashDataService.PutApiHashDataIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/HashData/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `HashDataService.PutApiHashDataIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiHashDataId(params: HashDataService.PutApiHashDataIdParams): __Observable<null> {
    return this.putApiHashDataIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiHashDataIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/HashData/${encodeURIComponent(String(id))}`,
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
  deleteApiHashDataId(id: string): __Observable<null> {
    return this.deleteApiHashDataIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiHashDataMerchantGroupIdResponse(id: string): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/HashData/merchantGroup/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'text'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<string>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiHashDataMerchantGroupId(id: string): __Observable<string> {
    return this.getApiHashDataMerchantGroupIdResponse(id).pipe(
      __map(_r => _r.body as string)
    );
  }
}

module HashDataService {

  /**
   * Parameters for putApiHashDataId
   */
  export interface PutApiHashDataIdParams {
    id: string;
    body?: HashData;
  }
}

export { HashDataService }
