/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Order } from '../models/order';
import { DtoInMasterOrder } from '../models/dto-in-master-order';
@Injectable({
  providedIn: 'root',
})
class MasterOrderService extends __BaseService {
  static readonly postApiMasterOrderPath = '/api/MasterOrder';

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
  postApiMasterOrderResponse(body?: DtoInMasterOrder): __Observable<__StrictHttpResponse<Array<Order>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/MasterOrder`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Order>>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiMasterOrder(body?: DtoInMasterOrder): __Observable<Array<Order>> {
    return this.postApiMasterOrderResponse(body).pipe(
      __map(_r => _r.body as Array<Order>)
    );
  }
}

module MasterOrderService {
}

export { MasterOrderService }
