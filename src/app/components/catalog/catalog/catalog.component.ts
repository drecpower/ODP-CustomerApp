import { Component, OnInit } from '@angular/core';
import * as Enumerable from 'linq';
import { Catalog } from 'src/app/api/models/catalog';
import { AppshellService } from 'src/app/services/appshell.service';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data/data.service';
import { SelectedService } from 'src/app/services/selected/selected.service';
import { animFadeInOutAnimation, animFastFadeInOutAnimation, animRouteTransition, AnimSlowFadeInOutAnimation, longAnimFadeInOutAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  animations: [
    animFadeInOutAnimation,
    animRouteTransition,
    animFastFadeInOutAnimation,
    longAnimFadeInOutAnimation,
    AnimSlowFadeInOutAnimation
  ]
})
export class CatalogComponent implements OnInit {
  ready: boolean = false;
  // loading: boolean = true;
  catalogs: Catalog[] = [];
  constructor(public cartSvc: CartService, public selectedSvc: SelectedService, private appshellSvc: AppshellService) {
    var _self = this;
    this.selectedSvc.onSelectCatalog.subscribe(d => {
      //  this.ready=false;
      console.warn('CatalogComponent.onSelectCatalog')
      console.dir(d);
      setTimeout(function () {
        _self.ready = true;
        // _self.loading = false;
      }, 1)
    });
    this.cartSvc.isReadyAsync.subscribe(d => {
      if (d) {
        console.log("CatalogComponent.cartSvc.isReadyAsync");
        if (_self.selectedSvc.selectedCatalog != undefined) {
          _self.ready = true;
          // _self.loading = false;
        } else {
          _self.setCatalog();
        }
      }
    })
    if (this.selectedSvc.selectedCatalog == undefined) {
      this.setCatalog();
    } else {
      // this.loading = false;
      this.ready = true;
    }
  }
  ngOnInit(): void {

  }
  async setCatalog() {
    // this.loading = true;
    this.ready = false;
    try {
      if (this.cartSvc.isReady) {
        await this.selectedSvc.checkMerchant();
        if(this.selectedSvc.selectedCatalog == undefined){
          // this.loading=false;
          this.ready=false;
        }
      }
    } catch (error) {
      // this.loading = false;
      this.ready = false;
    }
    finally {
    }
  }
}
