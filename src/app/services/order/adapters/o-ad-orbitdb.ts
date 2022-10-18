import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { DtoCartToSend } from "src/app/api/models";
import { CustomerAppEndpoint } from "src/app/api/models/customer-app-endpoint";
import { DtoEndpoint } from "src/app/dto/dto-endpoint";
import { SSIpfs } from "src/app/shared/ipfs";
import { SSOrbitdb } from "src/app/shared/orbitdb";
import { SRandom } from "src/app/shared/random";
import { SSUuid } from "src/app/shared/uuid";
import { CryptoService } from "../../crypto/crypto.service";
import { IOrderAdapter } from "./i-order-adapter";

export class OAdOrbitDb implements IOrderAdapter {
    endpoint: CustomerAppEndpoint;
    readyToSend: boolean = false;

    public static logChannel: any = null;
    static delinetEndpoint = null;
    constructor(endpoint: CustomerAppEndpoint) {
        this.endpoint = endpoint;

        console.log("Initializing OrbitDB Orders Channel...");
        console.log(this.endpoint);
        this.loadOrbitDb();
    }

    async loadOrbitDb() {
        var _self = this;
        var _ipfsNode = await SSIpfs.getNode();
        var scriptElm = await SSOrbitdb.GetOrbitDbInstance(_ipfsNode);
        if (this.endpoint?.publicKey && CryptoService.Instance) {
            var jpk = await CryptoService.Instance.importJustPublicKey(this.endpoint.publicKey);
            console.log(jpk);
            CryptoService.Instance.publicKey = jpk;
        }

        OAdOrbitDb.logChannel = await SSOrbitdb.GetLogInstancePool(this.endpoint.uri!, true);
        OAdOrbitDb.delinetEndpoint = OAdOrbitDb.logChannel.id;
        this.readyToSend = true;

    }
    send(cart: DtoCartToSend) {
        var _self = this;
        var p = new Promise<any>(
            async (resolve, reject) => {
                var _self = this;
                var hash = "";
                var path = new DtoEndpoint(this.endpoint);

                var retEvents = await this.generatePLCEvent(cart);
                console.log(retEvents);
                var h1 = await OAdOrbitDb.logChannel.add(retEvents[0]);
                var h2 = await OAdOrbitDb.logChannel.add(retEvents[1]);
                console.log("OK");
                resolve("OK");
            }
        )
        return p;
    }
    async generatePLCEvent(cart: DtoCartToSend) {
        var retEvents = [];
        let cry = CryptoService.Instance;
        
        cart.displayId=(Math.floor(Math.random() * 9999)).toString();

        let undefinedRemoveds = JSON.stringify(SSIpfs.removeUndefineds(cart));
        let chunks: string[] = <any>undefinedRemoveds.match(/.{1,150}/g);
        let encryptedChunks: string[] = [];
        for (let idx = 0; idx < chunks.length; idx++) {
            const chunk = chunks[idx];
            encryptedChunks.push(await cry.encrypt(chunk));
        }

        try {
            var evt = <any>{
                id: SSUuid.GenerateV4(),
                eventType: "order",
                createdAt: (new Date()).toISOString(),
                payload: {encryptedChunks:encryptedChunks}
            };
            retEvents.push(evt);
        } catch (error) {
            console.log(error);
        }


        var jsonstr = {
            adapter: "delinet",
            event: "",
            code: "PLC",
            createdAt: (new Date()).toISOString(),
            fullCode: "PLACED",
            metadata: null,
            orderId: cart.id,
            id: cart.id,
            source: "odp"
        };

        try {
            var evt = <any>{
                id: SSUuid.GenerateV4(),
                createdAt: (new Date()).toISOString(),
                payload: jsonstr,
                eventType: "event"
            };
            retEvents.push(evt);
        } catch (error) {
            console.log(error);
        }

        return retEvents;
    }

}