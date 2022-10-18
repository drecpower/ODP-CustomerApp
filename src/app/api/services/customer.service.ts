/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Customer } from '../models/customer';
@Injectable({
  providedIn: 'root',
})
class CustomerService extends __BaseService {
  static readonly getApiCustomerPath = '/api/Customer';
  static readonly postApiCustomerPath = '/api/Customer';
  static readonly getApiCustomerIdPath = '/api/Customer/{id}';
  static readonly putApiCustomerIdPath = '/api/Customer/{id}';
  static readonly deleteApiCustomerIdPath = '/api/Customer/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiCustomerResponse(): __Observable<__StrictHttpResponse<Array<Customer>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Customer`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Customer>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiCustomer(): __Observable<Array<Customer>> {
    return this.getApiCustomerResponse().pipe(
      __map(_r => _r.body as Array<Customer>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiCustomerResponse(body?: Customer): __Observable<__StrictHttpResponse<Customer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Customer`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Customer>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiCustomer(body?: Customer): __Observable<Customer> {
    return this.postApiCustomerResponse(body).pipe(
      __map(_r => _r.body as Customer)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiCustomerIdResponse(id: string): __Observable<__StrictHttpResponse<Customer>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Customer/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Customer>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiCustomerId(id: string): __Observable<Customer> {
    return this.getApiCustomerIdResponse(id).pipe(
      __map(_r => _r.body as Customer)
    );
  }

  /**
   * @param params The `CustomerService.PutApiCustomerIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiCustomerIdResponse(params: CustomerService.PutApiCustomerIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Customer/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `CustomerService.PutApiCustomerIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiCustomerId(params: CustomerService.PutApiCustomerIdParams): __Observable<null> {
    return this.putApiCustomerIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiCustomerIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Customer/${encodeURIComponent(String(id))}`,
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
  deleteApiCustomerId(id: string): __Observable<null> {
    return this.deleteApiCustomerIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CustomerService {

  /**
   * Parameters for putApiCustomerId
   */
  export interface PutApiCustomerIdParams {
    id: string;
    body?: Customer;
  }
}

export { CustomerService }
