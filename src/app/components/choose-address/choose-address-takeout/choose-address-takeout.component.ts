import { Component, OnInit } from '@angular/core';
import { IconsService } from 'src/app/services/icons.service';

@Component({
  selector: 'app-choose-address-takeout',
  templateUrl: './choose-address-takeout.component.html',
  styleUrls: ['./choose-address-takeout.component.scss']
})
export class ChooseAddressTakeoutComponent implements OnInit {

  constructor(
    public icons: IconsService

  ) { }

  ngOnInit(): void {
  }

}
