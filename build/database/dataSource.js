"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const typeorm_1 = require("typeorm");
// import { getConfig } from "../config/config";
const mysqlDriver = __importStar(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getConfig() {
    return {
        driver: mysqlDriver,
        type: 'mysql',
        host: 'localhost',
        port: process.env.MY_SQL_PORT,
        username: 'root',
        password: '',
        database: 'phillypizza_local',
        synchronize: false,
        migrations: ['src/database/migrations/*.ts'],
        entities: ['src/database/entities/*.ts'],
    };
}
exports.getConfig = getConfig;
const datasource = new typeorm_1.DataSource(getConfig());
void datasource.initialize();
exports.default = datasource;
//# sourceMappingURL=dataSource.js.map