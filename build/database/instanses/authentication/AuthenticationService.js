"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config/config"));
const UserContext_1 = require("./UserContext");
const UserDatastore_1 = require("../../datastores/UserDatastore");
const NotFoundException_1 = require("../../../common/exception/NotFoundException");
const userDatastore = new UserDatastore_1.UserDatastore();
class AuthenticationService {
    constructor() {
        this.verifyAccessToken = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ message: 'No token provided' });
            }
            try {
                const payload = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecretKey);
                const userDetail = yield userDatastore.getById(payload.userId);
                if (!userDetail) {
                    throw new NotFoundException_1.NotFoundException(`User not found`);
                }
                UserContext_1.UserContext.storeUserDetails(userDetail);
                next();
            }
            catch (error) {
                return res.status(403).json({ message: 'Token is invalid' });
            }
        });
    }
    getAccessToken(payload) {
        const token = jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecretKey, {
            expiresIn: '1d',
        });
        return token;
    }
}
exports.AuthenticationService = AuthenticationService;
exports.default = AuthenticationService;
//# sourceMappingURL=AuthenticationService.js.map