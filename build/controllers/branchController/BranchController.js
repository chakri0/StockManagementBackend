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
const BranchRepository_1 = require("../../repositories/BranchRepository");
const UserContext_1 = require("../../database/instanses/authentication/UserContext");
const NotFoundException_1 = require("../../common/exception/NotFoundException");
class BranchController {
    constructor() {
        this.addBranch = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const activeUser = UserContext_1.UserContext.getActiveUser();
                if (!activeUser) {
                    throw new NotFoundException_1.NotFoundException(`No user found`);
                }
                const data = req.body;
                yield this.branchRepository.addBranch(data, activeUser.id);
                res.status(201).json({});
            }
            catch (error) {
                next(error);
            }
        });
        this.branchList = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const activeUser = UserContext_1.UserContext.getActiveUser();
                if (!activeUser) {
                    throw new NotFoundException_1.NotFoundException(`No user found`);
                }
                const branches = yield this.branchRepository.branchList(activeUser.id);
                res.status(200).json({ branches });
            }
            catch (error) {
                next(error);
            }
        });
        this.updateBranch = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const activeUser = UserContext_1.UserContext.getActiveUser();
                if (!activeUser) {
                    throw new NotFoundException_1.NotFoundException(`No user found`);
                }
                const { branchId } = req.params;
                const data = req.body;
                yield this.branchRepository.updateBranch(data, branchId, activeUser.id);
                res.status(201).json({});
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteBranch = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const activeUser = UserContext_1.UserContext.getActiveUser();
                if (!activeUser) {
                    throw new NotFoundException_1.NotFoundException(`No user found`);
                }
                const { branchId } = req.params;
                yield this.branchRepository.deleteBranch(branchId, activeUser.id);
                res.status(201).json({});
            }
            catch (error) {
                next(error);
            }
        });
        this.branchRepository = new BranchRepository_1.BranchRepository();
    }
}
exports.default = BranchController;
//# sourceMappingURL=BranchController.js.map