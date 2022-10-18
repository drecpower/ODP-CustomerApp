/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DtoOauthResponse } from '../models/dto-oauth-response';
import { DtoOauthRequest } from '../models/dto-oauth-request';
@Injectable({
  providedIn: 'root',
})
class AuthenticationService extends __BaseService {
  static readonly postApiAuthenticationOauthTokenPath = '/api/Authentication/oauth/token';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiAuthenticationOauthTokenResponse(body?: DtoOauthRequest): __Observable<__StrictHttpResponse<DtoOauthResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Authentication/oauth/token`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DtoOauthResponse>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiAuthenticationOauthToken(body?: DtoOauthRequest): __Observable<DtoOauthResponse> {
    return this.postApiAuthenticationOauthTokenResponse(body).pipe(
      __map(_r => _r.body as DtoOauthResponse)
    );
  }
}

module AuthenticationService {
}

export { AuthenticationService }
