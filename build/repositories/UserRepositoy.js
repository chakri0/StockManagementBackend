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
exports.UserRepository = void 0;
const uuid_1 = require("uuid");
const ResponseHandle_1 = require("../common/helpers/ResponseHandle");
const UserDatastore_1 = require("../database/datastores/UserDatastore");
const AccessToken_1 = __importDefault(require("../database/entities/AccessToken"));
const AccessTokenDatastore_1 = require("../database/datastores/AccessTokenDatastore");
const AuthenticationService_1 = __importDefault(require("../database/instanses/authentication/AuthenticationService"));
const UserRole_1 = require("../database/entities/UserRole");
const User_1 = require("../database/entities/User");
const PasswordManager_1 = require("../database/instanses/encryptDecrypt/PasswordManager");
const BranchDatastore_1 = require("../database/datastores/BranchDatastore");
const EmailToken_1 = require("../database/entities/EmailToken");
const EmailTokenDatastore_1 = require("../database/datastores/EmailTokenDatastore");
const Mail_1 = require("../database/instanses/mail/Mail");
const NotFoundException_1 = require("../common/exception/NotFoundException");
class UserRepository {
    constructor() {
        this.userDatastore = new UserDatastore_1.UserDatastore();
        this.accessTokenDatastore = new AccessTokenDatastore_1.AccessTokenDatastore();
        this.authentication = new AuthenticationService_1.default();
        this.branchDatastore = new BranchDatastore_1.BranchDatastore();
        this.passwordManager = new PasswordManager_1.PasswordManager();
        this.emailTokenDatastore = new EmailTokenDatastore_1.EmailTokenDatastore();
        this.mail = new Mail_1.Mail();
    }
    userLogin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetail = yield this.userDatastore.getUserByEmail(email);
            if (!userDetail) {
                throw new NotFoundException_1.NotFoundException(`User not found`);
            }
            const compare = yield this.passwordManager.comparePassword(password, userDetail.password);
            if (!compare) {
                throw new Error(`Password does not match`);
            }
            const userRole = yield this.userDatastore.getUserRoleById(userDetail.id);
            if (!userRole) {
                throw new Error(`UserRole not found`);
            }
            const payload = {
                userId: userDetail.id,
                userRoleId: userRole.id,
            };
            const token = this.authentication.getAccessToken(payload);
            const accessToken = new AccessToken_1.default();
            accessToken.id = (0, uuid_1.v4)();
            accessToken.token = String(token);
            accessToken.role = userRole;
            yield this.accessTokenDatastore.storeAccessToken(accessToken);
            const userData = {
                user: (0, ResponseHandle_1.userResponse)(userDetail),
                accessToken: String(token),
                refreshToken: 'dummy refresh token',
            };
            return userData;
        });
    }
    userInvite(activeUserId, firstName, email, role, branchId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userDetail = yield this.userDatastore.getById(activeUserId);
            if (!userDetail) {
                throw new NotFoundException_1.NotFoundException(`User not found`);
            }
            const userRole = yield this.userDatastore.getUserRoleById(userDetail.id);
            if (!userRole) {
                throw new NotFoundException_1.NotFoundException(`UserRole not found`);
            }
            const existUser = yield this.userDatastore.getUserByEmail(email);
            if (existUser) {
                if (existUser.role.isVerified) {
                    throw new NotFoundException_1.NotFoundException(`User already register`);
                }
                yield this.sendSetUpMail(existUser.role, email, (_a = existUser.firstName) !== null && _a !== void 0 ? _a : '');
                return;
            }
            if (userRole.roleName !== 'superAdmin' &&
                userRole.roleName !== 'admin') {
                throw new NotFoundException_1.NotFoundException(`Do not have access`);
            }
            if (userRole.roleName === 'admin' && role === 'superAdmin') {
                throw new NotFoundException_1.NotFoundException(`you cannot invite this role`);
            }
            const newUser = new User_1.User();
            newUser.id = (0, uuid_1.v4)();
            newUser.email = email;
            newUser.firstName = firstName;
            if (role !== 'admin' && role !== 'superAdmin') {
                const branchDetials = yield this.branchDatastore.getById(branchId);
                if (!branchDetials) {
                    throw new NotFoundException_1.NotFoundException(`Branch not found`);
                }
                newUser.branch = branchDetials;
            }
            yield this.userDatastore.save(newUser);
            const newRole = new UserRole_1.UserRole();
            newRole.id = (0, uuid_1.v4)();
            newRole.roleName = role;
            newRole.user = newUser;
            yield this.userDatastore.saveUserRole(newRole);
            yield this.sendSetUpMail(newRole, email, firstName);
        });
    }
    sendSetUpMail(userRole, email, firstName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.emailTokenDatastore.deleteTokenByRole(userRole.id);
            const token = new EmailToken_1.EmailToken();
            token.id = (0, uuid_1.v4)();
            token.role = userRole;
            token.token = (0, uuid_1.v4)();
            token.tokenType = EmailToken_1.tokenType.invite;
            yield this.emailTokenDatastore.save(token);
            yield this.mail.sendInviteUserEmail(email, firstName, token.token);
        });
    }
    verifyUser(token, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenVerify = yield this.emailTokenDatastore.getTokenDetails(token);
            if (!tokenVerify) {
                throw new NotFoundException_1.NotFoundException('Verification token expire');
            }
            const userDetail = yield this.userDatastore.getUserByEmail(email);
            if (!userDetail) {
                throw new NotFoundException_1.NotFoundException('User not found');
            }
            const userRole = yield this.userDatastore.getUserRoleById(userDetail.id);
            if (!userRole) {
                throw new NotFoundException_1.NotFoundException('UserRole not found');
            }
            userRole.isVerified = true;
            yield this.userDatastore.saveUserRole(userRole);
            yield this.emailTokenDatastore.deleteTokenByRole(userRole.id);
        });
    }
    accoutSetup(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDetail = yield this.userDatastore.getUserByEmail(email);
            if (!userDetail) {
                throw new NotFoundException_1.NotFoundException('User not found');
            }
            if (userDetail.password) {
                throw new NotFoundException_1.NotFoundException('Password already setup');
            }
            const hashPass = yield this.passwordManager.hashPassword(password);
            userDetail.password = hashPass;
            yield this.userDatastore.save(userDetail);
        });
    }
    getUsersListByBranchId(activeUserId, branchId) {
        return __awaiter(this, void 0, void 0, function* () {
            const existUser = yield this.userDatastore.getById(activeUserId);
            if (!existUser) {
                throw new NotFoundException_1.NotFoundException(`User not found`);
            }
            const existBranch = yield this.branchDatastore.getById(branchId);
            if (!existBranch) {
                throw new NotFoundException_1.NotFoundException(`Branch not found`);
            }
            const usersList = yield this.userDatastore.getUsersListByBranch(branchId);
            const formattedResponse = usersList === null || usersList === void 0 ? void 0 : usersList.map((userDetail) => (0, ResponseHandle_1.userResponse)(userDetail));
            return formattedResponse;
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepositoy.js.map