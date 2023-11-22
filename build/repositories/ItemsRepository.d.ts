import { ItemsReq } from '../controllers/itemsController/itemsController';
import { Items } from '../database/entities/Items';
export declare class ItemsRepository {
    private userDatastore;
    private categoryDatastore;
    private itemDatastore;
    private mail;
    constructor();
    addItem(data: ItemsReq, activeUserId: string): Promise<void>;
    itemList(activeUserId: string): Promise<Items[]>;
}
//# sourceMappingURL=ItemsRepository.d.ts.map