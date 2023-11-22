"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const AuthenticationService_1 = __importDefault(require("../../database/instanses/authentication/AuthenticationService"));
const CategoryController_1 = __importDefault(require("../../controllers/categoryController/CategoryController"));
class CategoryRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.auth = new AuthenticationService_1.default();
        this.categoryController = new CategoryController_1.default();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.post('/add', this.auth.verifyAccessToken, this.categoryController.addCategory);
        this.router.get('/list', this.auth.verifyAccessToken, this.categoryController.categoryList);
        this.router.put('/update/:categoryId', this.auth.verifyAccessToken, this.categoryController.updateCategory);
        this.router.delete('/delete/:categoryId', this.auth.verifyAccessToken, this.categoryController.deleteCategory);
    }
    getRouter() {
        return this.router;
    }
}
exports.CategoryRoutes = CategoryRoutes;
exports.default = new CategoryRoutes().getRouter();
//# sourceMappingURL=CategoryRoutes.js.map