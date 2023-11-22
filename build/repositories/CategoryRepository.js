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
exports.CategoryRepository = void 0;
const uuid_1 = require("uuid");
const UserDatastore_1 = require("../database/datastores/UserDatastore");
const AuthenticationService_1 = __importDefault(require("../database/instanses/authentication/AuthenticationService"));
const Mail_1 = require("../database/instanses/mail/Mail");
const NotFoundException_1 = require("../common/exception/NotFoundException");
const Categories_1 = require("../database/entities/Categories");
const CategoryDatastore_1 = require("../database/datastores/CategoryDatastore");
class CategoryRepository {
    constructor() {
        this.userDatastore = new UserDatastore_1.UserDatastore();
        this.authentication = new AuthenticationService_1.default();
        this.categoryDatastore = new CategoryDatastore_1.CategoryDatastore();
        this.mail = new Mail_1.Mail();
    }
    addCategory(name, activeUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.userDatastore.getById(activeUserId);
            if (!existUser) {
                throw new NotFoundException_1.NotFoundException(`User not found`);
            }
            const category = new Categories_1.Categories();
            category.id = (0, uuid_1.v4)();
            category.name = name;
            yield this.categoryDatastore.save(category);
        });
    }
    categoryList(activeUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.userDatastore.getById(activeUserId);
            if (!existUser) {
                throw new NotFoundException_1.NotFoundException(`User not found`);
            }
            const categories = yield this.categoryDatastore.getAllCategory();
            return categories;
        });
    }
    updateCategory(name, categoryId, activeUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.userDatastore.getById(activeUserId);
            if (!existUser) {
                throw new NotFoundException_1.NotFoundException(`User not found`);
            }
            const existCategory = yield this.categoryDatastore.getById(categoryId);
            if (!existCategory) {
                throw new NotFoundException_1.NotFoundException(`Category not found`);
            }
            existCategory.name;
            yield this.categoryDatastore.save(existCategory);
        });
    }
    deleteCategory(categoryId, activeUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.userDatastore.getById(activeUserId);
            if (!existUser) {
                throw new NotFoundException_1.NotFoundException(`User not found`);
            }
            const existCategory = yield this.categoryDatastore.getById(categoryId);
            if (!existCategory) {
                throw new NotFoundException_1.NotFoundException(`Category not found`);
            }
            yield this.categoryDatastore.deleteBranch(categoryId);
        });
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=CategoryRepository.js.map