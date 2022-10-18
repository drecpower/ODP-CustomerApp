/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { MerchantGroup } from '../models/merchant-group';
@Injectable({
  providedIn: 'root',
})
class MerchantGroupService extends __BaseService {
  static readonly getApiMerchantGroupPath = '/api/MerchantGroup';
  static readonly postApiMerchantGroupPath = '/api/MerchantGroup';
  static readonly getApiMerchantGroupIdPath = '/api/MerchantGroup/{id}';
  static readonly putApiMerchantGroupIdPath = '/api/MerchantGroup/{id}';
  static readonly deleteApiMerchantGroupIdPath = '/api/MerchantGroup/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `MerchantGroupService.GetApiMerchantGroupParams` containing the following parameters:
   *
   * - `pesq`:
   *
   * - `parentId`:
   *
   * @return Success
   */
  getApiMerchantGroupResponse(params: MerchantGroupService.GetApiMerchantGroupParams): __Observable<__StrictHttpResponse<Array<MerchantGroup>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.pesq != null) __params = __params.set('pesq', params.pesq.toString());
    if (params.parentId != null) __params = __params.set('parentId', params.parentId.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/MerchantGroup`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<MerchantGroup>>;
      })
    );
  }
  /**
   * @param params The `MerchantGroupService.GetApiMerchantGroupParams` containing the following parameters:
   *
   * - `pesq`:
   *
   * - `parentId`:
   *
   * @return Success
   */
  getApiMerchantGroup(params: MerchantGroupService.GetApiMerchantGroupParams): __Observable<Array<MerchantGroup>> {
    return this.getApiMerchantGroupResponse(params).pipe(
      __map(_r => _r.body as Array<MerchantGroup>)
    );
  }

  /**
   * @param body undefined
   */
  postApiMerchantGroupResponse(body?: MerchantGroup): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/MerchantGroup`,
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
   * @param body undefined
   */
  postApiMerchantGroup(body?: MerchantGroup): __Observable<null> {
    return this.postApiMerchantGroupResponse(body).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  getApiMerchantGroupIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/MerchantGroup/${encodeURIComponent(String(id))}`,
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
  getApiMerchantGroupId(id: string): __Observable<null> {
    return this.getApiMerchantGroupIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MerchantGroupService.PutApiMerchantGroupIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiMerchantGroupIdResponse(params: MerchantGroupService.PutApiMerchantGroupIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/MerchantGroup/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `MerchantGroupService.PutApiMerchantGroupIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiMerchantGroupId(params: MerchantGroupService.PutApiMerchantGroupIdParams): __Observable<null> {
    return this.putApiMerchantGroupIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiMerchantGroupIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/MerchantGroup/${encodeURIComponent(String(id))}`,
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
  deleteApiMerchantGroupId(id: string): __Observable<null> {
    return this.deleteApiMerchantGroupIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module MerchantGroupService {

  /**
   * Parameters for getApiMerchantGroup
   */
  export interface GetApiMerchantGroupParams {
    pesq?: string;
    parentId?: string;
  }

  /**
   * Parameters for putApiMerchantGroupId
   */
  export interface PutApiMerchantGroupIdParams {
    id: string;
    body?: MerchantGroup;
  }
}

export { MerchantGroupService }
