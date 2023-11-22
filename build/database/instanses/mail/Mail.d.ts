import { IMail } from './Mail.interface';
export declare class Mail implements IMail {
    sendRegistrationEmail(): Promise<void>;
    sendInviteUserEmail(email: string, firstName: string, token: string): Promise<void>;
    private static sendMail;
}
//# sourceMappingURL=Mail.d.ts.map