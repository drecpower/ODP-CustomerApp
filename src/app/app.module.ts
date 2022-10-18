import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { HeaderComponent } from './components/header/header.component';
import { CatalogHeaderComponent } from './components/catalog/catalog-header/catalog-header.component';
import { CatalogContentComponent } from './components/catalog/catalog-content/catalog-content.component';
import { CatalogItemComponent } from './components/catalog/catalog-item/catalog-item.component';
import { PageCatalogComponent } from './pages/page-catalog/page-catalog.component';
import { CatalogComponent } from './components/catalog/catalog/catalog.component';
import { HttpClientModule } from "@angular/common/http";
import { CatalogItemDetailComponent } from './components/catalog/catalog-item-detail/catalog-item-detail.component';
import { FormsModule } from '@angular/forms';
import { CatalogFooterComponent } from './components/catalog/catalog-footer/catalog-footer.component';
import { PageCartComponent } from './pages/page-cart/page-cart.component';
import { CartComponent } from './components/cart/cart/cart.component';
import { CartItemsComponent } from './components/cart/cart-items/cart-items.component';
import { CartValuesComponent } from './components/cart/cart-values/cart-values.component';
import { CartOrderTypeComponent } from './components/cart/cart-order-type/cart-order-type.component';
import { CartPaymentComponent } from './components/cart/cart-payment/cart-payment.component';
import { CartCouponsComponent } from './components/cart/cart-coupons/cart-coupons.component';
import { CartBuyTooComponent } from './components/cart/cart-buy-too/cart-buy-too.component';
import { PageAddressComponent } from './pages/page-address/page-address.component';
import { ChooseAddressComponent } from './components/choose-address/choose-address.component';
import { ChooseAddressDeliveryComponent } from './components/choose-address/choose-address-delivery/choose-address-delivery.component';
import { ChooseAddressTakeoutComponent } from './components/choose-address/choose-address-takeout/choose-address-takeout.component';
import { CatalogItemOptionGroupComponent } from './components/catalog/catalog-item-option-group/catalog-item-option-group.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { PagePaymentComponent } from './pages/page-payment/page-payment.component';
import { ChoosePaymentComponent } from './components/choose-payment/choose-payment.component';
import { ChoosePaymentByAppComponent } from './components/choose-payment/choose-payment-by-app/choose-payment-by-app.component';
import { ChoosePaymentOnDeliveryComponent } from './components/choose-payment/choose-payment-on-delivery/choose-payment-on-delivery.component';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

import { CardComponent } from './components/card/card.component';
import { ChooseCardTypeComponent } from './components/choose-card-type/choose-card-type.component';
import { CartOrderTypeDeliveryWhereToLeaveComponent } from './components/cart/cart-order-type-delivery-where-to-leave/cart-order-type-delivery-where-to-leave.component';
import { CartChooseAddressComponent } from './components/cart/cart-choose-address/cart-choose-address.component';
import { CartChooseTimeComponent } from './components/cart/cart-choose-time/cart-choose-time.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CartTotalFooterComponent } from './components/cart/cart-total-footer/cart-total-footer.component';
import { ChooseOrderTypeComponent } from './components/choose-order-type/choose-order-type.component';
import { ChooseStreetNumberComponent } from './components/choose-street-number/choose-street-number.component';
import { ChooseMerchantComponent } from './components/choose-merchant/choose-merchant.component';
import { DeleteOrEditAddressComponent } from './components/delete-or-edit-address/delete-or-edit-address.component';
import { AddressEditorComponent } from './components/address-editor/address-editor.component';
import { ChooseDeliveryTimeWindowComponent } from './components/choose-delivery-time-window/choose-delivery-time-window.component';
import { SwitchOrderTypeComponent } from './components/switch-order-type/switch-order-type.component';
import { AddressHeaderComponent } from './components/address-header/address-header.component';
import { InfoComponent } from './components/info/info.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { MyOrdersComponent } from './components/order/my-orders/my-orders.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { OrderInProgressComponent } from './components/order/order-in-progress/order-in-progress.component';
import { PageMyOrdersComponent } from './pages/page-my-orders/page-my-orders.component';
import { CartConfirmationComponent } from './components/cart/cart-confirmation/cart-confirmation.component';
import { CartSendSplashComponent } from './components/cart/cart-send-splash/cart-send-splash.component';
import { CustomerEditorComponent } from './components/customer-editor/customer-editor.component';
import { CatalogPizzaComponent } from './components/catalog/catalog-pizza/catalog-pizza.component';
import { CatalogPizzaDetailComponent } from './components/catalog/catalog-pizza-detail/catalog-pizza-detail.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PageHomeComponent,
    HeaderComponent,
    CatalogComponent,
    CatalogHeaderComponent,
    CatalogContentComponent,
    CatalogItemComponent,
    PageCatalogComponent,
    CatalogItemDetailComponent,
    CatalogFooterComponent,
    PageCartComponent,
    CartComponent,
    CartItemsComponent,
    CartValuesComponent,
    CartOrderTypeComponent,
    CartPaymentComponent,
    CartCouponsComponent,
    CartBuyTooComponent,
    PageAddressComponent,
    ChooseAddressComponent,
    ChooseAddressDeliveryComponent,
    ChooseAddressTakeoutComponent,
    CatalogItemOptionGroupComponent,
    CouponsComponent,
    PagePaymentComponent,
    ChoosePaymentComponent,
    ChoosePaymentByAppComponent,
    ChoosePaymentOnDeliveryComponent,
    CardComponent,
    ChooseCardTypeComponent,
    CartOrderTypeDeliveryWhereToLeaveComponent,
    CartChooseAddressComponent,
    CartChooseTimeComponent,
    LoadingComponent,
    CartTotalFooterComponent,
    ChooseOrderTypeComponent,
    ChooseStreetNumberComponent,
    ChooseMerchantComponent,
    DeleteOrEditAddressComponent,
    AddressEditorComponent,
    ChooseDeliveryTimeWindowComponent,
    SwitchOrderTypeComponent,
    AddressHeaderComponent,
    InfoComponent,
    SplashScreenComponent,
    MyOrdersComponent,
    OrderDetailComponent,
    OrderInProgressComponent,
    PageMyOrdersComponent,
    CartConfirmationComponent,
    CartSendSplashComponent,
    CustomerEditorComponent,
    CatalogPizzaComponent,
    CatalogPizzaDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    PagePaymentComponent
  ]
})
export class AppModule { }
