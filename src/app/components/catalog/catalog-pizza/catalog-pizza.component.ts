import { Component, OnInit, Input } from '@angular/core';
import { DtoPizzaSizeFraction } from 'src/app/dto/dto-pizza-size-fraction';
import { DataService } from 'src/app/services/data/data.service';
import { SelectedService } from 'src/app/services/selected/selected.service';

@Component({
  selector: 'app-catalog-pizza',
  templateUrl: './catalog-pizza.component.html',
  styleUrls: ['./catalog-pizza.component.scss']
})
export class CatalogPizzaComponent implements OnInit {

  @Input() pizza:DtoPizzaSizeFraction={};
  constructor( public dataSvc:DataService,public selectedSvc:SelectedService) { }

  ngOnInit(): void {
  }

}
