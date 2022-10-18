import { Component, Input, OnInit } from '@angular/core';
import { DtoCart } from 'src/app/dto/dto-cart';
import { Item } from 'src/app/api/models/item';
import { IconsService } from 'src/app/services/icons.service';

@Component({
  selector: 'app-cart-buy-too',
  templateUrl: './cart-buy-too.component.html',
  styleUrls: ['./cart-buy-too.component.scss']
})
export class CartBuyTooComponent implements OnInit {

  recommendations: Item[] = []
  constructor(public icons: IconsService) { }

  ngOnInit(): void {
    this.recommendations = [{
      "id": "36147003-bb80-404d-8bb0-fd0dc111584c",
      "createdAt": "2020-09-10 22:33:10",
      "externalCode": "223",
      "index": 0,
      "productId": "706741d2-ec4c-4585-8063-02f92f9b27fe",
      "price": 12.34,
      "status": "active",
      productIdNavigation: {
        "id": "706741d2-ec4c-4585-8063-02f92f9b27fe",
        "createdAt": "2020-09-10 22:33:10",
        "name": "Coke",
        "description": "soda can coke flavor",
        "externalCode": "1",
        "status": "active",
        "image": "https://media.istockphoto.com/photos/coke-picture-id458464735?k=20&m=458464735&s=612x612&w=0&h=CW8rzEiIMvuO23X9I3b6U_g2aBUQSZnWYLjWauLMxtg="
      }
    },
    {
      "id": "509eef1e-e84e-4ffa-a5b8-28bc99bb8b6a",
      "createdAt": "2020-09-10 22:33:10",
      "externalCode": "224",
      "index": 0,
      "productId": "dc180dae-30c0-41de-a997-d6a14e155226",
      "price": 6.78,
      "status": "active",
      productIdNavigation: {
        "id": "dc180dae-30c0-41de-a997-d6a14e155226",
        "createdAt": "2020-09-10 22:33:10",
        "name": "Soda",
        "description": "soda can lemon flavor",
        "externalCode": "2",
        "status": "active",
        "image": "https://www.paodeacucar.com/img/uploads/1/904/11840904.jpg"
      }
    }
    ];
  }

}
  ''