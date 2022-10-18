import { Injectable } from '@angular/core';
import * as Enumerable from 'linq';
import { DtoEvent, DtoEventsRequest, Order } from 'src/app/api/models';
import { DtoStoredOrder } from '../event/dto-stored-order';
import { _DB } from './order-storage-db';

@Injectable({
  providedIn: 'root'
})
export class OrderStorageService {

  constructor() {
    this.initializeDB();
  }
  async initializeDB() {
    try {
      await _DB.open();
      this.load()
    } catch (error) {

    }
  }
  public dataBase = _DB;
  public orderSending: Order | undefined;

  ordersInProgress: DtoStoredOrder[] = [];
  ordersHistory: DtoStoredOrder[] = [];

  async load() {
    await this.getOrdersInProgress();
    await this.getOrdersHistory();
  }
  private async getOrdersInProgress() {
    var lst = await _DB.orders.toArray();
    this.ordersInProgress = Enumerable.from(lst).where(x => x.order.status != "CAN" && x.order.status != "CON").toArray();
    console.dir(this.ordersInProgress);
    return lst;
  }
  private async getOrdersHistory() {
    var lst = await _DB.orders.toArray();
    var lstId = Enumerable.from(this.ordersInProgress).select(s => s.id).toArray();
    this.ordersHistory = Enumerable.from(lst).where(x => lstId.indexOf(x.id) < 0).toArray();
  }
  async processedEvent(event: DtoEvent) {
    var processed = false;
    var lst = await _DB.orders.toArray();
    var o = Enumerable.from(lst).where(x => x.id == event.orderId).defaultIfEmpty(undefined).firstOrDefault();
    if (o && o.order && o.order.orderEvent) {
      processed = Enumerable.from(o.order.orderEvent).where(x => x.id == event.id).any();
    }
    return processed;
  }

  async addOrder(order: Order) {
    var storedOrder: DtoStoredOrder = {
      id: order.id!,
      modifiedAt: new Date(), order: order
    };
    await _DB.orders.put(storedOrder, storedOrder.id);
    this.orderSending = order;
    this.load();
  }
  delOrder(guidId:string){
    try {
      _DB.orders.delete(guidId);
    } catch (error) {
      
    }
  }
  getEventsRequest(merchantId: string | undefined) {
    var requests: DtoEventsRequest[] = [];
    if (merchantId) {
      var lst = Enumerable.from(this.ordersInProgress).where(x => x.order.merchantId == merchantId).toArray();
      for (let i = 0; i < lst.length; i++) {
        var req: DtoEventsRequest = {
          orderId: lst[i].order.id,
          lastEventDateTime: undefined
        }
        try {
          if (lst[i].order.orderEvent != undefined && lst[i].order.orderEvent!.length > 0) {
            var ev = lst[i].order.orderEvent![lst[i].order.orderEvent!.length - 1];
            if (ev) {
              req.lastEventDateTime = ev.createdAt;
            }
          }
        } catch (error) {

        }
        requests.push(req);
      }
    }
    return requests;

  }
}
