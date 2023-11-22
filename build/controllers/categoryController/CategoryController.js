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
Object.defineProperty(exports, "__esModule", { value: true });
const UserContext_1 = require("../../database/instanses/authentication/UserContext");
const NotFoundException_1 = require("../../common/exception/NotFoundException");
const CategoryRepository_1 = require("../../repositories/CategoryRepository");
class CategoryController {
    constructor() {
        this.addCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body;
                const activeUser = UserContext_1.UserContext.getActiveUser();
                if (!activeUser) {
                    throw new NotFoundException_1.NotFoundException(`User not found`);
                }
                yield this.categoryRepository.addCategory(name, activeUser.id);
                res.status(200).json({});
            }
            catch (error) {
                next(error);
            }
        });
        this.categoryList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const activeUser = UserContext_1.UserContext.getActiveUser();
                if (!activeUser) {
                    throw new NotFoundException_1.NotFoundException(`User not found`);
                }
                const categoryList = yield this.categoryRepository.categoryList(activeUser.id);
                res.status(200).json({ categoryList });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId } = req.params;
                const activeUser = UserContext_1.UserContext.getActiveUser();
                if (!activeUser) {
                    throw new NotFoundException_1.NotFoundException(`User not found`);
                }
                yield this.categoryRepository.deleteCategory(categoryId, activeUser.id);
                res.status(200).json({});
            }
            catch (error) {
                next(error);
            }
        });
        this.updateCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId } = req.params;
                const { name } = req.body;
                const activeUser = UserContext_1.UserContext.getActiveUser();
                if (!activeUser) {
                    throw new NotFoundException_1.NotFoundException(`User not found`);
                }
                yield this.categoryRepository.updateCategory(name, categoryId, activeUser.id);
                res.status(200).json({});
            }
            catch (error) {
                next(error);
            }
        });
        this.categoryRepository = new CategoryRepository_1.CategoryRepository();
    }
}
exports.default = CategoryController;
//# sourceMappingURL=CategoryController.js.map