import { BaseEntity } from 'typeorm';
import { UserRole } from './UserRole';
import { Branch } from './Branch';
import { InventoryItems } from './InventoryItems';
export declare class User extends BaseEntity {
    id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string | null;
    avatar?: string | null;
    timezone?: string | null;
    phoneNumber?: number | null;
    loginAttempt: number;
    loginAttemptAt?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    role: UserRole;
    branch: Branch;
    inventoryItem: InventoryItems[];
}
//# sourceMappingURL=User.d.ts.map