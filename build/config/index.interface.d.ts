export interface IAppConfig {
    app: {
        frontend: {
            baseUrl: string;
            accountSetup: string;
        };
        backend: {
            baseUrl: string;
        };
    };
    email: {
        host: string;
        port: number;
        fromEmail: string;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
        logger: boolean;
    };
    jwtSecretKey: string;
}
declare const appConfig: IAppConfig;
export default appConfig;
//# sourceMappingURL=index.interface.d.ts.map