import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-catalog-footer',
  templateUrl: './catalog-footer.component.html',
  styleUrls: ['./catalog-footer.component.scss']
})
export class CatalogFooterComponent implements OnInit {

  constructor(public cartSvc: CartService, private router: Router) { }

  ngOnInit(): void {
  }
  goCart() {
    this.router.navigateByUrl('/cart');
  }

}
