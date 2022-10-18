/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class SysService extends __BaseService {
  static readonly getApiSysVerPath = '/api/Sys/ver';
  static readonly postApiSysUploadPath = '/api/Sys/upload';
  static readonly getApiSysDownloadMultiHashPath = '/api/Sys/download/{multiHash}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiSysVerResponse(): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Sys/ver`,
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
   * @return Success
   */
  getApiSysVer(): __Observable<string> {
    return this.getApiSysVerResponse().pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param params The `SysService.PostApiSysUploadParams` containing the following parameters:
   *
   * - `fullpath`:
   *
   * - `file`:
   *
   * @return Success
   */
  postApiSysUploadResponse(params: SysService.PostApiSysUploadParams): __Observable<__StrictHttpResponse<string>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;
    if (params.fullpath != null) __params = __params.set('fullpath', params.fullpath.toString());
    if (params.file != null) { __formData.append('file', params.file as string | Blob);}
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Sys/upload`,
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
   * @param params The `SysService.PostApiSysUploadParams` containing the following parameters:
   *
   * - `fullpath`:
   *
   * - `file`:
   *
   * @return Success
   */
  postApiSysUpload(params: SysService.PostApiSysUploadParams): __Observable<string> {
    return this.postApiSysUploadResponse(params).pipe(
      __map(_r => _r.body as string)
    );
  }

  /**
   * @param params The `SysService.GetApiSysDownloadMultiHashParams` containing the following parameters:
   *
   * - `multiHash`:
   *
   * - `inline`:
   *
   * - `filename`:
   */
  getApiSysDownloadMultiHashResponse(params: SysService.GetApiSysDownloadMultiHashParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.inline != null) __params = __params.set('inline', params.inline.toString());
    if (params.filename != null) __params = __params.set('filename', params.filename.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Sys/download/${encodeURIComponent(String(params.multiHash))}`,
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
   * @param params The `SysService.GetApiSysDownloadMultiHashParams` containing the following parameters:
   *
   * - `multiHash`:
   *
   * - `inline`:
   *
   * - `filename`:
   */
  getApiSysDownloadMultiHash(params: SysService.GetApiSysDownloadMultiHashParams): __Observable<null> {
    return this.getApiSysDownloadMultiHashResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module SysService {

  /**
   * Parameters for postApiSysUpload
   */
  export interface PostApiSysUploadParams {
    fullpath?: string;
    file?: Blob;
  }

  /**
   * Parameters for getApiSysDownloadMultiHash
   */
  export interface GetApiSysDownloadMultiHashParams {
    multiHash: string;
    inline?: boolean;
    filename?: string;
  }
}

export { SysService }
