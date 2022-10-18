import { DtoEvent } from '../../api/models/dto-event';
import { OrderService } from 'src/app/api/services';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as Enumerable from 'linq';
import { DtoStoredOrder } from './dto-stored-order';
import { IEventAdapter } from './adapters/order/i-event-adapter';
import { EAdWebApi } from './adapters/order/webapi/e-ad-web-api';
// import { SSUuid } from 'src/app/static-stack/uuid';
import { CustomerAppEndpoint, Order } from 'src/app/api/models';
import { OrderStorageService } from '../order-storage/order-storage.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  // private _onOrdersListUpdatedSubject = new Subject<DtoStoredOrder[]>();
  // public onOrdersListUpdated = this._onOrdersListUpdatedSubject.asObservable();

  // private _onOrdersListLoadedSubject = new Subject<DtoStoredOrder[]>();
  // public onOrdersListLoaded = this._onOrdersListLoadedSubject.asObservable();

  // private _onAddedOrderSubject = new Subject<DtoStoredOrder>();
  // public onAddedOrder = this._onAddedOrderSubject.asObservable();

  // private _onUpdatedOrderSubject = new Subject<DtoStoredOrder>();
  // public onUpdatedOrder = this._onUpdatedOrderSubject.asObservable();

  // private _onDeletedOrderSubject = new Subject<DtoStoredOrder>();
  // public onDeletedOrder = this._onDeletedOrderSubject.asObservable();

  // private _onEventFromPoolSubject = new Subject<DtoStoredEvent>();
  // public onEventFromPool = this._onEventFromPoolSubject.asObservable();

  private _countDownPooling = new Subject<number>();
  public countDownPoolingAsync = this._countDownPooling.asObservable();

  private _progressToNextPooling = new Subject<number>();
  public progressToNextPooling = this._progressToNextPooling.asObservable();

  private _OnErrorSubject = new Subject<any>();
  public OnError = this._OnErrorSubject.asObservable();

  // public listOrderStatusGroup: DtoOrderStatusGroup[] = [];

  public isRunningPooling = false;
  public isRunningProcessEvent = false;
  public isWaitingToProcessEvent = false;
  public isPoolingLoopRoutineActive = false;
  public poolingDelaySeconds = 30;
  public secondsElapsedFromLastPooling = 999999;
  public promisses: { storedOrderid: string, resolve: any }[] = [];
  public activeAdapters: IEventAdapter[] = [];
  constructor(private orderStorageSvc: OrderStorageService,private userSvc:UserService) {
    this.initializeAdapters();
  }

  private async initializeAdapters() {

    // this._onOrdersListLoadedSubject.next(this.listOrder);
    // if (this.listOrder.length > 0) {
    // this._onOrdersListUpdatedSubject.next(this.listOrder);
    // }
    //TODO get from merchants that have orders in progress
    var config: CustomerAppEndpoint[] = [{
      createdAt: "",
      headers: "",
      id: "ffbb95a0-9ba5-4eaa-b138-02c0ef6c07a7",
      index: 0,
      merchantId: "55d0e3fb-f932-11eb-b388-000d3a8abda5",
      params: "",
      privateKey: "",
      publicKey: "",
      status: "ACTIVE",
      type: "EVENT",
      protocolType: "WEB_API",
      uri: "http://localhost:5075/api/Events"
    }]
    for (let i = 0; i < config.length; i++) {
      const element = config[i];
      // console.log("Init adapter: " + element.name);
      var adapter: IEventAdapter | undefined;
      switch (config[i].protocolType) {
        case "WEB_API":
          adapter = new EAdWebApi(config[i]);
          if (adapter) {
            this.activeAdapters.push(adapter);
          }
          break;
        case "WEBSOCKET":
          // adapter = new EAdWebSocket(config[i]);
          // if (adapter) {
          //   this.activeAdapters.push(adapter);
          // }
          break;
        case "DELINET":
          // adapter = new EAdDelinetChannel(config[i]);
          // if (adapter) {
          //   this.activeAdapters.push(adapter);
          // }
          break;

        default:
          break;
      }
      if (adapter) {
        adapter.onNewEvents.subscribe(
          async (_events) => {
            for (let index = 0; index < _events.length; index++) {
              try {
                await this.orderStorageSvc.dataBase.tempEvents.add(_events[index], _events[index].id);
              } catch (e) {
                var a = e;
              }
            }
            await this.processEvent();
          }
        );
      }
    }

    setInterval(async () => {
      if (
        this.isPoolingLoopRoutineActive
        && this.secondsElapsedFromLastPooling > this.poolingDelaySeconds
        && !this.isRunningPooling
      ) {
        (await this.doPooling());
      }
      if (this.isPoolingLoopRoutineActive) {
        (this.secondsElapsedFromLastPooling += 0.2);
        let countDown = this.poolingDelaySeconds - this.secondsElapsedFromLastPooling;
        if (countDown < 0) countDown = 0;
        this._countDownPooling.next(Math.floor(countDown));
        var percent = ((this.poolingDelaySeconds - countDown) / this.poolingDelaySeconds) * 100;
        this._progressToNextPooling.next(percent);
      }

    }, 200);
  }
  public async doPooling() {
    this.secondsElapsedFromLastPooling = 0;
    for (let i = 0; i < this.activeAdapters.length; i++) {
      await this.activeAdapters[i].doPooling(this.orderStorageSvc.getEventsRequest(this.activeAdapters[i].config.merchantId));
    }
  }

  public startPooling(poolingDelaySeconds: number = 0) {
    if (this.poolingDelaySeconds > 0) {
      this.poolingDelaySeconds = this.poolingDelaySeconds;
    }
    this.isPoolingLoopRoutineActive = true;
  }

  public stopPooling() {
    this.isPoolingLoopRoutineActive = false;
  }

  async processEvent() {
    if (!this.isRunningProcessEvent) {
      this.isRunningProcessEvent = true
      var tmpOrderList: DtoStoredOrder[] = await this.orderStorageSvc.ordersInProgress;
      try {
        var _tempEvents = await this.orderStorageSvc.dataBase.tempEvents.toArray();
        for (let i = 0; i < _tempEvents.length; i++) {
          const _tempEvent: DtoEvent = _tempEvents[i];
          // this._onEventFromPoolSubject.next(_tempEvent);
          if (!(await this.orderStorageSvc.processedEvent(_tempEvent))) {
            await this.orderStorageSvc.dataBase.events.put(_tempEvent, _tempEvent.id);
            var _currentStoredOrder = Enumerable.from(tmpOrderList).where(o => o.id == _tempEvent.orderId).defaultIfEmpty(undefined).firstOrDefault();
            if (_currentStoredOrder && _tempEvent.code) {
              try {
                switch (_tempEvent.code) {
                  case "PLC":
                  case "RPS":
                    _currentStoredOrder.order.status = _tempEvent.code;
                    try {
                      if (_tempEvent.metadata != null) {
                        var obj = JSON.parse(_tempEvent.metadata);
                        try {
                          if (typeof obj == 'string') {
                            obj = JSON.parse(obj);
                          }
                        } catch (error) {

                        }
                        
                        if(obj.displayId){
                          _currentStoredOrder.order.displayId = obj.displayId;
                        }
                        if(obj.addressId){
                          _currentStoredOrder.order.addressId = obj.addressId;
                        }
                        if(obj.customerId){
                          _currentStoredOrder.order.customerId = obj.customerId;
                          this.userSvc.setCustomerId(obj.customerId);
                          //TODO set on logged user
                        }
                      }
                    } catch (error) {

                    }
                    this.updateOrderEvent(_currentStoredOrder, _tempEvent);
                    await this.persistEventChanges(_currentStoredOrder);
                    this.orderStorageSvc.orderSending = undefined;
                    //TODO: Close dialog splashing 
                    break;
                  case "CFM":
                  case "RTP":
                  case "DSP":
                  case "CON":
                    _currentStoredOrder.order.status = _tempEvent.code;
                    this.updateOrderEvent(_currentStoredOrder, _tempEvent);
                    await this.persistEventChanges(_currentStoredOrder);
                    break;
                  case "ADR":
                    if (_currentStoredOrder != null) {
                      this.updateOrderEvent(_currentStoredOrder, _tempEvent);
                      try {
                        if (_tempEvent.metadata != null) {
                          var obj = JSON.parse(_tempEvent.metadata);
                          try {
                            if (typeof obj == 'string') {
                              obj = JSON.parse(obj);
                            }
                          } catch (error) {

                          }
                          _currentStoredOrder.driver = {
                            workerExternalUuid: obj.workerExternalUuid,
                            workerName: obj.workerName,
                            workerPhone: obj.workerPhone,
                            workerPhotoUrl: obj.workerPhotoUrl,
                            workerVehicleType: obj.workerVehicleType,
                            status: "accepted the request"
                          }
                        }
                      } catch (error) {

                      }
                      await this.persistEventChanges(_currentStoredOrder);
                    }
                    break;
                  case "GTO":
                  case "AAO":
                  case "CLT":
                  case "AAD":
                    if (_currentStoredOrder != undefined) {
                      this.updateOrderEvent(_currentStoredOrder, _tempEvent);
                      var dicDriver = { GTO: "going to store", AAO: "arrived at store", CLT: "collected order", AAD: "arrived at destination" };
                      try {
                        if (_currentStoredOrder.driver) {
                          _currentStoredOrder.driver.status = dicDriver[_tempEvent.code];
                        }
                      } catch (error) {

                      }
                      await this.persistEventChanges(_currentStoredOrder);
                    }
                    break;
                  case "CCR":
                    if (_currentStoredOrder != null) {
                      _currentStoredOrder.consumerRequestCancellation = true;
                      this.updateOrderEvent(_currentStoredOrder, _tempEvent);
                      await this.persistEventChanges(_currentStoredOrder);
                    }
                    break;
                  case "CCA":
                  case "CCD":
                    if (_currentStoredOrder != null) {
                      _currentStoredOrder.consumerRequestCancellation = false;
                      this.updateOrderEvent(_currentStoredOrder, _tempEvent);
                      await this.persistEventChanges(_currentStoredOrder);
                    }
                    break;
                  default:
                    break;
                }
                await this.orderStorageSvc.dataBase.tempEvents.delete(_tempEvent.id!);
              } catch (error) {
                this._OnErrorSubject.next(error);
                console.log("Error processing " + _tempEvent.code + " Event");
                console.log(error);
              }
            }

          }
        }
        this.orderStorageSvc.load();
      } catch (error) {

      }
      this.isRunningProcessEvent = false;
      if (this.isWaitingToProcessEvent) {
        this.isWaitingToProcessEvent = false;
        setTimeout(() => {
          this.processEvent();
        }, 1);
      }
    } else {
      this.isWaitingToProcessEvent = true;
    }
  }
  updateOrderEvent(_localStoredOrder: DtoStoredOrder, _event: DtoEvent) {
    _localStoredOrder.modifiedAt = new Date();
    _localStoredOrder.processingStatus = undefined;
    _localStoredOrder.processingStatusAt = undefined;
    // if (_localStoredOrder.events.length > 0) {
    //   _localStoredOrder.events.push(_event);
    // }
  }
  private async persistEventChanges(_localStoredOrder: DtoStoredOrder) {
    // this._onUpdatedOrderSubject.next(_localStoredOrder);
    await this.orderStorageSvc.dataBase.orders.put(_localStoredOrder, _localStoredOrder.id);
    // this._onOrdersListUpdatedSubject.next(this.listOrder);
    try {
      var p = Enumerable.from(this.promisses).where(x => x.storedOrderid == _localStoredOrder.id).firstOrDefault();
      if (p != null) {
        p.resolve();
      }
    } catch (error) {
    }
  }

  // changeStatus(storedOrderId: string, status: string) {
  //   var p = new Promise<any>(
  //     async (resolve, reject) => {
  //       var _localOrderDetail = Enumerable.from(this.listOrder).where(o => o.id == storedOrderId).defaultIfEmpty(null).firstOrDefault();
  //       _localOrderDetail.processingStatus = status;
  //       _localOrderDetail.processingStatusAt = new Date();
  //       var adapter = this.getAdapter(_localOrderDetail.adapter);
  //       if (adapter != null) {
  //         let changedStatus = await adapter.changeStatus(_localOrderDetail.order.id, status);
  //         if (changedStatus) {
  //           this.promisses.push({ storedOrderid: storedOrderId, resolve: resolve });

  //           this._onUpdatedOrderSubject.next(_localOrderDetail);
  //           await this.orderStorageSvc.dataBase.orders.put(_localOrderDetail, storedOrderId);
  //           this._onOrdersListUpdatedSubject.next(this.listOrder);
  //         }
  //         else {
  //           reject();
  //         }
  //       }
  //       else {
  //         reject();
  //       }
  //     }
  //   );
  //   return p;
  // }
  getAdapter(name: string) {
    var adapter = Enumerable.from(this.activeAdapters).where(x => x.name == name).firstOrDefault();
    if (adapter == null) {

    }
    return adapter;
  }
}
