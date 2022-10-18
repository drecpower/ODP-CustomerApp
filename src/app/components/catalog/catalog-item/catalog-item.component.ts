import { Component, Input, OnInit } from '@angular/core';
import * as Enumerable from 'linq';
import { Item } from 'src/app/api/models/item';
import { DataService } from 'src/app/services/data/data.service';
import { ManifestService } from 'src/app/services/manifest.service';
import { SelectedService } from 'src/app/services/selected/selected.service';

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.scss']
})
export class CatalogItemComponent implements OnInit {

  @Input() item:Item={};
  ready:boolean =false;
  loading:boolean =false;
  ipfsgatewayUri:string="";
  
  constructor( public dataSvc:DataService,public selectedSvc:SelectedService,public manifestSvc:ManifestService) { 
    
  }

  async get(id: string) {
    try {
      if (id){
        this.item.productIdNavigation = await this.dataSvc.product(id);
      this.ready=true;
      }
      
    } catch (error) {
    }
    finally {
    } 
  }

  ngOnInit(): void {
  
  this.get(this.item.productId!);
  }

}
