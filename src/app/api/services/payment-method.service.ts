/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { PaymentMethod } from '../models/payment-method';
@Injectable({
  providedIn: 'root',
})
class PaymentMethodService extends __BaseService {
  static readonly getApiPaymentMethodPath = '/api/PaymentMethod';
  static readonly postApiPaymentMethodPath = '/api/PaymentMethod';
  static readonly getApiPaymentMethodMerchantMerchantIdPath = '/api/PaymentMethod/merchant/{merchantId}';
  static readonly getApiPaymentMethodIdPath = '/api/PaymentMethod/{id}';
  static readonly putApiPaymentMethodIdPath = '/api/PaymentMethod/{id}';
  static readonly deleteApiPaymentMethodIdPath = '/api/PaymentMethod/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiPaymentMethodResponse(): __Observable<__StrictHttpResponse<Array<PaymentMethod>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/PaymentMethod`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PaymentMethod>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiPaymentMethod(): __Observable<Array<PaymentMethod>> {
    return this.getApiPaymentMethodResponse().pipe(
      __map(_r => _r.body as Array<PaymentMethod>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiPaymentMethodResponse(body?: PaymentMethod): __Observable<__StrictHttpResponse<PaymentMethod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/PaymentMethod`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PaymentMethod>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiPaymentMethod(body?: PaymentMethod): __Observable<PaymentMethod> {
    return this.postApiPaymentMethodResponse(body).pipe(
      __map(_r => _r.body as PaymentMethod)
    );
  }

  /**
   * @param merchantId undefined
   * @return Success
   */
  getApiPaymentMethodMerchantMerchantIdResponse(merchantId: string): __Observable<__StrictHttpResponse<Array<PaymentMethod>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/PaymentMethod/merchant/${encodeURIComponent(String(merchantId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<PaymentMethod>>;
      })
    );
  }
  /**
   * @param merchantId undefined
   * @return Success
   */
  getApiPaymentMethodMerchantMerchantId(merchantId: string): __Observable<Array<PaymentMethod>> {
    return this.getApiPaymentMethodMerchantMerchantIdResponse(merchantId).pipe(
      __map(_r => _r.body as Array<PaymentMethod>)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiPaymentMethodIdResponse(id: string): __Observable<__StrictHttpResponse<PaymentMethod>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/PaymentMethod/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PaymentMethod>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiPaymentMethodId(id: string): __Observable<PaymentMethod> {
    return this.getApiPaymentMethodIdResponse(id).pipe(
      __map(_r => _r.body as PaymentMethod)
    );
  }

  /**
   * @param params The `PaymentMethodService.PutApiPaymentMethodIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiPaymentMethodIdResponse(params: PaymentMethodService.PutApiPaymentMethodIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/PaymentMethod/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `PaymentMethodService.PutApiPaymentMethodIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiPaymentMethodId(params: PaymentMethodService.PutApiPaymentMethodIdParams): __Observable<null> {
    return this.putApiPaymentMethodIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiPaymentMethodIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/PaymentMethod/${encodeURIComponent(String(id))}`,
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
  deleteApiPaymentMethodId(id: string): __Observable<null> {
    return this.deleteApiPaymentMethodIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module PaymentMethodService {

  /**
   * Parameters for putApiPaymentMethodId
   */
  export interface PutApiPaymentMethodIdParams {
    id: string;
    body?: PaymentMethod;
  }
}

export { PaymentMethodService }
