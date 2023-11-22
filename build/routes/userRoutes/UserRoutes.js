"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../../controllers/userController/UserController"));
const AuthenticationService_1 = __importDefault(require("../../database/instanses/authentication/AuthenticationService"));
class UserRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.userController = new UserController_1.default();
        this.auth = new AuthenticationService_1.default();
        this.setupRoutes();
    }
    setupRoutes() {
        // Auth the user
        this.router.post('/login', this.userController.userLogin);
        this.router.post('/invite', this.auth.verifyAccessToken, this.userController.inviteUser);
        this.router.post('/verify', this.userController.verifyUser);
        this.router.post('/setup', this.userController.accoutSetup);
        this.router.get('/listByBranch/:branchId', this.auth.verifyAccessToken, this.userController.usersListByBranch);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = UserRoutes;
//# sourceMappingURL=UserRoutes.js.map