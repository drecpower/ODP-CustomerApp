/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Merchant } from '../models/merchant';
import { DtoCheckout } from '../models/dto-checkout';
import { DtoInMasterOrder } from '../models/dto-in-master-order';
import { DtoInOrder } from '../models/dto-in-order';
@Injectable({
  providedIn: 'root',
})
class MerchantsService extends __BaseService {
  static readonly getApiMerchantsIdDeliveryAvailabilitiesPath = '/api/Merchants/{id}/deliveryAvailabilities';
  static readonly postApiMerchantsMerchantIdOrdersPath = '/api/Merchants/{merchantId}/orders';
  static readonly postApiMerchantsMerchantIdOrderPath = '/api/Merchants/{merchantId}/order';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param params The `MerchantsService.GetApiMerchantsIdDeliveryAvailabilitiesParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `Longitude`:
   *
   * - `Latitude`:
   *
   * @return Success
   */
  getApiMerchantsIdDeliveryAvailabilitiesResponse(params: MerchantsService.GetApiMerchantsIdDeliveryAvailabilitiesParams): __Observable<__StrictHttpResponse<Merchant>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    if (params.Longitude != null) __params = __params.set('Longitude', params.Longitude.toString());
    if (params.Latitude != null) __params = __params.set('Latitude', params.Latitude.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Merchants/${encodeURIComponent(String(params.id))}/deliveryAvailabilities`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Merchant>;
      })
    );
  }
  /**
   * @param params The `MerchantsService.GetApiMerchantsIdDeliveryAvailabilitiesParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `Longitude`:
   *
   * - `Latitude`:
   *
   * @return Success
   */
  getApiMerchantsIdDeliveryAvailabilities(params: MerchantsService.GetApiMerchantsIdDeliveryAvailabilitiesParams): __Observable<Merchant> {
    return this.getApiMerchantsIdDeliveryAvailabilitiesResponse(params).pipe(
      __map(_r => _r.body as Merchant)
    );
  }

  /**
   * @param params The `MerchantsService.PostApiMerchantsMerchantIdOrdersParams` containing the following parameters:
   *
   * - `merchantId`:
   *
   * - `body`:
   *
   * @return Success
   */
  postApiMerchantsMerchantIdOrdersResponse(params: MerchantsService.PostApiMerchantsMerchantIdOrdersParams): __Observable<__StrictHttpResponse<DtoCheckout>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Merchants/${encodeURIComponent(String(params.merchantId))}/orders`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DtoCheckout>;
      })
    );
  }
  /**
   * @param params The `MerchantsService.PostApiMerchantsMerchantIdOrdersParams` containing the following parameters:
   *
   * - `merchantId`:
   *
   * - `body`:
   *
   * @return Success
   */
  postApiMerchantsMerchantIdOrders(params: MerchantsService.PostApiMerchantsMerchantIdOrdersParams): __Observable<DtoCheckout> {
    return this.postApiMerchantsMerchantIdOrdersResponse(params).pipe(
      __map(_r => _r.body as DtoCheckout)
    );
  }

  /**
   * @param params The `MerchantsService.PostApiMerchantsMerchantIdOrderParams` containing the following parameters:
   *
   * - `merchantId`:
   *
   * - `body`:
   *
   * @return Success
   */
  postApiMerchantsMerchantIdOrderResponse(params: MerchantsService.PostApiMerchantsMerchantIdOrderParams): __Observable<__StrictHttpResponse<DtoCheckout>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Merchants/${encodeURIComponent(String(params.merchantId))}/order`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DtoCheckout>;
      })
    );
  }
  /**
   * @param params The `MerchantsService.PostApiMerchantsMerchantIdOrderParams` containing the following parameters:
   *
   * - `merchantId`:
   *
   * - `body`:
   *
   * @return Success
   */
  postApiMerchantsMerchantIdOrder(params: MerchantsService.PostApiMerchantsMerchantIdOrderParams): __Observable<DtoCheckout> {
    return this.postApiMerchantsMerchantIdOrderResponse(params).pipe(
      __map(_r => _r.body as DtoCheckout)
    );
  }
}

module MerchantsService {

  /**
   * Parameters for getApiMerchantsIdDeliveryAvailabilities
   */
  export interface GetApiMerchantsIdDeliveryAvailabilitiesParams {
    id: string;
    Longitude?: number;
    Latitude?: number;
  }

  /**
   * Parameters for postApiMerchantsMerchantIdOrders
   */
  export interface PostApiMerchantsMerchantIdOrdersParams {
    merchantId: string;
    body?: DtoInMasterOrder;
  }

  /**
   * Parameters for postApiMerchantsMerchantIdOrder
   */
  export interface PostApiMerchantsMerchantIdOrderParams {
    merchantId: string;
    body?: DtoInOrder;
  }
}

export { MerchantsService }
