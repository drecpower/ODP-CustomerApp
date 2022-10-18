/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Address } from '../models/address';
import { DtoUaauSearchHomeResponse } from '../models/dto-uaau-search-home-response';
import { DtoUaauSearchHomeRequest } from '../models/dto-uaau-search-home-request';
@Injectable({
  providedIn: 'root',
})
class SearchService extends __BaseService {
  static readonly getApiSearchPath = '/api/Search';
  static readonly postApiSearchHomePath = '/api/Search/Home';
  static readonly getApiSearchIdPath = '/api/Search/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiSearchResponse(): __Observable<__StrictHttpResponse<Array<Address>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Search`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Address>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiSearch(): __Observable<Array<Address>> {
    return this.getApiSearchResponse().pipe(
      __map(_r => _r.body as Array<Address>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiSearchHomeResponse(body?: DtoUaauSearchHomeRequest): __Observable<__StrictHttpResponse<DtoUaauSearchHomeResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Search/Home`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DtoUaauSearchHomeResponse>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiSearchHome(body?: DtoUaauSearchHomeRequest): __Observable<DtoUaauSearchHomeResponse> {
    return this.postApiSearchHomeResponse(body).pipe(
      __map(_r => _r.body as DtoUaauSearchHomeResponse)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiSearchIdResponse(id: string): __Observable<__StrictHttpResponse<Address>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Search/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Address>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiSearchId(id: string): __Observable<Address> {
    return this.getApiSearchIdResponse(id).pipe(
      __map(_r => _r.body as Address)
    );
  }
}

module SearchService {
}

export { SearchService }
