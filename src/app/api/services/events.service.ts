/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { OrderEvent } from '../models/order-event';
import { DtoEventsRequest } from '../models/dto-events-request';
@Injectable({
  providedIn: 'root',
})
class EventsService extends __BaseService {
  static readonly postApiEventsPath = '/api/Events';

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
  postApiEventsResponse(body?: Array<DtoEventsRequest>): __Observable<__StrictHttpResponse<Array<OrderEvent>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = body;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/Events`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<OrderEvent>>;
      })
    );
  }
  /**
   * @param body undefined
   * @return Success
   */
  postApiEvents(body?: Array<DtoEventsRequest>): __Observable<Array<OrderEvent>> {
    return this.postApiEventsResponse(body).pipe(
      __map(_r => _r.body as Array<OrderEvent>)
    );
  }
}

module EventsService {
}

export { EventsService }
