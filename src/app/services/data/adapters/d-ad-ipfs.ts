import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import * as Enumerable from "linq";
import { Catalog, Category, Coupon, CustomerAppEndpoint, Item, Merchant, MerchantGroup, OptionGroup, PaymentMethod, Product } from "src/app/api/models";
import { DtoEndpoint } from "src/app/dto/dto-endpoint";
import { IDataAdapter } from "./i-data-adapter";

export class DAdIpfs implements IDataAdapter {
  endpoint: CustomerAppEndpoint;
  currentUri: string;

  constructor(endpoint: CustomerAppEndpoint) {
    this.endpoint = endpoint;
    this.currentUri = endpoint.uri!;
  }
  async brandData(id: string): Promise<MerchantGroup | undefined> {
    var _self = this;
    return new Promise<any>(
      async (resolve, reject) => {
        var ret = undefined;
        if (_self.fullData) {
          ret = _self.fullData;
        }
        try {
          ret = await this.get(id);
        } catch (error) {
          reject();
          return;
        }

        if (ret) {
          _self.fullData = ret;
          console.log("fullData")
          resolve(ret);
        }
        else {
          reject();
        }
      });
  }

  categories(brandId: string, merchantId: string, catalogId: string): Promise<Category[] | undefined> {
    var _self = this;
    return new Promise<Category[] | undefined>(
      async (resolve, reject) => {
        var ret = undefined;
        if (_self.fullData && _self.fullData.merchant) {
          var m = Enumerable.from(_self.fullData.merchant).where(x => x.id == merchantId).defaultIfEmpty(undefined).firstOrDefault();
          if (m && m.catalog) {
            var cat = Enumerable.from(m.catalog).where(x => x.id == catalogId).defaultIfEmpty(undefined).firstOrDefault();
            if (cat && cat.category) {
              ret = cat.category;
            }
          }
        }
        if (!ret) {
          try {
            ret = await this.get("merchant/" + merchantId + "/catalog/" + catalogId + "/category-list");
          } catch (error) {
            reject();
            return;
          }

        }
        if (ret) {
          resolve(ret);
        }
        else {
          reject();
        }
      });
  }

  items(brandId: string, merchantId: string, catalogId: string, categoryId: string): Promise<Item[] | undefined> {
    var _self = this;
    return new Promise<Item[] | undefined>(
      async (resolve, reject) => {
        var ret = undefined;
        if (_self.fullData && _self.fullData.merchant) {
          var m = Enumerable.from(_self.fullData.merchant).where(x => x.id == merchantId).defaultIfEmpty(undefined).firstOrDefault();
          if (m && m.catalog) {
            var cat = Enumerable.from(m.catalog).where(x => x.id == catalogId).defaultIfEmpty(undefined).firstOrDefault();
            if (cat && cat.category) {
              var category = Enumerable.from(cat.category!).where(x => x.id == categoryId).defaultIfEmpty(undefined).firstOrDefault();
              if (category && category.item) {
                ret = category.item;
              }
            }
          }
        }
        if (!ret) {
          try {
            ret = await this.get("merchant/" + merchantId + "/catalog/" + catalogId + "/category/" + categoryId + "/items-list");

          } catch (error) {
            reject();
            return;
          }
        }
        if (ret) {
          for (let i = 0; i < ret.length; i++) {
            ret[i].price -= 0;
          }
          resolve(ret);
        }
        else {
          reject();
        }
      });
  }

  product(id: string): Promise<Product | undefined> {
    var _self = this;
    return new Promise<Product | undefined>(
      async (resolve, reject) => {
        var ret = undefined;
        if (_self.fullData) {
          var p = Enumerable.from(_self.fullData!.product!).where(x => x.id == id).defaultIfEmpty(undefined).firstOrDefault();
          if (p) {
            ret = p
          }
        }
        if (!ret && id != undefined) {
          try {
            ret = await this.get("product/" + id);

          } catch (error) {
            reject();
            return;
          }
        }
        if (ret) {
          resolve(ret);
        }
        else {
          reject();
        }
      });
  }

  products(brandId: string): Promise<Product[] | undefined> {
    var _self = this;
    return new Promise<Product[] | undefined>(
      async (resolve, reject) => {
        var ret = undefined;
        if (_self.fullData && _self.fullData.product) {
          ret = _self.fullData.product
        }
        if (!ret) {
          try {
            ret = await this.get("product-list");
          } catch (error) {
            reject();
            return;
          }

        }
        if (ret) {
          if (_self.fullData) {
            _self.fullData.product = ret;
          }
          resolve(ret);
        }
        else {
          reject();
        }
      });
  }
  catalogs(brandId: string, merchantId: string): Promise<Catalog[] | undefined> {
    var _self = this;
    return new Promise<Catalog[] | undefined>(
      async (resolve, reject) => {
        var ret = undefined;
        console.log("catalogs()");
        console.dir(_self.fullData);
        if (_self.fullData && _self.fullData.merchant) {
          var m = Enumerable.from(_self.fullData.merchant).where(x => x.id == merchantId).defaultIfEmpty(undefined).firstOrDefault();
          if (m && m.catalog) {
            ret = m.catalog;
          }
        }
        if (!ret) {
          try {
            ret = await this.get("merchant/" + merchantId + "/catalog-list");
          } catch (error) {
            reject();
            return;
          }

        }
        if (ret) {
          resolve(ret);
        }
        else {
          reject();
        }
      });
  }

  coupons(brandId: string, merchantId: string): Promise<Coupon[] | undefined> {
    return new Promise<Coupon[] | undefined>(
      async (resolve, reject) => {
        var ret = undefined;
        try {
          ret = await this.get("merchant/" + merchantId + "/coupon-list");
        } catch (error) {
          reject();
          return;
        }
        if (ret) {
          resolve(ret);
        }
        else {
          reject();
        }
      });
  }
  paymentMethods(brandId: string, merchantId: string): Promise<PaymentMethod[] | undefined> {
    return new Promise<PaymentMethod[] | undefined>(
      async (resolve, reject) => {
        var ret = undefined;
        try {
          ret = await this.get("merchant/" + merchantId + "/payment-method-list");
        } catch (error) {
          reject();
          return;
        }
        if (ret) {
          resolve(ret);
        }
        else {
          reject();
        }
      });
  }
  customerAppEndpoints(brandId: string, merchantId: string): Promise<CustomerAppEndpoint[] | undefined> {
    return new Promise<CustomerAppEndpoint[] | undefined>(
      async (resolve, reject) => {
        var ret = undefined;
        try {
          ret = await this.get("merchant/" + merchantId + "/customer-app-endpoint-list");
        } catch (error) {
          reject();
          return;
        }
        if (ret) {
          resolve(ret);
        }
        else {
          reject();
        }
      });
  }

  item(id: string, includeProduct?: boolean, includeCategory?: boolean): Promise<Item | undefined> {
    var _self = this;
    return new Promise<Item | undefined>(
      async (resolve, reject) => {
        console.log("item")
        var ret: Item | undefined = undefined;
        var includes = [];
        if (includeProduct) {
          includes.push("productIdNavigation")
        }
        if (includeCategory) {
          includes.push("categoryIdNavigation")
        }
        if (_self.fullData) {
          try {
            _self.fullData.merchant?.forEach(function (m) {
              m.catalog?.forEach(function (catalog) {
                catalog.category?.forEach(function (categ) {
                  categ.item?.forEach(function (i) {
                    console.log('.')
                    if (i.id == id) {
                      if (includeProduct && _self.fullData?.product) {
                        var p = Enumerable.from(_self.fullData.product).where(x => x.id == i.productId).defaultIfEmpty(undefined).firstOrDefault();
                        if (p) {
                          i.productIdNavigation = p;
                        }
                      }
                      ret = i;
                      resolve(i);
                      console.dir(i);
                      console.log("find item")
                      throw new Error("find");
                      return;

                    }
                  });
                  if (ret) { return; }
                });
                if (ret) { return; }
              });
              if (ret) { return; }
            });
          } catch (error) {

          }
        }
        if (!ret) {
          try {
            ret = await this.get("item", id, includes);
          } catch (error) {
            reject();
            return;
          }
          if (ret) {
            ret.price! -= 0;
            resolve(ret);
          }
          else {
            reject();
          }
        }
      });
  }

  optionGroup(brandId: string, merchantId: string, id: string): Promise<OptionGroup | undefined> {
    var _self = this;
    return new Promise<Product | undefined>(
      async (resolve, reject) => {
        var ret = undefined;
        if (_self.fullData && _self.fullData.merchant) {
          var m = Enumerable.from(_self.fullData.merchant).where(x => x.id == merchantId).defaultIfEmpty(undefined).firstOrDefault();
          if (m && m.optionGroup) {
            var opG = Enumerable.from(m.optionGroup).where(x => x.id == id).defaultIfEmpty(undefined).firstOrDefault();
            if (opG) {
              ret = opG;
            }
          }
        }
        if (!ret) {
          try {
            ret = await this.get("merchant/" + merchantId + "/option-group", id);
          } catch (error) {
            reject();
            return;
          }
        }
        if (ret) {
          resolve(ret);
        }
        else {
          reject();
        }
      });
  }

  catalog(id: string, merchantId: string): Promise<Product | undefined> {
    var _self = this;
    return new Promise<Product | undefined>(
      async (resolve, reject) => {
        var ret = undefined;
        if (_self.fullData && _self.fullData.merchant) {
          var m = Enumerable.from(_self.fullData.merchant).where(x => x.id == merchantId).defaultIfEmpty(undefined).firstOrDefault();
          if (m && m.catalog) {
            var cat = Enumerable.from(m.catalog).where(x => x.id == id).defaultIfEmpty(undefined).firstOrDefault();
            if (cat) {
              ret = cat;
            }
          }
        }
        if (!ret) {
          try {
            ret = await this.get("catalog", id);
          } catch (error) {
            reject();
            return;
          }
        }
        if (ret) {
          resolve(ret);
        }
        else {
          reject();
        }
      });
  }
  merchants(brandId: string): Promise<Merchant[] | undefined> {
    var _self = this;
    return new Promise<Merchant[] | undefined>(
      async (resolve, reject) => {
        var ret = undefined;
        if (_self.fullData && _self.fullData.merchant) {
          ret = _self.fullData.merchant;
        }
        if (!ret) {
          try {
            ret = await this.get("merchant-list");
          } catch (error) {
            reject();
            return;
          }
        }
        if (ret) {
          resolve(ret);
        }
        else {
          reject();
        }
      });
  }

  fullData: MerchantGroup | undefined;
  async get(entity: string, id?: string, navigations?: string[]) {
    var _self = this;
    var p = new Promise<any>(
      async (resolve, reject) => {
        try {
          var req = entity;

          if (id) {
            req += "/" + id
          }
          var obj = await this.getJson(req);
          if (navigations && navigations.length > 0) {
            navigations.forEach(async element => {
              var entityName = element.substring(0, element.toLowerCase().indexOf("idnavigation"));
              if (obj[element]) {
                obj[entityName + "Id"] = obj[element].id;
              } else {
                var path = entityName + "/" + obj[entityName + "Id"];
                obj[element] = await this.getJson(path);
              }

            });
          }
          resolve(obj);
        } catch (error) {
          reject(error);
        }
      }
    );
    return p;
  }
  getJson(path: string) {
    var _self = this;
    const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
    var dtoEndpoint = new DtoEndpoint(this.endpoint);
    //console.log('getJson');
    //console.log(dtoEndpoint.fullPath("/" + path + ".json"));

    var p = new Promise<any>(
      async (resolve, reject) => {
        httpClient.get(dtoEndpoint.fullPath("/" + path + ".json", this.currentUri)).subscribe({
          next: (data) => {
            // //console.log('next');
            // console.dir(data);
            if (path.indexOf("merchant-group") >= 0) {
              _self.fullData = data;
            }
            resolve(data);
          }, error: (e) => {
            reject(e);
          }
        }
        )
      }
    );
    return p;
  }

}

// if (entity == "catalog-list") {
//   var c = Enumerable.from(_self.fullData.merchant!).where(x => x.id == id).defaultIfEmpty(undefined).firstOrDefault();
//   if (c) {
//     resolve(c.catalog);
//     return;
//   }
// }

// if (entity == "category") {
//   var m = Enumerable.from(_self.fullData.merchant!).where(x => x.id == merchantId).defaultIfEmpty(undefined).firstOrDefault();
//   if (m) {
//     var cat = Enumerable.from(m.catalog!).where(x => x.id == catalogId).defaultIfEmpty(undefined).firstOrDefault();
//     if (cat) {
//       var category = Enumerable.from(cat.category!).where(x => x.id == id).defaultIfEmpty(undefined).firstOrDefault();
//       if (category) {
//         resolve(category);
//         return;
//       }
//     }
//   }
// }
