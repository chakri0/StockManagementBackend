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
exports.ItemsDatastore = void 0;
const dataSource_1 = __importDefault(require("../dataSource"));
const Items_1 = require("../entities/Items");
class ItemsDatastore {
    constructor() { }
    save(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult;
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager.save(item);
            }));
            if (queryResult) {
                return queryResult;
            }
        });
    }
    getAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult = [];
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager
                    .getRepository(Items_1.Items)
                    .createQueryBuilder('Items')
                    .leftJoinAndSelect('Items.category', 'category')
                    .getMany();
            }));
            return queryResult;
        });
    }
    deleteBranch(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                yield manager
                    .getRepository(Items_1.Items)
                    .createQueryBuilder('Items')
                    .delete()
                    .where('Items.id = :id', { id: itemId })
                    .execute();
            }));
        });
    }
    getById(itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult;
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager
                    .getRepository(Items_1.Items)
                    .createQueryBuilder('Items')
                    .where('Items.id = :id', { id: itemId })
                    .getOne();
            }));
            if (queryResult) {
                return queryResult;
            }
            return null;
        });
    }
}
exports.ItemsDatastore = ItemsDatastore;
//# sourceMappingURL=ItemsDatastore.js.map