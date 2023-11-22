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
exports.BranchDatastore = void 0;
const dataSource_1 = __importDefault(require("../dataSource"));
const dataSource_2 = __importDefault(require("../dataSource"));
const Branch_1 = require("../entities/Branch");
class BranchDatastore {
    constructor() { }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult;
            yield dataSource_2.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager
                    .getRepository(Branch_1.Branch)
                    .createQueryBuilder('Branch')
                    .where('Branch.id = :id', { id: id })
                    .getOne();
            }));
            if (queryResult) {
                return queryResult;
            }
            return null;
        });
    }
    save(branch) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult;
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager.save(branch);
            }));
            if (queryResult) {
                return queryResult;
            }
        });
    }
    getAllBranch() {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult = [];
            yield dataSource_2.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager
                    .getRepository(Branch_1.Branch)
                    .createQueryBuilder('Branch')
                    .getMany();
            }));
            return queryResult;
        });
    }
    deleteBranch(branchId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dataSource_2.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                yield manager
                    .getRepository(Branch_1.Branch)
                    .createQueryBuilder('Branch')
                    .delete()
                    .where('Branch.id = :id', { id: branchId })
                    .execute();
            }));
        });
    }
}
exports.BranchDatastore = BranchDatastore;
//# sourceMappingURL=BranchDatastore.js.map