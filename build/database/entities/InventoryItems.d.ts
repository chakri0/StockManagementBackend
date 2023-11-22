import { User } from './User';
import { Items } from './Items';
export declare enum statusType {
    inStock = "InStock",
    consumed = "consumed"
}
export declare class InventoryItems {
    id: string;
    quantity: number;
    availableQuantity: number;
    status: string;
    expireDate: Date;
    addedAt: Date;
    updatedAt: Date;
    user: User;
    item: Items;
}
//# sourceMappingURL=InventoryItems.d.ts.map