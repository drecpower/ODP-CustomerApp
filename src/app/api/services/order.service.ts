/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { DtoOrderDetails } from '../models/dto-order-details';
import { DtoEvent } from '../models/dto-event';
import { DtoTracking } from '../models/dto-tracking';
import { Order } from '../models/order';
import { DtoOrderResponse } from '../models/dto-order-response';
import { DtoCartToSend } from '../models/dto-cart-to-send';
@Injectable({
  providedIn: 'root',
})
class OrderService extends __BaseService {
  static readonly getApiOrderV10IdPath = '/api/Order/v1.0/{id}';
  static readonly getApiOrderV10EventsPoolingPath = '/api/Order/v1.0/events:pooling';
  static readonly postApiOrderV10EventsAcknowledgmentPath = '/api/Order/v1.0/events/acknowledgment';
  static readonly postApiOrder10IdDeliveryCodePath = '/api/Order/1.0/{id}/delivery/{code}';
  static readonly postApiOrder10IdRequestDriverPath = '/api/Order/1.0/{id}/requestDriver';
  static readonly getApiOrder10IdTrackingPath = '/api/Order/1.0/{id}/tracking';
  static readonly postApiOrderV10IdConfirmPath = '/api/Order/v1.0/{id}/confirm';
  static readonly postApiOrderV10IdStartPreparationPath = '/api/Order/v1.0/{id}/startPreparation';
  static readonly postApiOrderV10IdReadyToPickupPath = '/api/Order/v1.0/{id}/readyToPickup';
  static readonly postApiOrderV10IdDispatchPath = '/api/Order/v1.0/{id}/dispatch';
  static readonly postApiOrderV10IdRequestCancellationPath = '/api/Order/v1.0/{id}/requestCancellation';
  static readonly postApiOrderV10IdAcceptCancellationPath = '/api/Order/v1.0/{id}/acceptCancellation';
  static readonly postApiOrderV10IdDenyCancellationPath = '/api/Order/v1.0/{id}/denyCancellation';
  static readonly postApiOrderV10IdCustomerRequestCancellationPath = '/api/Order/v1.0/{id}/customerRequestCancellation';
  static readonly postApiOrder10IdCustomerPickupAreaAssignedPath = '/api/Order/1.0/{id}/customerPickupAreaAssigned';
  static readonly postApiOrderPath = '/api/Order';

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
  getApiOrderV10IdResponse(id: string): __Observable<__StrictHttpResponse<DtoOrderDetails>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Order/v1.0/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DtoOrderDetails>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiOrderV10Id(id: string): __Observable<DtoOrderDetails> {
    return this.getApiOrderV10IdResponse(id).pipe(
      __map(_r => _r.body as DtoOrderDetails)
    );
  }

  /**
   * @param params The `OrderService.GetApiOrderV10EventsPoolingParams` containing the following parameters:
   *
   * - `Types`:
   *
   * - `Groups`:
   *
   * @return Success
   */
  getApiOrderV10EventsPoolingResponse(params: OrderService.GetApiOrderV10EventsPoolingParams): __Observable<__StrictHttpResponse<Array<DtoEvent>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.Types != null) __params = __params.set('Types', params.Types.toString());
    if (params.Groups != null) __params = __params.set('Groups', params.Groups.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Order/v1.0/events:pooling`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<DtoEvent>>;
      })
    );
  }
  /**
   * @param params The `OrderService.GetApiOrderV10EventsPoolingParams` containing the following parameters:
   *
   * - `Types`:
   *
   * - `Groups`:
   *
   * @return Success
   */
  getApiOrderV10EventsPooling(params: OrderService.GetApiOrderV10EventsPoolingParams): __Observable<Array<DtoEvent>> {
    return this.getApiOrderV10EventsPoolingResponse(params).pipe(
      __map(_r => _r.body as Array<DtoEvent>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiOrderV10EventsAcknowledgmentResponse(body?: Array<string>): __Observable<__StrictHttpResponse<Array<DtoEvent>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Order/v1.0/events/acknowledgment`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<DtoEvent>>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiOrderV10EventsAcknowledgment(body?: Array<string>): __Observable<Array<DtoEvent>> {
    return this.postApiOrderV10EventsAcknowledgmentResponse(body).pipe(
      __map(_r => _r.body as Array<DtoEvent>)
    );
  }

  /**
   * @param params The `OrderService.PostApiOrder10IdDeliveryCodeParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `code`:
   *
   * - `body`:
   */
  postApiOrder10IdDeliveryCodeResponse(params: OrderService.PostApiOrder10IdDeliveryCodeParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Order/1.0/${encodeURIComponent(String(params.id))}/delivery/${encodeURIComponent(String(params.code))}`,
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
   * @param params The `OrderService.PostApiOrder10IdDeliveryCodeParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `code`:
   *
   * - `body`:
   */
  postApiOrder10IdDeliveryCode(params: OrderService.PostApiOrder10IdDeliveryCodeParams): __Observable<null> {
    return this.postApiOrder10IdDeliveryCodeResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  postApiOrder10IdRequestDriverResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Order/1.0/${encodeURIComponent(String(id))}/requestDriver`,
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
  postApiOrder10IdRequestDriver(id: string): __Observable<null> {
    return this.postApiOrder10IdRequestDriverResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiOrder10IdTrackingResponse(id: string): __Observable<__StrictHttpResponse<DtoTracking>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Order/1.0/${encodeURIComponent(String(id))}/tracking`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DtoTracking>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiOrder10IdTracking(id: string): __Observable<DtoTracking> {
    return this.getApiOrder10IdTrackingResponse(id).pipe(
      __map(_r => _r.body as DtoTracking)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdConfirmResponse(id: string): __Observable<__StrictHttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Order/v1.0/${encodeURIComponent(String(id))}/confirm`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Order>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdConfirm(id: string): __Observable<Order> {
    return this.postApiOrderV10IdConfirmResponse(id).pipe(
      __map(_r => _r.body as Order)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdStartPreparationResponse(id: string): __Observable<__StrictHttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Order/v1.0/${encodeURIComponent(String(id))}/startPreparation`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Order>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdStartPreparation(id: string): __Observable<Order> {
    return this.postApiOrderV10IdStartPreparationResponse(id).pipe(
      __map(_r => _r.body as Order)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdReadyToPickupResponse(id: string): __Observable<__StrictHttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Order/v1.0/${encodeURIComponent(String(id))}/readyToPickup`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Order>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdReadyToPickup(id: string): __Observable<Order> {
    return this.postApiOrderV10IdReadyToPickupResponse(id).pipe(
      __map(_r => _r.body as Order)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdDispatchResponse(id: string): __Observable<__StrictHttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Order/v1.0/${encodeURIComponent(String(id))}/dispatch`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Order>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdDispatch(id: string): __Observable<Order> {
    return this.postApiOrderV10IdDispatchResponse(id).pipe(
      __map(_r => _r.body as Order)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdRequestCancellationResponse(id: string): __Observable<__StrictHttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Order/v1.0/${encodeURIComponent(String(id))}/requestCancellation`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Order>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdRequestCancellation(id: string): __Observable<Order> {
    return this.postApiOrderV10IdRequestCancellationResponse(id).pipe(
      __map(_r => _r.body as Order)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdAcceptCancellationResponse(id: string): __Observable<__StrictHttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Order/v1.0/${encodeURIComponent(String(id))}/acceptCancellation`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Order>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdAcceptCancellation(id: string): __Observable<Order> {
    return this.postApiOrderV10IdAcceptCancellationResponse(id).pipe(
      __map(_r => _r.body as Order)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdDenyCancellationResponse(id: string): __Observable<__StrictHttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Order/v1.0/${encodeURIComponent(String(id))}/denyCancellation`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Order>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdDenyCancellation(id: string): __Observable<Order> {
    return this.postApiOrderV10IdDenyCancellationResponse(id).pipe(
      __map(_r => _r.body as Order)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdCustomerRequestCancellationResponse(id: string): __Observable<__StrictHttpResponse<Order>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Order/v1.0/${encodeURIComponent(String(id))}/customerRequestCancellation`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Order>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  postApiOrderV10IdCustomerRequestCancellation(id: string): __Observable<Order> {
    return this.postApiOrderV10IdCustomerRequestCancellationResponse(id).pipe(
      __map(_r => _r.body as Order)
    );
  }

  /**
   * @param params The `OrderService.PostApiOrder10IdCustomerPickupAreaAssignedParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  postApiOrder10IdCustomerPickupAreaAssignedResponse(params: OrderService.PostApiOrder10IdCustomerPickupAreaAssignedParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Order/1.0/${encodeURIComponent(String(params.id))}/customerPickupAreaAssigned`,
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
   * @param params The `OrderService.PostApiOrder10IdCustomerPickupAreaAssignedParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  postApiOrder10IdCustomerPickupAreaAssigned(params: OrderService.PostApiOrder10IdCustomerPickupAreaAssignedParams): __Observable<null> {
    return this.postApiOrder10IdCustomerPickupAreaAssignedResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiOrderResponse(body?: DtoCartToSend): __Observable<__StrictHttpResponse<DtoOrderResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Order`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<DtoOrderResponse>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiOrder(body?: DtoCartToSend): __Observable<DtoOrderResponse> {
    return this.postApiOrderResponse(body).pipe(
      __map(_r => _r.body as DtoOrderResponse)
    );
  }
}

module OrderService {

  /**
   * Parameters for getApiOrderV10EventsPooling
   */
  export interface GetApiOrderV10EventsPoolingParams {
    Types?: string;
    Groups?: string;
  }

  /**
   * Parameters for postApiOrder10IdDeliveryCode
   */
  export interface PostApiOrder10IdDeliveryCodeParams {
    id: string;
    code: string;
    body?: any;
  }

  /**
   * Parameters for postApiOrder10IdCustomerPickupAreaAssigned
   */
  export interface PostApiOrder10IdCustomerPickupAreaAssignedParams {
    id: string;
    body?: any;
  }
}

export { OrderService }
