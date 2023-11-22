declare const _default: {
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
};
export default _default;
//# sourceMappingURL=config.d.ts.map