/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Address } from '../models/address';
@Injectable({
  providedIn: 'root',
})
class AddressService extends __BaseService {
  static readonly getApiAddressPath = '/api/Address';
  static readonly postApiAddressPath = '/api/Address';
  static readonly getApiAddressIdPath = '/api/Address/{id}';
  static readonly putApiAddressIdPath = '/api/Address/{id}';
  static readonly deleteApiAddressIdPath = '/api/Address/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiAddressResponse(): __Observable<__StrictHttpResponse<Array<Address>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Address`,
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
  getApiAddress(): __Observable<Array<Address>> {
    return this.getApiAddressResponse().pipe(
      __map(_r => _r.body as Array<Address>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiAddressResponse(body?: Address): __Observable<__StrictHttpResponse<Address>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Address`,
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
   * @param body undefined
   * @return Success
   */
  postApiAddress(body?: Address): __Observable<Address> {
    return this.postApiAddressResponse(body).pipe(
      __map(_r => _r.body as Address)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiAddressIdResponse(id: string): __Observable<__StrictHttpResponse<Address>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Address/${encodeURIComponent(String(id))}`,
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
  getApiAddressId(id: string): __Observable<Address> {
    return this.getApiAddressIdResponse(id).pipe(
      __map(_r => _r.body as Address)
    );
  }

  /**
   * @param params The `AddressService.PutApiAddressIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiAddressIdResponse(params: AddressService.PutApiAddressIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Address/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `AddressService.PutApiAddressIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiAddressId(params: AddressService.PutApiAddressIdParams): __Observable<null> {
    return this.putApiAddressIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiAddressIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Address/${encodeURIComponent(String(id))}`,
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
  deleteApiAddressId(id: string): __Observable<null> {
    return this.deleteApiAddressIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module AddressService {

  /**
   * Parameters for putApiAddressId
   */
  export interface PutApiAddressIdParams {
    id: string;
    body?: Address;
  }
}

export { AddressService }
