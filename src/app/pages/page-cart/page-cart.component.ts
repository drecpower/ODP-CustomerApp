import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DtoPizzaSizeFraction } from 'src/app/dto/dto-pizza-size-fraction';
import { CartService } from 'src/app/services/cart.service';
import { OrderStorageService } from 'src/app/services/order-storage/order-storage.service';
import { PizzaFactoryService } from 'src/app/services/pizza-factory.service';
import { animSlideInOutAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-page-cart',
  templateUrl: './page-cart.component.html',
  styleUrls: ['./page-cart.component.scss'],
  animations: [
    animSlideInOutAnimation
  ]
})
export class PageCartComponent implements OnInit {
  id?: string;
  index?: number;
  template?: string;
  categoryId?: string;
  pizza?: DtoPizzaSizeFraction;
  cartModal: boolean = false;
  modalNames = ["items", "payment", "type"];
  constructor(private route: ActivatedRoute,public cartSvc:CartService,private pizzaFactorySvc: PizzaFactoryService) {
    try {
      if (this.modalNames.indexOf(this.route.snapshot.params["id"]) >= 0) {
        this.cartModal = true;
      }
      this.id = this.route.snapshot.params["id"];
    } catch (ex) {
    }
    // this.route.params.subscribe(
    //   (params: any) => {
    //     if (params.id && params.id!="payment") {
    //       this.id = params.id;
    //     } else {
    //       this.id = undefined;
    //     }
    //   }
    // )
    try {
      this.index = this.route.snapshot.params["index"];
    } catch (ex) {
    }
    try {
      this.template = this.route.snapshot.params["template"];
    } catch (ex) {
    }
    try {
      this.categoryId = this.route.snapshot.params["categoryId"];
    } catch (ex) {
    }
    if(this.template == "PIZZA"){
      this.createPizzaSizeFraction();
    }
    this.route.params.subscribe(
      (params: any) => {
        if (this.modalNames.indexOf(params.id) >= 0) {
          this.cartModal = true;
        }
        if (params.id) {
          this.id = params.id;
        } else {
          this.id = undefined;
        }
        if (params.index) {
          this.index = params.index;
        } else {
          this.index = undefined;
        }
        if (params.template) {
          this.template = params.template;
        } else {
          this.template = undefined;
        }
        if (params.categoryId) {
          this.categoryId = params.categoryId;
        } else {
          this.categoryId = undefined;
        }
        if(this.template == "PIZZA"){
          this.createPizzaSizeFraction();
        }
      }
    )
  }
  clearModal() {
    this.cartModal = false;
    this.id = "";
  }

  ngOnInit(): void {
  }

  async createPizzaSizeFraction(){
    var _self = this;
    var itemCart = _self.cartSvc.getCartItem(_self.categoryId, _self.index!);

    _self.pizza = await _self.pizzaFactorySvc.create(_self.id!,undefined, itemCart?.fractions, itemCart?.sizeOptionGroupId);
  }
}
