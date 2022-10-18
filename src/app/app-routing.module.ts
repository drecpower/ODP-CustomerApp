import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseAddressComponent } from './components/choose-address/choose-address.component';
import { PageCartComponent } from './pages/page-cart/page-cart.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageCatalogComponent } from './pages/page-catalog/page-catalog.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { PagePaymentComponent } from './pages/page-payment/page-payment.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChooseOrderTypeComponent } from './components/choose-order-type/choose-order-type.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { MyOrdersComponent } from './components/order/my-orders/my-orders.component';
import { PageMyOrdersComponent } from './pages/page-my-orders/page-my-orders.component';

const routes: Routes = [
  {
    path: "home", component: PageHomeComponent, data: { animation: 'home' }
  }, 
  {
    path: "home2", component: SplashScreenComponent, data: { animation: 'home' }
  },
  {
    path: "catalog", redirectTo: 'catalog/', pathMatch: 'full'
  },
  {
    path: "catalog/:id", component: PageCatalogComponent
  },
  {
    path: "cart", redirectTo: 'cart/', pathMatch: 'full'
  },
  {
    path: "cart/:id", component: PageCartComponent, data: { animation: 'cart' }
  },
  {
    path: "cupom", component: CouponsComponent, data: { animation: 'cupom' }
  },
  {
    path: "payment", component: PagePaymentComponent, data: { animation: 'cupom' }
  },
  {
    path: "cart/:id/:index/:template/:categoryId", component: PageCartComponent
  },
  {
    path: "cart/:id/:index", component: PageCartComponent
  },
  {
    path: "choose-address", component: ChooseAddressComponent, data: { animation: 'choose-address' }
  },
  {
    path: "choose-order-type", component: ChooseOrderTypeComponent, data: { animation: 'choose-order-type' }
  },
  {
    path: "my-orders",redirectTo:'my-orders/',pathMatch:'full'
  },
  {
    path: "my-orders/:id", component: PageMyOrdersComponent, data: { animation: 'my-orders' }
  },
  { path: '**', redirectTo: 'catalog/',pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true }), BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
