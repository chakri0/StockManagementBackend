import { BaseEntity } from 'typeorm';
import { UserRole } from './UserRole';
export declare class AccessToken extends BaseEntity {
    id: string;
    token: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
export default AccessToken;
//# sourceMappingURL=AccessToken.d.ts.map