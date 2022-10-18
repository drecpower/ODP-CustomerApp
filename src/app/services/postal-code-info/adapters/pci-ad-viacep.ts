import { Address } from "src/app/api/models";
import { IPostalCodeInfoAdapter } from "./i-postalcodeinfo-adapter";
import { HttpClient, HttpXhrBackend } from "@angular/common/http";


export class PciAdViaCep implements IPostalCodeInfoAdapter {
    // address: Address = null;
    name:string|undefined;
    getAddressByPostalCode(postalCode: string): Promise<Address> {
        return new Promise<Address>((resolve, reject) => {
            var address: Address = <Address>({});
            const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
            httpClient.get("https://viacep.com.br/ws/" + postalCode + "/json/").subscribe({
                next: (data: any) => {
                    if (data) {
                        address.postalCode = data["cep"];
                        address.streetName = data["logradouro"];
                        address.neighborhood = data["bairro"];
                        address.city = data["localidade"];
                        address.state = data["uf"];
                        resolve(address);
                    }
                }, error: (e) => {
                    reject(e);
                }

            });
        });

    }
}