import { Component, Input, OnInit } from '@angular/core';
import { DtoCart } from 'src/app/dto/dto-cart';
import { Router } from '@angular/router'
import { DtoCartItemCategory } from 'src/app/dto/dto-categorized-cart-items';
import { ManifestService } from 'src/app/services/manifest.service';
@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {

  @Input() categorizedItems?:DtoCartItemCategory[];
  constructor(
    private router:Router ,
    public manifestSvc:ManifestService
  ) {
    var a = this.categorizedItems;

  }

  ngOnInit(): void {
    var a = 1;
  }

  addMore(){
    this.router.navigateByUrl('/catalog');
  }

}
