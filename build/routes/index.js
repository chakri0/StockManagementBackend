"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoutes_1 = __importDefault(require("./userRoutes/UserRoutes"));
const BranchRoutes_1 = require("./branchRoutes/BranchRoutes");
const ItemsRoutes_1 = require("./itemsRoutes/ItemsRoutes");
const CategoryRoutes_1 = require("./categoriesRoutes/CategoryRoutes");
class Routes {
    constructor() {
        this.router = express_1.default.Router();
        this.userRoutes = new UserRoutes_1.default();
        this.branchRoutes = new BranchRoutes_1.BranchRoutes();
        this.categoryRoutes = new CategoryRoutes_1.CategoryRoutes();
        this.itemRoutes = new ItemsRoutes_1.ItemsRoutes();
        this.initRoutes();
    }
    initRoutes() {
        this.router.use('/user', this.userRoutes.getRouter());
        this.router.use('/branch', this.branchRoutes.getRouter());
        this.router.use('/category', this.categoryRoutes.getRouter());
        this.router.use('/item', this.itemRoutes.getRouter());
    }
    getRouter() {
        return this.router;
    }
}
exports.default = Routes;
//# sourceMappingURL=index.js.map