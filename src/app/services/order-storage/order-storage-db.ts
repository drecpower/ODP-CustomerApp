import Dexie, {Table} from "dexie";
import { DtoEvent, Order } from "../../api/models";
import { DtoStoredOrder } from "../event/dto-stored-order";
// import { DtoStoredEvent } from "../services/integrator/dto-stored-event";
// import { DtoStoredOrder } from "../services/integrator/dto-stored-order";

export class OrderStorageDb extends Dexie {
    tempEvents!: Table<DtoEvent,string>;
    events!: Table<DtoEvent,string>;
    orders!: Table<DtoStoredOrder,string>;
    localorders!: Table<Order,string>;

    constructor(){
        super('orderstoragedb');
        this.version(3).stores({
            events:'id',
            orders:'id',
            tempEvents:'id',
            localorders:'id'
        });
    }
}
export const _DB=new OrderStorageDb();