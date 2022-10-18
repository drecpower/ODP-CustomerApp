import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { HashDataService } from 'src/app/services/hash-data/hash-data.service';
import { SelectedService } from 'src/app/services/selected/selected.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenComponent implements OnInit {

  constructor(public selectedSvc: SelectedService,
    public cartSvc:CartService,
    public hashDataSvc:HashDataService) { }
  showProcessName: boolean = false;
  ngOnInit(): void {
    var _self = this;
    setTimeout(() => {
      _self.showProcessName = true;
    }, 3000);
  }

}
