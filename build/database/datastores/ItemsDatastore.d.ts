import { Items } from '../entities/Items';
export declare class ItemsDatastore {
    constructor();
    save(item: Items): Promise<Items | undefined>;
    getAllItems(): Promise<Items[]>;
    deleteBranch(itemId: string): Promise<void>;
    getById(itemId: string): Promise<Items | null>;
}
//# sourceMappingURL=ItemsDatastore.d.ts.map