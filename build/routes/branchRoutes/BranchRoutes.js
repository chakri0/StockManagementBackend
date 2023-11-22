"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchRoutes = void 0;
const express_1 = __importDefault(require("express"));
const AuthenticationService_1 = __importDefault(require("../../database/instanses/authentication/AuthenticationService"));
const BranchController_1 = __importDefault(require("../../controllers/branchController/BranchController"));
class BranchRoutes {
    constructor() {
        this.router = express_1.default.Router();
        this.auth = new AuthenticationService_1.default();
        this.branchController = new BranchController_1.default();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.post('/add', this.auth.verifyAccessToken, this.branchController.addBranch);
        this.router.get('/list', this.auth.verifyAccessToken, this.branchController.branchList);
        this.router.put('/update/:branchId', this.auth.verifyAccessToken, this.branchController.updateBranch);
        this.router.delete('/delete/:branchId', this.auth.verifyAccessToken, this.branchController.deleteBranch);
    }
    getRouter() {
        return this.router;
    }
}
exports.BranchRoutes = BranchRoutes;
exports.default = new BranchRoutes().getRouter();
//# sourceMappingURL=BranchRoutes.js.map