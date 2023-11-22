import { EmailToken } from '../entities/EmailToken';
export declare class EmailTokenDatastore {
    constructor();
    save(token: EmailToken): Promise<EmailToken | undefined>;
    deleteTokenByRole(roleId: string): Promise<void>;
    getTokenDetails(token: string): Promise<EmailToken | undefined>;
}
//# sourceMappingURL=EmailTokenDatastore.d.ts.map