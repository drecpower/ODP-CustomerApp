export interface IOrbitDb {
    createInstance(ipfsnode:any, config?:IOrbitDbConfig):any;
}

export interface IOrbitDbConfig { identity: any }