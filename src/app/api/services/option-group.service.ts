/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OptionGroup } from '../models/option-group';
@Injectable({
  providedIn: 'root',
})
class OptionGroupService extends __BaseService {
  static readonly getApiOptionGroupPath = '/api/OptionGroup';
  static readonly postApiOptionGroupPath = '/api/OptionGroup';
  static readonly getApiOptionGroupIdPath = '/api/OptionGroup/{id}';
  static readonly putApiOptionGroupIdPath = '/api/OptionGroup/{id}';
  static readonly deleteApiOptionGroupIdPath = '/api/OptionGroup/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiOptionGroupResponse(): __Observable<__StrictHttpResponse<Array<OptionGroup>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/OptionGroup`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<OptionGroup>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiOptionGroup(): __Observable<Array<OptionGroup>> {
    return this.getApiOptionGroupResponse().pipe(
      __map(_r => _r.body as Array<OptionGroup>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiOptionGroupResponse(body?: OptionGroup): __Observable<__StrictHttpResponse<OptionGroup>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/OptionGroup`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OptionGroup>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiOptionGroup(body?: OptionGroup): __Observable<OptionGroup> {
    return this.postApiOptionGroupResponse(body).pipe(
      __map(_r => _r.body as OptionGroup)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiOptionGroupIdResponse(id: string): __Observable<__StrictHttpResponse<OptionGroup>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/OptionGroup/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<OptionGroup>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiOptionGroupId(id: string): __Observable<OptionGroup> {
    return this.getApiOptionGroupIdResponse(id).pipe(
      __map(_r => _r.body as OptionGroup)
    );
  }

  /**
   * @param params The `OptionGroupService.PutApiOptionGroupIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiOptionGroupIdResponse(params: OptionGroupService.PutApiOptionGroupIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/OptionGroup/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `OptionGroupService.PutApiOptionGroupIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiOptionGroupId(params: OptionGroupService.PutApiOptionGroupIdParams): __Observable<null> {
    return this.putApiOptionGroupIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiOptionGroupIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/OptionGroup/${encodeURIComponent(String(id))}`,
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
  deleteApiOptionGroupId(id: string): __Observable<null> {
    return this.deleteApiOptionGroupIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module OptionGroupService {

  /**
   * Parameters for putApiOptionGroupId
   */
  export interface PutApiOptionGroupIdParams {
    id: string;
    body?: OptionGroup;
  }
}

export { OptionGroupService }
