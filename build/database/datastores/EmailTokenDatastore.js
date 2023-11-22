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
exports.EmailTokenDatastore = void 0;
const dataSource_1 = __importDefault(require("../dataSource"));
const EmailToken_1 = require("../entities/EmailToken");
class EmailTokenDatastore {
    constructor() { }
    save(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult;
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager.save(token);
            }));
            if (queryResult)
                return queryResult;
        });
    }
    deleteTokenByRole(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                yield manager
                    .createQueryBuilder()
                    .delete()
                    .from(EmailToken_1.EmailToken)
                    .where('roleId = :roleId', { roleId })
                    .andWhere('tokenType = :tokenType', {
                    tokenType: EmailToken_1.tokenType.invite,
                })
                    .execute();
            }));
        });
    }
    getTokenDetails(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult;
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager
                    .getRepository(EmailToken_1.EmailToken)
                    .createQueryBuilder('EmailToken')
                    // .leftJoinAndSelect('EmailToken.role', 'role')
                    .where('EmailToken.token = :token', { token })
                    .getOne();
            }));
            return queryResult;
        });
    }
}
exports.EmailTokenDatastore = EmailTokenDatastore;
//# sourceMappingURL=EmailTokenDatastore.js.map