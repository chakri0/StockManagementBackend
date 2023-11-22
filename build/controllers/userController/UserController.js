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
const UserRepositoy_1 = require("../../repositories/UserRepositoy");
const UserContext_1 = require("../../database/instanses/authentication/UserContext");
const NotFoundException_1 = require("../../common/exception/NotFoundException");
class UserController {
    constructor() {
        this.userLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield this.userRepository.userLogin(email, password);
                res.status(200).json({ user });
            }
            catch (error) {
                next(error);
            }
        });
        this.profile = (req, res, next) => {
            try {
                const activeUser = UserContext_1.UserContext.getActiveUser();
                res.status(200).json({ activeUser });
            }
            catch (error) {
                next(error);
            }
        };
        this.inviteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const activeUser = UserContext_1.UserContext.getActiveUser();
                if (!activeUser) {
                    throw new NotFoundException_1.NotFoundException(`No user found`);
                }
                const { firstName, email, role, branchId } = req.body;
                yield this.userRepository.userInvite(activeUser.id, firstName, email, role, branchId);
                res.status(200).json({});
            }
            catch (error) {
                next(error);
            }
        });
        this.verifyUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, email } = req.body;
                yield this.userRepository.verifyUser(token, email);
                res.status(200).json({});
            }
            catch (error) {
                next(error);
            }
        });
        this.accoutSetup = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                yield this.userRepository.accoutSetup(email, password);
                res.status(200).json({});
            }
            catch (error) {
                next(error);
            }
        });
        this.usersListByBranch = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const activeUser = UserContext_1.UserContext.getActiveUser();
                if (!activeUser) {
                    throw new NotFoundException_1.NotFoundException(`No user found`);
                }
                const { branchId } = req.params;
                const usersList = yield this.userRepository.getUsersListByBranchId(activeUser.id, branchId);
                res.status(200).json({ usersList });
            }
            catch (error) {
                next(error);
            }
        });
        this.userRepository = new UserRepositoy_1.UserRepository();
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map