import { HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { DtoOauthRequest } from "src/app/api/models";
import { CryptoService } from "src/app/services/crypto/crypto.service";


    export class SSAuthentication {
        public static cryptoService:CryptoService;
        public static async getOauthTokenAsync(dtoOauthRequest:DtoOauthRequest){
            this.cryptoService.privateKey=await this.cryptoService.importPrivateKey(dtoOauthRequest.clientSecret!);
            this.cryptoService.publicKey=await this.cryptoService.importPublicKey(dtoOauthRequest.clientSecret!);

            var _timestamp=(new Date()).toISOString();
            var _accessToken=await this.cryptoService.encrypt(_timestamp);

            localStorage.setItem("oauthrequest",JSON.stringify(dtoOauthRequest));

            return {
                "accessToken": _accessToken,
                "type": "keypair",
                "expiresIn": 0
            }
        }
    }

