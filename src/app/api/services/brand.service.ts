/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DtoBrand } from '../models/dto-brand';
@Injectable({
  providedIn: 'root',
})
class BrandService extends __BaseService {
  static readonly getApiBrandIdPath = '/api/Brand/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiBrandIdResponse(id: string): __Observable<__StrictHttpResponse<DtoBrand>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Brand/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DtoBrand>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiBrandId(id: string): __Observable<DtoBrand> {
    return this.getApiBrandIdResponse(id).pipe(
      __map(_r => _r.body as DtoBrand)
    );
  }
}

module BrandService {
}

export { BrandService }
