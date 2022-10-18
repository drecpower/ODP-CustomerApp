import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-my-orders',
  templateUrl: './page-my-orders.component.html',
  styleUrls: ['./page-my-orders.component.scss']
})
export class PageMyOrdersComponent implements OnInit {
id:string|undefined;
  constructor(private route: ActivatedRoute) {
    try {
      if (this.route.snapshot.params["id"]) {
        this.id = this.route.snapshot.params["id"];
      }
    } catch (ex) {

    }
  }

  ngOnInit(): void {
  }

}
