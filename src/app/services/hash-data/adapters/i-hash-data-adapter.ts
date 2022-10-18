import { Observable } from "rxjs";
import { CustomerAppEndpoint } from "src/app/api/models/customer-app-endpoint";

export interface IHashDataAdapter{
    endpoint: CustomerAppEndpoint;
    onNewHashData:Observable<string>

}