export interface IMail {
    sendRegistrationEmail(): Promise<void>;
    sendInviteUserEmail(email: string, name: string, token: string): Promise<void>;
}
//# sourceMappingURL=Mail.interface.d.ts.map