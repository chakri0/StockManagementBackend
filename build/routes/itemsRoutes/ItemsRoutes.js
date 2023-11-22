"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const AuthenticationService_1 = __importDefault(require("../../database/instanses/authentication/AuthenticationService"));
const itemsController_1 = __importDefault(require("../../controllers/itemsController/itemsController"));
class ItemsRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.auth = new AuthenticationService_1.default();
        this.itemController = new itemsController_1.default();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.post('/add', this.auth.verifyAccessToken, this.itemController.addItems);
        this.router.get('/list', this.auth.verifyAccessToken, this.itemController.itemList);
        this.router.put('/update/:itemId', this.auth.verifyAccessToken, this.itemController.updateItem);
        this.router.delete('/delete/:itemId', this.auth.verifyAccessToken, this.itemController.deleteItem);
    }
    getRouter() {
        return this.router;
    }
}
exports.ItemsRoutes = ItemsRoutes;
exports.default = new ItemsRoutes().getRouter();
//# sourceMappingURL=ItemsRoutes.js.map