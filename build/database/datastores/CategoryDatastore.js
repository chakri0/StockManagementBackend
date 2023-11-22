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
exports.CategoryDatastore = void 0;
const dataSource_1 = __importDefault(require("../dataSource"));
const Categories_1 = require("../entities/Categories");
class CategoryDatastore {
    constructor() { }
    save(category) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult;
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager.save(category);
            }));
            if (queryResult) {
                return queryResult;
            }
        });
    }
    getAllCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult = [];
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager
                    .getRepository(Categories_1.Categories)
                    .createQueryBuilder('Categories')
                    .getMany();
            }));
            return queryResult;
        });
    }
    deleteBranch(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                yield manager
                    .getRepository(Categories_1.Categories)
                    .createQueryBuilder('Categories')
                    .delete()
                    .where('Categories.id = :id', { id: categoryId })
                    .execute();
            }));
        });
    }
    getById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryResult;
            yield dataSource_1.default.transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                queryResult = yield manager
                    .getRepository(Categories_1.Categories)
                    .createQueryBuilder('Categories')
                    .where('Categories.id = :id', { id: categoryId })
                    .getOne();
            }));
            if (queryResult) {
                return queryResult;
            }
            return null;
        });
    }
}
exports.CategoryDatastore = CategoryDatastore;
//# sourceMappingURL=CategoryDatastore.js.map