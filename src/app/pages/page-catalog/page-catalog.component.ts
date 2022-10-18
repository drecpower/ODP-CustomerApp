import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { animSlideInOutAnimation } from 'src/app/shared/animations';
import { Location } from '@angular/common';
import { Item } from 'src/app/api/models';
import { DtoPizzaSizeFraction } from 'src/app/dto/dto-pizza-size-fraction';
import { JsonParser } from 'dexie-export-import/dist/json-stream';

@Component({ 
  selector: 'app-page-catalog',
  templateUrl: './page-catalog.component.html',
  styleUrls: ['./page-catalog.component.scss'],
  animations: [
    animSlideInOutAnimation
  ]
})
export class PageCatalogComponent implements OnInit {

  id?: string;
  pizza?:DtoPizzaSizeFraction;
  
  constructor(private route: ActivatedRoute, public location: Location) {
    this.processStateLocation();
    try {
      this.id = this.route.snapshot.params["id"];
    } catch (ex) {

    }
    this.route.params.subscribe(
      (params: any) => {
        if (params.id) {
          this.id = params.id;
        } else {
          localStorage.removeItem(this.id!+"_PIZZA");
          this.id = undefined;
          this.pizza = undefined;
        }
        this.processStateLocation();
      }
    )
  }
  processStateLocation(){
    try {
      var state = <DtoPizzaSizeFraction>this.location.getState();
      if (state.selectedFraction) {
        this.pizza = state;
        localStorage.setItem(state.id!+"_PIZZA", JSON.stringify(state));
      }else{
        this.pizza = JSON.parse(localStorage.getItem(this.id!+"_PIZZA")!);
      }
    } catch (error) {
    }
  }
  ngOnInit(): void {
  }

}
