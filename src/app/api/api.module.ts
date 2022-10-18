/* tslint:disable */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationInterface } from './api-configuration';

import { AddressService } from './services/address.service';
import { AuthenticationService } from './services/authentication.service';
import { BrandService } from './services/brand.service';
import { CatalogService } from './services/catalog.service';
import { CategoryService } from './services/category.service';
import { CouponService } from './services/coupon.service';
import { CustomerService } from './services/customer.service';
import { CustomerAppEndpointService } from './services/customer-app-endpoint.service';
import { DataDicService } from './services/data-dic.service';
import { EventsService } from './services/events.service';
import { HashaService } from './services/hasha.service';
import { HashDataService } from './services/hash-data.service';
import { ItemService } from './services/item.service';
import { MasterOrderService } from './services/master-order.service';
import { MdDataContextService } from './services/md-data-context.service';
import { MerchantService } from './services/merchant.service';
import { MerchantGroupService } from './services/merchant-group.service';
import { MerchantsService } from './services/merchants.service';
import { OptionService } from './services/option.service';
import { OptionGroupService } from './services/option-group.service';
import { OptionGroupProductService } from './services/option-group-product.service';
import { OrderService } from './services/order.service';
import { OrderEventService } from './services/order-event.service';
import { OrderItemService } from './services/order-item.service';
import { OrderItemOptionService } from './services/order-item-option.service';
import { PaymentMethodService } from './services/payment-method.service';
import { ProductService } from './services/product.service';
import { SearchService } from './services/search.service';
import { SysService } from './services/sys.service';
import { WeatherForecastService } from './services/weather-forecast.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    AddressService,
    AuthenticationService,
    BrandService,
    CatalogService,
    CategoryService,
    CouponService,
    CustomerService,
    CustomerAppEndpointService,
    DataDicService,
    EventsService,
    HashaService,
    HashDataService,
    ItemService,
    MasterOrderService,
    MdDataContextService,
    MerchantService,
    MerchantGroupService,
    MerchantsService,
    OptionService,
    OptionGroupService,
    OptionGroupProductService,
    OrderService,
    OrderEventService,
    OrderItemService,
    OrderItemOptionService,
    PaymentMethodService,
    ProductService,
    SearchService,
    SysService,
    WeatherForecastService
  ],
})
export class ApiModule {
  static forRoot(customParams: ApiConfigurationInterface): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: {rootUrl: customParams.rootUrl}
        }
      ]
    }
  }
}
