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
exports.UserRole = exports.roleName = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
var roleName;
(function (roleName) {
    roleName["superAdmin"] = "superAdmin";
    roleName["admin"] = "admin";
    roleName["manager"] = "manager";
})(roleName || (exports.roleName = roleName = {}));
let UserRole = class UserRole {
};
exports.UserRole = UserRole;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'varchar', length: 64 }),
    __metadata("design:type", String)
], UserRole.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => User_1.User, { onUpdate: 'CASCADE', onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", User_1.User)
], UserRole.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: roleName }),
    __metadata("design:type", String)
], UserRole.prototype, "roleName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        width: 1,
    }),
    __metadata("design:type", Boolean)
], UserRole.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'tinyint',
        width: 1,
    }),
    __metadata("design:type", Boolean)
], UserRole.prototype, "isActivated", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserRole.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserRole.prototype, "updatedAt", void 0);
exports.UserRole = UserRole = __decorate([
    (0, typeorm_1.Entity)('UserRole')
], UserRole);
//# sourceMappingURL=UserRole.js.map