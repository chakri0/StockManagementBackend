export declare class PasswordManager {
    saltRounds: number;
    constructor(saltRounds?: number);
    hashPassword(plainPassword: string): Promise<string>;
    comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
//# sourceMappingURL=PasswordManager.d.ts.map