import { Catalog, Category, Coupon, CustomerAppEndpoint, Item, Merchant, MerchantGroup, OptionGroup, PaymentMethod, Product } from "src/app/api/models";

export interface IDataAdapter {
  endpoint: CustomerAppEndpoint;
  currentUri:string;
  get(entity: string, id: string, navigations?: string[],merchantId?:string,catalogId?:string,categoryId?:string): Promise<any>;
  brandData(id:string):Promise<MerchantGroup|undefined>;
  products(brandId:string):Promise<Product[]|undefined>;
  categories(brandId:string,merchantId:string,catalogId:string):Promise<Category[]|undefined>;
  product(id: string):Promise<Product|undefined>;
  item(id:string,includeProduct?:boolean,includeCategory?:boolean):Promise<Item|undefined>;
  optionGroup(brandId:string,merchantId:string,id:string):Promise<OptionGroup|undefined>
  coupons(brandId:string,merchantId:string):Promise<Coupon[]|undefined>;
  paymentMethods(brandId:string,merchantId:string):Promise<PaymentMethod[]|undefined>;
  customerAppEndpoints(brandId:string,merchantId:string):Promise<CustomerAppEndpoint[]|undefined>;
  catalogs(brandId:string,merchantId:string):Promise<Catalog[]|undefined>;
  merchants(brandId:string):Promise<Merchant[]|undefined>;
  items(brandId:string,merchantId:string,catalogId:string,categoryId:string):Promise<Item[]|undefined>;


  


  // name:string;
  // sourceName:string;
  // onNewEvents:Observable<DtoEvent[]>;
  // acknowledge(events:DtoEvent[]):void;
  // doPooling():void;
  // changeStatus(id:string,code:string):Promise<boolean>;
}