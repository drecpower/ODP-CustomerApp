import { Merchant } from "../api/models";
import { CustomerAppEndpoint } from "../api/models/customer-app-endpoint";

export class DtoEndpoint implements CustomerAppEndpoint {
    createdAt?: string;
    headers?: string;
    id?: string;
    index?: number;
    merchantId?: string;
    merchantIdNavigation?: Merchant;
    params?: string;
    privateKey?: string;
    protocolType?: string;
    publicKey?: string;
    status?: string;
    type?: string;
    uri?: string;
    fullPath(endPath?: string,currentUri:string|undefined=undefined) {
        var fullPath = "";
        if (currentUri==undefined)currentUri=this.uri;
        fullPath = currentUri ? currentUri : "";
        if (currentUri && currentUri?.indexOf("{") >= 0) {
            if (currentUri.indexOf("{") == 0) {
                fullPath = fullPath.substring(1, fullPath.length - 1);
            }
            if (currentUri.indexOf("{") == currentUri.length) {
                fullPath = fullPath.substring(0, fullPath.length - 2);
            }
            fullPath = fullPath.replace("{empty}", "");
            if (this.headers) {
                fullPath = fullPath.replace("{headers}", this.headers);
            }
            if (this.merchantId) {
                fullPath = fullPath.replace("{merchantId}", this.merchantId);
            }
            if (this.params) {
                fullPath = fullPath.replace("{params}", this.params);
            }
            if (this.protocolType) {
                fullPath = fullPath.replace("{protocolType}", this.protocolType);
            }
            if (this.publicKey) {
                fullPath = fullPath.replace("{publicKey}", this.publicKey);

            }
            if (this.status) {
                fullPath = fullPath.replace("{status}", this.status);
            }
            if (this.type) {
                fullPath = fullPath.replace("{type}", this.type);
            }
        }
        else {
            if (fullPath) {
                fullPath = fullPath + "/";
            }
            if (currentUri) {
                fullPath = fullPath + this.publicKey
            }
        }
        if (endPath)
            fullPath = fullPath + "" + endPath;
        return fullPath;
    }

    constructor(endpoint: CustomerAppEndpoint) {
        this.createdAt = endpoint.createdAt;
        this.headers = endpoint.headers;
        this.id = endpoint.id;
        this.index = endpoint.index;
        this.merchantId = endpoint.merchantId;
        this.merchantIdNavigation = endpoint.merchantIdNavigation;
        this.params = endpoint.params;
        this.privateKey = endpoint.privateKey;
        this.protocolType = endpoint.protocolType;
        this.publicKey = endpoint.publicKey;
        this.status = endpoint.status;
        this.type = endpoint.type;
        this.uri = endpoint.uri;
    }
}