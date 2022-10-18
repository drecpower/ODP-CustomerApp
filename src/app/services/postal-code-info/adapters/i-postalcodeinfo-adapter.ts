import { Address } from "src/app/api/models";

export interface IPostalCodeInfoAdapter{ 
    name:string|undefined;
    getAddressByPostalCode(postalCode: string|undefined): Promise<Address>;

} 