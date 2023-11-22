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
const ItemsRepository_1 = require("../../repositories/ItemsRepository");
class ItemsController {
    constructor() {
        this.addItems = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const activeUser = UserContext_1.UserContext.getActiveUser();
                if (!activeUser) {
                    throw new NotFoundException_1.NotFoundException(`User not found`);
                }
                const data = req.body;
                yield this.itemRepository.addItem(data, activeUser.id);
                res.status(200).json({});
            }
            catch (error) {
                next(error);
            }
        });
        this.itemList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const activeUser = UserContext_1.UserContext.getActiveUser();
                if (!activeUser) {
                    throw new NotFoundException_1.NotFoundException(`User not found`);
                }
                const itemList = yield this.itemRepository.itemList(activeUser.id);
                res.status(200).json({ itemList });
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteItem = (req, res, next) => {
            try {
                const activeUser = UserContext_1.UserContext.getActiveUser();
                if (!activeUser) {
                    throw new NotFoundException_1.NotFoundException(`User not found`);
                }
                res.status(200).json({});
            }
            catch (error) {
                next(error);
            }
        };
        this.updateItem = (req, res, next) => {
            try {
                const activeUser = UserContext_1.UserContext.getActiveUser();
                if (!activeUser) {
                    throw new NotFoundException_1.NotFoundException(`User not found`);
                }
                const data = req.body;
                res.status(200).json({ data });
            }
            catch (error) {
                next(error);
            }
        };
        this.itemRepository = new ItemsRepository_1.ItemsRepository();
    }
}
exports.default = ItemsController;
//# sourceMappingURL=itemsController.js.map