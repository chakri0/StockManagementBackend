"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryItems = exports.statusType = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Items_1 = require("./Items");
var statusType;
(function (statusType) {
    statusType["inStock"] = "InStock";
    statusType["consumed"] = "consumed";
})(statusType || (exports.statusType = statusType = {}));
let InventoryItems = class InventoryItems {
};
exports.InventoryItems = InventoryItems;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 64 }),
    __metadata("design:type", String)
], InventoryItems.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], InventoryItems.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], InventoryItems.prototype, "availableQuantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: statusType }),
    __metadata("design:type", String)
], InventoryItems.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ nullable: true }),
    __metadata("design:type", Date)
], InventoryItems.prototype, "expireDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], InventoryItems.prototype, "addedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], InventoryItems.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'addedBy' }),
    __metadata("design:type", User_1.User)
], InventoryItems.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Items_1.Items, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'itemId' }),
    __metadata("design:type", Items_1.Items)
], InventoryItems.prototype, "item", void 0);
exports.InventoryItems = InventoryItems = __decorate([
    (0, typeorm_1.Entity)('InventoryItems')
], InventoryItems);
//# sourceMappingURL=InventoryItems.js.map