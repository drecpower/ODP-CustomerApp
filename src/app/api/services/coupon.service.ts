/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Coupon } from '../models/coupon';
@Injectable({
  providedIn: 'root',
})
class CouponService extends __BaseService {
  static readonly getApiCouponPath = '/api/Coupon';
  static readonly postApiCouponPath = '/api/Coupon';
  static readonly getApiCouponMerchantMerchantIdPath = '/api/Coupon/merchant/{merchantId}';
  static readonly getApiCouponIdPath = '/api/Coupon/{id}';
  static readonly putApiCouponIdPath = '/api/Coupon/{id}';
  static readonly deleteApiCouponIdPath = '/api/Coupon/{id}';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @return Success
   */
  getApiCouponResponse(): __Observable<__StrictHttpResponse<Array<Coupon>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Coupon`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Coupon>>;
      })
    );
  }
  /**
   * @return Success
   */
  getApiCoupon(): __Observable<Array<Coupon>> {
    return this.getApiCouponResponse().pipe(
      __map(_r => _r.body as Array<Coupon>)
    );
  }

  /**
   * @param body undefined
   * @return Success
   */
  postApiCouponResponse(body?: Coupon): __Observable<__StrictHttpResponse<Coupon>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Coupon`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Coupon>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiCoupon(body?: Coupon): __Observable<Coupon> {
    return this.postApiCouponResponse(body).pipe(
      __map(_r => _r.body as Coupon)
    );
  }

  /**
   * @param merchantId undefined
   * @return Success
   */
  getApiCouponMerchantMerchantIdResponse(merchantId: string): __Observable<__StrictHttpResponse<Array<Coupon>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Coupon/merchant/${encodeURIComponent(String(merchantId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Coupon>>;
      })
    );
  }
  /**
   * @param merchantId undefined
   * @return Success
   */
  getApiCouponMerchantMerchantId(merchantId: string): __Observable<Array<Coupon>> {
    return this.getApiCouponMerchantMerchantIdResponse(merchantId).pipe(
      __map(_r => _r.body as Array<Coupon>)
    );
  }

  /**
   * @param id undefined
   * @return Success
   */
  getApiCouponIdResponse(id: string): __Observable<__StrictHttpResponse<Coupon>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/Coupon/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Coupon>;
      })
    );
  }
  /**
   * @param id undefined
   * @return Success
   */
  getApiCouponId(id: string): __Observable<Coupon> {
    return this.getApiCouponIdResponse(id).pipe(
      __map(_r => _r.body as Coupon)
    );
  }

  /**
   * @param params The `CouponService.PutApiCouponIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiCouponIdResponse(params: CouponService.PutApiCouponIdParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.body;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/Coupon/${encodeURIComponent(String(params.id))}`,
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
   * @param params The `CouponService.PutApiCouponIdParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `body`:
   */
  putApiCouponId(params: CouponService.PutApiCouponIdParams): __Observable<null> {
    return this.putApiCouponIdResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  deleteApiCouponIdResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/Coupon/${encodeURIComponent(String(id))}`,
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
  deleteApiCouponId(id: string): __Observable<null> {
    return this.deleteApiCouponIdResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module CouponService {

  /**
   * Parameters for putApiCouponId
   */
  export interface PutApiCouponIdParams {
    id: string;
    body?: Coupon;
  }
}

export { CouponService }
