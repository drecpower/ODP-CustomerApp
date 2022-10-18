/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { CustomerAppEndpoint } from '../models/customer-app-endpoint';
@Injectable({
  providedIn: 'root',
})
class CustomerAppEndpointService extends __BaseService {
  static readonly getApiCustomerAppEndpointPath = '/api/CustomerAppEndpoint';
  static readonly postApiCustomerAppEndpointPath = '/api/CustomerAppEndpoint';
  static readonly getApiCustomerAppEndpointMerchantMerchantIdPath = '/api/CustomerAppEndpoint/merchant/{merchantId}';
  static readonly getApiCustomerAppEndpointIdPath = '/api/CustomerAppEndpoint/{id}';
  static readonly putApiCustomerAppEndpointIdPath = '/api/CustomerAppEndpoint/{id}';
  static readonly deleteApiCustomerAppEndpointIdPath = '/api/CustomerAppEndpoint/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiCustomerAppEndpointResponse(): __Observable<__StrictHttpResponse<Array<CustomerAppEndpoint>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/CustomerAppEndpoint`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CustomerAppEndpoint>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiCustomerAppEndpoint(): __Observable<Array<CustomerAppEndpoint>> {
    return this.getApiCustomerAppEndpointResponse().pipe(
      __map(_r => _r.body as Array<CustomerAppEndpoint>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiCustomerAppEndpointResponse(body?: CustomerAppEndpoint): __Observable<__StrictHttpResponse<CustomerAppEndpoint>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/CustomerAppEndpoint`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CustomerAppEndpoint>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiCustomerAppEndpoint(body?: CustomerAppEndpoint): __Observable<CustomerAppEndpoint> {
    return this.postApiCustomerAppEndpointResponse(body).pipe(
      __map(_r => _r.body as CustomerAppEndpoint)
    );
  }

  /**
   * @param merchantId undefined
   * @return Success
   */
  getApiCustomerAppEndpointMerchantMerchantIdResponse(merchantId: string): __Observable<__StrictHttpResponse<Array<CustomerAppEndpoint>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/CustomerAppEndpoint/merchant/${encodeURIComponent(String(merchantId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<CustomerAppEndpoint>>;
      })
    );
  }
  /**
   * @param merchantId undefined
   * @return Success
   */
  getApiCustomerAppEndpointMerchantMerchantId(merchantId: string): __Observable<Array<CustomerAppEndpoint>> {
    return this.getApiCustomerAppEndpointMerchantMerchantIdResponse(merchantId).pipe(
      __map(_r => _r.body as Array<CustomerAppEndpoint>)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiCustomerAppEndpointIdResponse(id: string): __Observable<__StrictHttpResponse<CustomerAppEndpoint>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/CustomerAppEndpoint/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<CustomerAppEndpoint>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiCustomerAppEndpointId(id: string): __Observable<CustomerAppEndpoint> {
    return this.getApiCustomerAppEndpointIdResponse(id).pipe(
      __map(_r => _r.body as CustomerAppEndpoint)
    );
  }

  /**
   * @param params The `CustomerAppEndpointService.PutApiCustomerAppEndpointIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiCustomerAppEndpointIdResponse(params: CustomerAppEndpointService.PutApiCustomerAppEndpointIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/CustomerAppEndpoint/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `CustomerAppEndpointService.PutApiCustomerAppEndpointIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiCustomerAppEndpointId(params: CustomerAppEndpointService.PutApiCustomerAppEndpointIdParams): __Observable<null> {
    return this.putApiCustomerAppEndpointIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiCustomerAppEndpointIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/CustomerAppEndpoint/${encodeURIComponent(String(id))}`,
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
  deleteApiCustomerAppEndpointId(id: string): __Observable<null> {
    return this.deleteApiCustomerAppEndpointIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CustomerAppEndpointService {

  /**
   * Parameters for putApiCustomerAppEndpointId
   */
  export interface PutApiCustomerAppEndpointIdParams {
    id: string;
    body?: CustomerAppEndpoint;
  }
}

export { CustomerAppEndpointService }
