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
exports.UserDatastore = void 0;
const User_1 = require("../entities/User");
const dataSource_1 = __importDefault(require("../dataSource"));
const UserRole_1 = require("../entities/UserRole");
class UserDatastore {
    constructor() { }
    getById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult;
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager
                    .getRepository(User_1.User)
                    .createQueryBuilder('User')
                    .leftJoinAndSelect('User.role', 'role')
                    .where('User.id = :id', { id: userId })
                    .getOne();
            }));
            if (queryResult) {
                return queryResult;
            }
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult;
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager
                    .getRepository(User_1.User)
                    .createQueryBuilder('User')
                    .leftJoinAndSelect('User.role', 'role')
                    .leftJoinAndSelect('User.branch', 'branch')
                    .where('User.email = :email', { email })
                    .getOne();
            }));
            if (queryResult) {
                return queryResult;
            }
        });
    }
    getUserRoleById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult;
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager
                    .getRepository(UserRole_1.UserRole)
                    .createQueryBuilder('UserRole')
                    .leftJoinAndSelect('UserRole.user', 'user')
                    .where('user.id = :userId', { userId })
                    .getOne();
            }));
            if (queryResult) {
                return queryResult;
            }
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult;
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager.save(user);
            }));
            if (queryResult) {
                return queryResult;
            }
        });
    }
    saveUserRole(userRole) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult;
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager.save(userRole);
            }));
            if (queryResult) {
                return queryResult;
            }
        });
    }
    getUsersListByBranch(branchId) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult;
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager
                    .getRepository(User_1.User)
                    .createQueryBuilder('User')
                    .leftJoinAndSelect('User.role', 'role')
                    .leftJoinAndSelect('User.branch', 'branch')
                    .where('User.branch = :branchId', { branchId })
                    .andWhere('User.password IS NOT NULL')
                    .andWhere('User.password != :emptyString', { emptyString: '' })
                    .getMany();
            }));
            if (queryResult) {
                return queryResult;
            }
        });
    }
}
exports.UserDatastore = UserDatastore;
//# sourceMappingURL=UserDatastore.js.map