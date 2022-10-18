import { Subject } from "rxjs/internal/Subject";
import { CustomerAppEndpoint } from "src/app/api/models/customer-app-endpoint";
import { SSIpfs } from "src/app/shared/ipfs";
import { SSOrbitdb } from "src/app/shared/orbitdb";
import { IHashDataAdapter } from "./i-hash-data-adapter";

export class HdAdOrbitdb implements IHashDataAdapter{
    endpoint: CustomerAppEndpoint;
    private _onNewHashDataSubject = new Subject<string>();
    public onNewHashData = this._onNewHashDataSubject.asObservable();
    public logChannel:any=null;

    private _lastHashFetched:any=null;

    constructor(endpoint: CustomerAppEndpoint) {
      this.endpoint=endpoint;
      this._lastHashFetched = localStorage.getItem("customerapp.lastHashFetched");
      console.log("Initializing OrbitDb HashData Service... "+this.endpoint.uri);
      this.loadOrbitDb();
    }

    async loadOrbitDb() {
      var _ipfsNode = await SSIpfs.getNode();
      var scriptElm = await SSOrbitdb.GetOrbitDbInstance(_ipfsNode);
      this.logChannel = await SSOrbitdb.GetLogInstancePool(this.endpoint.uri!);

      this.logChannel.events.on('ready', (dbname:any, heads:any) => {
        console.log("READY::");
        console.log(dbname);
        console.log(heads);
        this.fetchLogEvents();
      });


      this.logChannel.events.on('peer', (peer:any) => {
        console.log('peer ' + peer);
      })

      this.logChannel.events.on('synced', (res:any) => {
        console.log('db synced', res);
      });
      this.logChannel.events.on('load.progress', (address:any, hash:any, entry:any, progress:any, total:any) => {
        console.log('db - load.progress', progress, total);
      });

      this.logChannel.events.on('replicated', (address:any) => {
        this.fetchLogEvents();
      })

      this.logChannel.events.on('ready', (dbname:any, heads:any) => {
        this.fetchLogEvents();
      })


      var hashDataEndpoint = this.logChannel.id;
      console.log("HashData Endpoint: "+hashDataEndpoint);

      await this.logChannel.load();
      console.log("HashData Loaded!");
  }
  
  private fetchedLogEvents:any[] = [];
  private fetchLogEvents() {
    let noitem=true;
    let lst=this.logChannel.iterator({ limit: -1,gt:this._lastHashFetched})
      .collect()
      .map((e:any) => {
        noitem=false;
        return e.payload.value;
      }
      );

    if (noitem){
      this._onNewHashDataSubject.next(this._lastHashFetched);
    } else {
      this._lastHashFetched=lst[lst.length-1];
      this._onNewHashDataSubject.next(this._lastHashFetched);
    }
  }
  processEvent(_event: any) {
    console.log("HD_EVT: ");
    console.log(_event);
    //console.log(newhash);
  }

}