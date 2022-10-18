// import { SSIpfs } from 'src/app/static-stack/ipfs';
// import { IOrbitDb } from 'src/app/static-stack/orbitdb.interface';
// import { SSLoadLib } from 'src/app/static-stack/loadlib';
// import { Subject } from 'rxjs';
// import { DtoDelinetEvent } from "src/app/services/event/adapters/order/delinet/dto-delinet-event";
// import { SSUuid } from 'src/app/static-stack/uuid';

// export class DelinetClient {

//   private _swarms = [
//     '/dns4/intense-lake-89842.herokuapp.com/tcp/443/wss/p2p-webrtc-star/'
//   ];

//   private _onEventReceivedSubject = new Subject<DtoDelinetEvent>();
//   public onEventReceived = this._onEventReceivedSubject.asObservable();

//   public endpoint:string;
//   public privateKey:string;
//   public publicKey:string;

//   constructor(
//       _endpoint?:string,
//       _privateKey?:string,
//       _publicKey?:string,
//   ) {
//       this.endpoint=_endpoint;
//       this.privateKey=_privateKey;
//       this.publicKey=_publicKey;
//     this.initialize();
//   }

//   private _isRunning = false;
//   private _isUsingDelinetEndpoint = false;
//   private _isOrbitDbLoaded = false;
//   private _isIpfsLoaded = false;

//   private _loadingDb = false;

//   private _ipfsNode: any;
//   private _odb: any;
//   private _logEvents: any;
//   private OrbitDb: IOrbitDb;

//   private async initialize() {
//     setInterval(
//       async () => {
//         if (!this._isRunning) {
//           await this.mainLoopRoutine();
//         }
//       }, 5000
//     )
//   }

//   private async mainLoopRoutine() {
//     this._isRunning = true;
//     try {
//       if (this.endpoint
//         //&& this.publicKey
//         //&& this.privateKey
//       ) {
//         this._isUsingDelinetEndpoint = true;
//         if (!this._isIpfsLoaded) {
//           await this.loadIpfs();
//         }
//         if (!this._isOrbitDbLoaded) {
//           await this.checkOrbitDbLib();
//           await this.loadOrbitDb();
//         } else if (this.endpoint != this._logEvents.id) {
//           console.log("ooops. We are changing delinet endpoint???");
//           await this.loadOrbitDb();
//         }
//       } else {
//         this._isUsingDelinetEndpoint = false;
//       }
//     } catch (error) {

//     }
//     this._isRunning = false;
//   }

//   private loadOrbitDb() {
//     if (!this._loadingDb) {
//       this._loadingDb = true;
//       console.log("loading odb: " + this.endpoint);
//       return new Promise<any>(
//         (resolve, reject) => {
//           this.OrbitDb.createInstance(this._ipfsNode).then(async (_odb: any) => {
//             try {
//               this._odb = _odb;
//               this._logEvents = await _odb.log(this.endpoint);

//               this._logEvents.events.on('load', (dbname) => {
//                 console.log("dbloaded " + dbname);
//               })
//               this._logEvents.events.on('peer', (peer) => {
//                 console.log('peer ' + peer);
//               })

//               this._logEvents.events.on('synced', (res) => {
//                 console.log('db synced', res);
//               });
//               this._logEvents.events.on('load.progress', (address, hash, entry, progress, total) => {
//                 console.log('db - load.progress', progress, total);
//               });

//               this._logEvents.events.on('replicated', (address) => {
//                 this.fetchLogEvents();
//               })

//               this._logEvents.events.on('ready', (dbname, heads) => {
//                 this.fetchLogEvents();
//               })

//               await this._logEvents.load();

//               this._isOrbitDbLoaded = true;
//               resolve(true);
//             } catch (error) {
//               reject(error);
//             }
//             this._loadingDb = false;
//           },
//             (e) => {
//               reject(e);
//               this._loadingDb = false;
//             }
//           );
//         }
//       )
//     }

//   }

//   private _lastHashFetched:string=null;
//   private fetchedLogEvents = [];
//   private fetchLogEvents() {
//     this._logEvents.iterator({ limit: -1,gt:this._lastHashFetched})
//       .collect()
//       .map((e) => {
//         if (e.payload?.value?.id) {
//           let _event = e.payload.value;
//           console.log("::>",_event)
//           if (this.fetchedLogEvents.indexOf(_event.id) < 0) {
//             try {
//               this.processEvent(_event);
//             } catch (error) { console.log(error) };
//             this.fetchedLogEvents.push(_event.id);
//             this._lastHashFetched=e.hash;
//           }
//         }
//       }
//       );
//   }

//   private processEvent(_event: DtoDelinetEvent) {
//     if (!_event.toPublicKey || _event.toPublicKey == this.publicKey) {
//       this._onEventReceivedSubject.next(_event);
//     }
//   }

//   private async loadIpfs() {
//     var ipfsNode = await (await SSIpfs.Ipfs()).create(
//       {
//         repo: 'delinet_client_ipfs',
//         pubsub: true,
//         EXPERIMENTAL: {
//           pubsub: true
//         }
//         , config: {
//           Addresses: {
//             Swarm: this._swarms
//           }
//         }
//       }
//     );
//     this._isIpfsLoaded = true;
//     this._ipfsNode = ipfsNode;
//   }

//   private async checkOrbitDbLib() {
//     var orbitdbScriptElement = await SSLoadLib.loadJSLib("orbitdblib", "libs/orbitdb.min.js");
//     if (orbitdbScriptElement != null) {
//       this.OrbitDb = (window as any).OrbitDB;
//     }
//   }

//   public async sendEvent(evt:DtoDelinetEvent){
//     if (this._isOrbitDbLoaded){
//       if (!evt.id){
//         evt.id=SSUuid.GenerateV4();
//       };
//       if (!evt.createdAt){
//         evt.createdAt=(new Date()).toISOString();
//       };
//       var hash=await this._logEvents.add(evt);
//       console.log(hash);  
//     } else {
//       throw new Error("OrbitDb is not loaded");
//     }
//   };

//   public async sendAckToEvent(eventId:string){
//     if (!this._isOrbitDbLoaded){
//       console.log("DELINET ACK TO: "+eventId);
//     }
//   };
// }
