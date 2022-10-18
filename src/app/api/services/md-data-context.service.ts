/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { JToken } from '../models/jtoken';
@Injectable({
  providedIn: 'root',
})
class MdDataContextService extends __BaseService {
  static readonly postApiMddViewdataFileNamePath = '/api/mdd/viewdata/{fileName}';
  static readonly getApiMddDataEntityNamePath = '/api/mdd/data/{entityName}';
  static readonly deleteApiMddDataEntityNameIdPath = '/api/mdd/data/{entityName}/{id}';
  static readonly postApiMddDataEntityNamePath = '/api/mdd/data/{EntityName}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param fileName undefined
   */
  postApiMddViewdataFileNameResponse(fileName: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/mdd/viewdata/${encodeURIComponent(String(fileName))}`,
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
   * @param fileName undefined
   */
  postApiMddViewdataFileName(fileName: string): __Observable<null> {
    return this.postApiMddViewdataFileNameResponse(fileName).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param entityName undefined
   */
  getApiMddDataEntityNameResponse(entityName: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/mdd/data/${encodeURIComponent(String(entityName))}`,
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
   * @param entityName undefined
   */
  getApiMddDataEntityName(entityName: string): __Observable<null> {
    return this.getApiMddDataEntityNameResponse(entityName).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MdDataContextService.DeleteApiMddDataEntityNameIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `entityName`:
   */
  deleteApiMddDataEntityNameIdResponse(params: MdDataContextService.DeleteApiMddDataEntityNameIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/mdd/data/${encodeURIComponent(String(params.entityName))}/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `MdDataContextService.DeleteApiMddDataEntityNameIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `entityName`:
   */
  deleteApiMddDataEntityNameId(params: MdDataContextService.DeleteApiMddDataEntityNameIdParams): __Observable<null> {
    return this.deleteApiMddDataEntityNameIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param params The `MdDataContextService.PostApiMddDataEntityNameParams` containing the following parameters:
   *
   * - `EntityName`:
   *
   * - `body`:
   */
  postApiMddDataEntityNameResponse(params: MdDataContextService.PostApiMddDataEntityNameParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/mdd/data/${encodeURIComponent(String(params.EntityName))}`,
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
   * @param params The `MdDataContextService.PostApiMddDataEntityNameParams` containing the following parameters:
   *
   * - `EntityName`:
   *
   * - `body`:
   */
  postApiMddDataEntityName(params: MdDataContextService.PostApiMddDataEntityNameParams): __Observable<null> {
    return this.postApiMddDataEntityNameResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module MdDataContextService {

  /**
   * Parameters for deleteApiMddDataEntityNameId
   */
  export interface DeleteApiMddDataEntityNameIdParams {
    id: number;
    entityName: string;
  }

  /**
   * Parameters for postApiMddDataEntityName
   */
  export interface PostApiMddDataEntityNameParams {
    EntityName: string;
    body?: JToken;
  }
}

export { MdDataContextService }
