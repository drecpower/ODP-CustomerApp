import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/api/models';
import { DialogService } from 'src/app/services/dialog/dialog.service';
import { DialogType, DtoDialog } from 'src/app/dto/dto-dialog';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import * as Enumerable from 'linq';
import { OrderInProgressComponent } from '../order-in-progress/order-in-progress.component';
import { OrderStorageService } from 'src/app/services/order-storage/order-storage.service';
import { EventService } from 'src/app/services/event/event.service';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  @Input() id: string | undefined;

  private _orders: Order[] | undefined;
  public get orders(): Order[] | undefined {
    return this._orders;
  }
  public set orders(v: Order[] | undefined) {
    this._orders = v;
    this.checkDates();
  }

  toShowDate: string[] = [];
  constructor(public dialogSvc: DialogService, public orderStorageSvc:OrderStorageService, private eventSvc:EventService  ) {
    this.orders = [{
      id: "32f304be-0c02-4c9d-991d-51629a66a901",
      status: "CFM",
      displayId: "1122",
      addressId: "123123-12-12123123-12312",
      orderType: 'DELIVERY',
      addressIdNavigation: {
        streetName: "Malibu point 10880",
        streetNumber: '90265',
        neighborhood: 'Cliff',
        city: 'Malibu',
        country: 'United States',
        postalCode: '01220-102',
        state: 'CA',
        complement: 'house'
      },
      merchantIdNavigation: {
        name: "Happy store",
        id: "04040-2939-2991-zz241",
        reference: "https://i.pinimg.com/originals/77/e5/0c/77e50c04f9f512a456eb3e135a1c013b.png",
      },
      subTotal: 13,
      benefits: 1,
      deliveryFee: 5,
      orderItem: [
        {
          id: "1212-sgsa1-12gs4-23s",
          itemId: "121l1-22l22-2l224-sag3",
          quantity: 2,
          observations: "little salt",
          unitPrice: 4,
          itemIdNavigation: {
            productIdNavigation: {
              name: "Rice with salt"
            },
            price: 4
          }
        },
        {
          id: "3343-sgsa1-12gs4-2231s",
          itemId: "121l1-22l22-2l224-sag3",
          quantity: 1,
          observations: "",
          unitPrice: 5,
          itemIdNavigation: {
            productIdNavigation: {
              name: "Soda Cocke"
            },
            price: 5
          }
        }
      ],
      orderEvent: [
        {
          code: "PLC",
          createdAt: "2024-01-02 20:01"
        },
        {
          code: "CFM",
          createdAt: "2024-01-02 20:02"
        },
        {
          code: "DSP",
          createdAt: "2024-01-02 20:20"
        },
      ],
      createdAt: "2024-01-02 20:00",
    },
    {
      id: "masterASDLK23I2K2",
      status: "Concluded",
      displayId: "1122",
      addressId: "123123-12-12123123-12312",
      merchantIdNavigation: {
        name: "Happy store",
        id: "04040-2939-2991-zz241",
        reference: "https://i.pinimg.com/originals/77/e5/0c/77e50c04f9f512a456eb3e135a1c013b.png",
      },
      orderItem: [
        {
          id: "1212-sgsa1-12gs4-23s",
          itemId: "121l1-22l22-2l224-sag3",
          quantity: 2,
          itemIdNavigation: {
            productIdNavigation: {
              name: "Rice with salt"
            },
            price: 2
          }
        }
      ],
      createdAt: "2024-01-02 20:50",



    },
    {
      id: "masterASDLK23I2K3",
      status: "Concluded",
      displayId: "1122",
      addressId: "123123-12-12123123-12312",
      merchantIdNavigation: {
        name: "Happy store",
        id: "04040-2939-2991-zz241",
        reference: "https://i.pinimg.com/originals/77/e5/0c/77e50c04f9f512a456eb3e135a1c013b.png",
      },
      orderItem: [
        {
          id: "1212-sgsa1-12gs4-23s",
          itemId: "121l1-22l22-2l224-sag3",
          quantity: 2,
          itemIdNavigation: {
            productIdNavigation: {
              name: "Rice with salt"
            },
            price: 2
          }
        }
      ],
      createdAt: "2024-03-02 21:00",



    }];
    this.eventSvc.startPooling(30);
  }
  checkDates() {
    try {
      var _self = this;
      if (this.orders) {
        var dates: string[] = [];
        _self.toShowDate = [];
        for (let index = 0; index < this.orders.length; index++) {
          const f = this.orders[index];
          var dt = "";
          if (f.createdAt) {
            dt = f.createdAt?.split(" ")[0];
          }
          if (dt && f.id && !(dates.indexOf(dt) >= 0)) {
            dates.push(dt);
            _self.toShowDate.push(f.id);
          }
        }
      }
    } catch (error) {

    }
  }
  backFunction() {

  }
  f(f: Order){
    console.log(f);
  }

  openOrder(order: Order) {
    var _self = this;
    var dialogRef = this.dialogSvc.open(
      {
        type: DialogType.MAT_DIALOG,
        component: OrderDetailComponent,
        closeOnNavigation: false,
        data: order
      }
    );
    dialogRef.afterClosed().subscribe(
      async (merchant: Order) => {
        if (merchant) {
          console.log('table afterClosed')

        }
      },
      (err: any) => {
        //console.log("err: " + err)
      }
    )
  }
  openOrderInProgress(order: Order) {
    var _self = this;
    var dialogRef = this.dialogSvc.open(
      {
        type: DialogType.MAT_DIALOG,
        component: OrderInProgressComponent,
        closeOnNavigation: false,
        data: order
      }
    );
    dialogRef.afterClosed().subscribe(
      async (merchant: Order) => {
        if (merchant) {
          console.log('table afterClosed')

        }
      },
      (err: any) => {
        //console.log("err: " + err)
      }
    )
  }

  help() {

  }
  add() {

  }

  async ngOnInit(): Promise<void> {
    var orders=await this.orderStorageSvc.dataBase.orders.toArray();
    if (this.id && orders) {
      var o = Enumerable.from(orders).where(x => x.order.id == this.id).defaultIfEmpty(undefined).firstOrDefault();
      if (o) {
        if (o.order.status == "CON") {
          this.openOrder(o.order);
        } else {
          this.openOrderInProgress(o.order);
        }
      }
    }
  }

}
