import * as Enumerable from "linq";
import { Address } from "src/app/api/models";
import { IGeocoderAdapter } from "./i-geocoder-adapter";

export class GeoAdGoogle implements IGeocoderAdapter {
    getAddressByLatLong(lat: number, long: number): Promise<Address> {
        //console.log('GeoAdGoogle')
        var address: Address={
            latitude:lat,
            longitude:long
        };
        return new Promise<Address>((resolve, reject) => {
            var pos = new google.maps.LatLng(lat,
                long);
            var _gc = new google.maps.Geocoder();
            _gc.geocode(<any>{
                location: pos
            }, function (d) {
                console.dir(d);
                try {
                    var list = Enumerable.from(d)
                        .where(p => p.types.indexOf("street_address") >= 0)
                        .select(p => p)
                        .defaultIfEmpty(undefined)
                        .firstOrDefault();
                    if(list ==undefined){
                        list = Enumerable.from(d)
                        .where(p => p.types.indexOf("premise") >= 0)
                        .select(p => p)
                        .defaultIfEmpty(undefined)
                        .firstOrDefault();
                    }
                    if (list != null) {
                        
                        var postalCode = Enumerable.from(list.address_components)
                            .where(p => p.types.indexOf("postal_code") >= 0)
                            .select(p => p.short_name)
                            .defaultIfEmpty(undefined)
                            .firstOrDefault();
                        if (postalCode) {
                            address.postalCode = postalCode;
                        }

                        var streetName = Enumerable.from(list.address_components)
                            .where(p => p.types.indexOf("route") >= 0)
                            .select(p => p.long_name)
                            .defaultIfEmpty(undefined)
                            .firstOrDefault();
                        if (streetName) {
                            address.streetName = streetName;
                        }
                        var neighborhood = Enumerable.from(list.address_components)
                            .where(p => p.types.indexOf("sublocality") >= 0)
                            .select(p => p.long_name)
                            .defaultIfEmpty(undefined)
                            .firstOrDefault();
                        if (neighborhood) {
                            address.neighborhood = neighborhood;
                        }

                        var city = Enumerable.from(list.address_components)
                            .where(p => p.types.indexOf("administrative_area_level_2") >= 0)
                            .select(p => p.long_name)
                            .defaultIfEmpty(undefined)
                            .firstOrDefault();
                        if (city) {
                            address.city = city;
                        }
                        var state = Enumerable.from(list.address_components)
                            .where(p => p.types.indexOf("administrative_area_level_1") >= 0)
                            .select(p => p.short_name)
                            .defaultIfEmpty(undefined)
                            .firstOrDefault();
                        if (state) {
                            address.state = state;
                        }
                        var country = Enumerable.from(list.address_components)
                            .where(p => p.types.indexOf("country") >= 0)
                            .select(p => p.short_name)
                            .defaultIfEmpty(undefined)
                            .firstOrDefault();
                        if (country) {
                            address.country = country;
                        }
                        if (address.postalCode) {
                            resolve(address);
                        } else {
                            reject();
                        }
                    }
                } catch (error) {
                    //console.log('reject GeoAdGoogle')
                    reject()
                }
            });
        });
    };
}