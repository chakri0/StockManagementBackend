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
exports.ItemsRepository = void 0;
const uuid_1 = require("uuid");
const UserDatastore_1 = require("../database/datastores/UserDatastore");
const Mail_1 = require("../database/instanses/mail/Mail");
const NotFoundException_1 = require("../common/exception/NotFoundException");
const Items_1 = require("../database/entities/Items");
const CategoryDatastore_1 = require("../database/datastores/CategoryDatastore");
const ItemsDatastore_1 = require("../database/datastores/ItemsDatastore");
class ItemsRepository {
    constructor() {
        this.userDatastore = new UserDatastore_1.UserDatastore();
        this.categoryDatastore = new CategoryDatastore_1.CategoryDatastore();
        this.itemDatastore = new ItemsDatastore_1.ItemsDatastore();
        this.mail = new Mail_1.Mail();
    }
    addItem(data, activeUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoryId, name, description, image, dailyThreshold, weeklyThreshold, overallThreshold, } = data;
            const existUser = yield this.userDatastore.getById(activeUserId);
            if (!existUser) {
                throw new NotFoundException_1.NotFoundException(`User not found`);
            }
            const category = yield this.categoryDatastore.getById(categoryId);
            if (!category) {
                throw new NotFoundException_1.NotFoundException(`Category not found`);
            }
            const item = new Items_1.Items();
            item.id = (0, uuid_1.v4)();
            (item.name = name),
                (item.description = description !== null && description !== void 0 ? description : null),
                (item.image = image !== null && image !== void 0 ? image : null),
                (item.dailyThreshold = dailyThreshold !== null && dailyThreshold !== void 0 ? dailyThreshold : null),
                (item.weeklyThreshold = weeklyThreshold !== null && weeklyThreshold !== void 0 ? weeklyThreshold : null),
                (item.overallThreshold = overallThreshold !== null && overallThreshold !== void 0 ? overallThreshold : null);
            item.category = category;
            yield this.itemDatastore.save(item);
        });
    }
    itemList(activeUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.userDatastore.getById(activeUserId);
            if (!existUser) {
                throw new NotFoundException_1.NotFoundException(`User not found`);
            }
            const items = yield this.itemDatastore.getAllItems();
            return items;
        });
    }
}
exports.ItemsRepository = ItemsRepository;
//# sourceMappingURL=ItemsRepository.js.map