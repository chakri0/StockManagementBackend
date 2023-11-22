"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userBranchResponse = exports.userResponse = void 0;
const userResponse = (user) => {
    var _a, _b, _c, _d;
    return ({
        id: user.id,
        email: user.email,
        firstName: (_a = user.firstName) !== null && _a !== void 0 ? _a : undefined,
        lastName: (_b = user.lastName) !== null && _b !== void 0 ? _b : undefined,
        avatar: (_c = user.avatar) !== null && _c !== void 0 ? _c : undefined,
        phoneNumber: (_d = user.phoneNumber) !== null && _d !== void 0 ? _d : undefined,
        role: user.role,
        branch: user === null || user === void 0 ? void 0 : user.branch,
    });
};
exports.userResponse = userResponse;
const userBranchResponse = (branch) => ({
    id: branch.id,
    storeName: branch.storeName,
    storeAddress: branch.storeAddress,
});
exports.userBranchResponse = userBranchResponse;
//# sourceMappingURL=ResponseHandle.js.map