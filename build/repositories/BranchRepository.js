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
exports.BranchRepository = void 0;
const uuid_1 = require("uuid");
const UserDatastore_1 = require("../database/datastores/UserDatastore");
const AuthenticationService_1 = __importDefault(require("../database/instanses/authentication/AuthenticationService"));
const BranchDatastore_1 = require("../database/datastores/BranchDatastore");
const EmailTokenDatastore_1 = require("../database/datastores/EmailTokenDatastore");
const Mail_1 = require("../database/instanses/mail/Mail");
const NotFoundException_1 = require("../common/exception/NotFoundException");
const Branch_1 = require("../database/entities/Branch");
const Constant_1 = require("../common/helpers/Constant");
class BranchRepository {
    constructor() {
        this.userDatastore = new UserDatastore_1.UserDatastore();
        this.authentication = new AuthenticationService_1.default();
        this.branchDatastore = new BranchDatastore_1.BranchDatastore();
        this.emailTokenDatastore = new EmailTokenDatastore_1.EmailTokenDatastore();
        this.mail = new Mail_1.Mail();
    }
    addBranch(data, activeUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const { storeAddress, storeName, image, phoneNumber } = data;
            const existUser = yield this.userDatastore.getById(activeUserId);
            if (!existUser) {
                throw new NotFoundException_1.NotFoundException(`User not found`);
            }
            if (!Constant_1.permission.includes(existUser.role.roleName)) {
                throw new NotFoundException_1.NotFoundException(`You  donot have access`);
            }
            const branch = new Branch_1.Branch();
            branch.id = (0, uuid_1.v4)();
            branch.storeName = storeName;
            branch.storeAddress = storeAddress;
            branch.phoneNumber = phoneNumber !== null && phoneNumber !== void 0 ? phoneNumber : null;
            branch.image = image !== null && image !== void 0 ? image : null;
            yield this.branchDatastore.save(branch);
        });
    }
    branchList(activeUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.userDatastore.getById(activeUserId);
            if (!existUser) {
                throw new NotFoundException_1.NotFoundException(`User not found`);
            }
            const getbranches = yield this.branchDatastore.getAllBranch();
            return getbranches;
        });
    }
    updateBranch(data, branchId, activeUserId) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.userDatastore.getById(activeUserId);
            if (!existUser) {
                throw new NotFoundException_1.NotFoundException(`User not found`);
            }
            const existBranch = yield this.branchDatastore.getById(branchId);
            if (!existBranch) {
                throw new NotFoundException_1.NotFoundException(`Branch not found`);
            }
            existBranch.storeName = (_a = data.storeName) !== null && _a !== void 0 ? _a : existBranch.storeName;
            existBranch.storeAddress =
                (_b = data.storeAddress) !== null && _b !== void 0 ? _b : existBranch.storeAddress;
            existBranch.phoneNumber = (_c = data.phoneNumber) !== null && _c !== void 0 ? _c : existBranch.phoneNumber;
            existBranch.image = (_d = data.image) !== null && _d !== void 0 ? _d : existBranch.image;
            yield this.branchDatastore.save(existBranch);
        });
    }
    deleteBranch(branchId, activeUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.userDatastore.getById(activeUserId);
            if (!existUser) {
                throw new NotFoundException_1.NotFoundException(`User not found`);
            }
            const existBranch = yield this.branchDatastore.getById(branchId);
            if (!existBranch) {
                throw new NotFoundException_1.NotFoundException(`Branch not found`);
            }
            yield this.branchDatastore.deleteBranch(branchId);
        });
    }
}
exports.BranchRepository = BranchRepository;
//# sourceMappingURL=BranchRepository.js.map