"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const ErrorMiddleware_1 = require("./middleware/ErrorMiddleware");
const routes_1 = __importDefault(require("./routes"));
const WinstonLogger_1 = require("./common/logging/WinstonLogger");
// reload path
process.env.NODE_PATH = __dirname;
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.routes = new routes_1.default();
        this.port = Number(process.env.PORT) || 3000;
        this.logger = new WinstonLogger_1.WinstonLogger();
        dotenv_1.default.config();
        this.configureMiddleware();
        this.configureRoutes();
        this.configErrorMiddleware();
        this.startServer();
    }
    configureMiddleware() {
        this.app.use(express_1.default.json());
        const corsOptions = {
            origin: 'http://localhost:1234',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        };
        this.app.use((0, cors_1.default)(corsOptions));
    }
    configureRoutes() {
        this.app.use('/api', this.routes.getRouter());
    }
    configErrorMiddleware() {
        this.errorMiddleware = new ErrorMiddleware_1.ErrorMiddleware();
        this.app.use(this.errorMiddleware.handler());
    }
    startServer() {
        this.app.listen(this.port, () => {
            this.logger.info(`App listning on the port ${this.port}`);
        });
    }
}
new Server();
//# sourceMappingURL=server.js.map