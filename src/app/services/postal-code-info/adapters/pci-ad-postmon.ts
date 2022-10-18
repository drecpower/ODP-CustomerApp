import { Address } from "src/app/api/models";
import { IPostalCodeInfoAdapter } from "./i-postalcodeinfo-adapter";

export class PciAdPostmon implements IPostalCodeInfoAdapter {
    name: string | undefined;
    getAddressByPostalCode(postalCode: string): Promise<Address> {
        throw new Error("Method not implemented.");
    }

}