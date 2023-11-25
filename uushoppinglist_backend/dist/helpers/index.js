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
exports.getIsAuthorized = exports.getProfile = exports.getProfileFetch = void 0;
const errors_1 = require("../errors");
const index_1 = require("../index");
const getProfileFetch = (userId, listId) => __awaiter(void 0, void 0, void 0, function* () {
    const targetList = yield index_1.prisma.shoppingList.findUnique({
        where: {
            id: listId
        }
    });
    if (!targetList) {
        throw (0, errors_1.ThrowableError)("Shopping list with this id does not exist", 400, "shoppingList.get.notfound");
    }
    if (targetList.ownerId === userId)
        return "owner";
    if (!!targetList.membersIds.find(id => id === userId))
        return "member";
    return null;
});
exports.getProfileFetch = getProfileFetch;
const getProfile = (userId, list) => {
    if (list.ownerId === userId)
        return "owner";
    if (!!list.membersIds.find(id => id === userId))
        return "member";
    return null;
};
exports.getProfile = getProfile;
const getIsAuthorized = (userId = "", listId, profiles) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield (0, exports.getProfileFetch)(userId, listId);
    let authorized = false;
    profiles.forEach(profileL => {
        if (profileL === profile)
            authorized = true;
    });
    if (!authorized) {
        throw (0, errors_1.ThrowableError)(undefined, 401, "shoppingList.unauthorized");
    }
});
exports.getIsAuthorized = getIsAuthorized;
