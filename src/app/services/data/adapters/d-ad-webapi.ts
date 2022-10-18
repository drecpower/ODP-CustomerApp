import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { ApiConfiguration } from "src/app/api/api-configuration";
import { Catalog, Category, Coupon, CustomerAppEndpoint, Item, Merchant, MerchantGroup, OptionGroup, PaymentMethod, Product } from "src/app/api/models";
import { IDataAdapter } from "./i-data-adapter";

export class DAdWebApi implements IDataAdapter {
    endpoint: CustomerAppEndpoint;
    currentUri:string;
    constructor(endpoint: CustomerAppEndpoint) {
        this.endpoint = endpoint;
        this.currentUri=endpoint.uri!;
    }
    optionGroup(brandId: string, merchantId: string, id: string): Promise<OptionGroup | undefined> {
        throw new Error("Method not implemented.");
    }
    catalogs(brandId: string, merchantId: string): Promise<Catalog[] | undefined> {
        throw new Error("Method not implemented.");
    }
    brandData(id: string): Promise<MerchantGroup | undefined> {
        throw new Error("Method not implemented.");
    }
    merchants(brandId: string): Promise<Merchant[] | undefined> {
        throw new Error("Method not implemented.");
    }
    products(brandId: string): Promise<Product[] | undefined> {
        throw new Error("Method not implemented.");
    }
    categories(brandId: string, merchantId: string, catalogId: string): Promise<Category[] | undefined> {
        throw new Error("Method not implemented.");
    }
    items(brandId: string, merchantId: string, catalogId: string, categoryId: string): Promise<Item[] | undefined> {
        throw new Error("Method not implemented.");
    }
    product(id: string): Promise<Product | undefined> {
        throw new Error("Method not implemented.");
    }
    item(id: string, includeProduct?: boolean, includeCategory?: boolean): Promise<Item | undefined> {
        throw new Error("Method not implemented.");
    }
    coupons(brandId: string, merchantId: string): Promise<Coupon[] | undefined> {
        throw new Error("Method not implemented.");
    }
    paymentMethods(brandId: string, merchantId: string): Promise<PaymentMethod[] | undefined> {
        throw new Error("Method not implemented.");
    }
    customerAppEndpoints(brandId: string, merchantId: string): Promise<CustomerAppEndpoint[] | undefined> {
        throw new Error("Method not implemented.");
    }

    // private catalogSvc:CatalogService | undefined;
    // constructor(private endpoint:string) {

    // }
    // initialize() {
    //     var config = new ApiConfiguration();
    //     config.rootUrl = this.endpoint;
    //     const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
    //     this.catalogSvc = new CatalogService(config,httpClient);
    // }
    async get(entity: string, id: string, navigations?: string[], merchantId?: string,catalogId?:string,categoryId?:string) {


    }
}