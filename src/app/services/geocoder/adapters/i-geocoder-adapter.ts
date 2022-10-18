import { Address } from "src/app/api/models";

export interface IGeocoderAdapter{ 
    getAddressByLatLong(lat:number,long:number):Promise<Address>;
} 