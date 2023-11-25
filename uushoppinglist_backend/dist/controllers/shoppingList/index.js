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
exports.deleteList = exports.patchList = exports.createList = exports.getList = exports.getListsList = void 0;
const shoppingList_1 = require("../../models/shoppingList");
const helpers_1 = require("../../helpers");
const errors_1 = require("../../errors");
const index_1 = require("../../index");
const getListsList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const shoppingLists = yield index_1.prisma.shoppingList.findMany({
            where: {
                OR: [
                    {
                        ownerId: (_a = req.auth) === null || _a === void 0 ? void 0 : _a.payload.sub
                    },
                    {
                        membersIds: {
                            has: (_b = req.auth) === null || _b === void 0 ? void 0 : _b.payload.sub
                        }
                    }
                ]
            }
        }).catch(() => {
            throw (0, errors_1.ThrowableError)("Database error, check logs", 500, "shoppingList.unknown");
        });
        return shoppingLists;
    }
    catch (e) {
        next(e);
    }
});
exports.getListsList = getListsList;
const getList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    try {
        const data = req.params.id;
        shoppingList_1.shoppingListModel.identifierModel.validate(data);
        yield (0, helpers_1.getIsAuthorized)((_c = req.auth) === null || _c === void 0 ? void 0 : _c.payload.sub, data, ["owner", "member"]);
        const targetList = yield index_1.prisma.shoppingList.findUnique({
            where: {
                id: data
            }
        }).catch(() => {
            throw (0, errors_1.ThrowableError)("Database error, check logs", 500, "shoppingList.unknown");
        });
        const profile = (0, helpers_1.getProfile)(((_d = req.auth) === null || _d === void 0 ? void 0 : _d.payload.sub) || "", targetList);
        return Object.assign(Object.assign({}, targetList), { profile });
    }
    catch (e) {
        next(e);
    }
});
exports.getList = getList;
const createList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    try {
        if (!((_e = req.auth) === null || _e === void 0 ? void 0 : _e.payload.sub))
            throw (0, errors_1.ThrowableError)("Cannot get user id", 401, "shoppingList.create.unauthorized");
        const createdShoppingList = yield index_1.prisma.shoppingList.create({
            data: {
                ownerId: (_f = req.auth) === null || _f === void 0 ? void 0 : _f.payload.sub,
                name: "Nový nákupní seznam",
                image: "https://as2.ftcdn.net/v2/jpg/02/37/34/63/1000_F_237346369_ktPSCiSI20SZvMGMn4HA96aDW5QVNmjx.jpg"
            }
        }).catch(() => {
            throw (0, errors_1.ThrowableError)("Database error, check logs", 500, "shoppingList.unknown");
        });
        return Object.assign(Object.assign({}, createdShoppingList), { profile: "owner" });
    }
    catch (e) {
        next(e);
    }
});
exports.createList = createList;
const patchList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h;
    try {
        const data = req.body;
        shoppingList_1.shoppingListModel.updateModel.validate(data);
        yield (0, helpers_1.getIsAuthorized)((_g = req.auth) === null || _g === void 0 ? void 0 : _g.payload.sub, data.id, ["owner"]);
        const updatedShoppingList = yield index_1.prisma.shoppingList.update({
            where: {
                id: data.id
            },
            data: Object.assign(Object.assign({}, data), { id: undefined })
        }).catch(() => {
            throw (0, errors_1.ThrowableError)("Database error, check logs", 500, "shoppingList.unknown");
        });
        const profile = (0, helpers_1.getProfile)(((_h = req.auth) === null || _h === void 0 ? void 0 : _h.payload.sub) || "", updatedShoppingList);
        return Object.assign(Object.assign({}, updatedShoppingList), { profile });
    }
    catch (e) {
        next(e);
    }
});
exports.patchList = patchList;
const deleteList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _j;
    try {
        const data = req.body;
        shoppingList_1.shoppingListModel.deleteModel.validate(data);
        yield (0, helpers_1.getIsAuthorized)((_j = req.auth) === null || _j === void 0 ? void 0 : _j.payload.sub, data.id, ["owner"]);
        yield index_1.prisma.shoppingList.delete({
            where: {
                id: data.id
            }
        }).catch(() => {
            throw (0, errors_1.ThrowableError)("Database error, check logs", 500, "shoppingList.unknown");
        });
        return {};
    }
    catch (e) {
        next(e);
    }
});
exports.deleteList = deleteList;
