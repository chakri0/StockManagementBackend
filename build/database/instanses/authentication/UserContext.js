"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserContext = void 0;
class UserContext {
    static storeUserDetails(user) {
        UserContext.user = user;
    }
    static getActiveUser() {
        return UserContext.user;
    }
}
exports.UserContext = UserContext;
//# sourceMappingURL=UserContext.js.map