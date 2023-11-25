"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteItem = exports.patchItem = exports.createItem = void 0;
const shoppingListItem_1 = require("../../models/shoppingListItem");
const crypto = __importStar(require("crypto"));
const helpers_1 = require("../../helpers");
const errors_1 = require("../../errors");
const index_1 = require("../../index");
const createItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const data = req.body;
        shoppingListItem_1.shoppingListItemModel.createModel.validate(data);
        yield (0, helpers_1.getIsAuthorized)((_a = req.auth) === null || _a === void 0 ? void 0 : _a.payload.sub, data.shoppingListId, ["owner", "member"]);
        const updatedShoppingList = yield index_1.prisma.shoppingList.update({
            where: {
                id: data.shoppingListId
            },
            data: {
                items: {
                    push: {
                        id: crypto.randomBytes(12).toString("hex"),
                        name: data.name
                    }
                }
            }
        }).catch(() => {
            throw (0, errors_1.ThrowableError)("Database error, check logs", 500, "shoppingListItem.unknown");
        });
        return updatedShoppingList;
    }
    catch (e) {
        next(e);
    }
});
exports.createItem = createItem;
const patchItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const data = req.body;
        shoppingListItem_1.shoppingListItemModel.updateModel.validate(data);
        yield (0, helpers_1.getIsAuthorized)((_b = req.auth) === null || _b === void 0 ? void 0 : _b.payload.sub, data.shoppingListId, ["owner"]);
        const shoppingListToUpdate = yield index_1.prisma.shoppingList.findFirst({
            where: {
                id: data.shoppingListId
            }
        }).catch(() => {
            throw (0, errors_1.ThrowableError)("Database error, check logs", 500, "shoppingListItem.unknown");
        });
        if (!shoppingListToUpdate)
            throw (0, errors_1.ThrowableError)("Shopping list with given id does not exist", 400, "shoppingList.notFound");
        const shoppingListItemToUpdateIndex = shoppingListToUpdate.items.findIndex(item => item.id === data.id);
        if (shoppingListItemToUpdateIndex === -1)
            throw (0, errors_1.ThrowableError)("Shopping list item with this id does not exist", 400, "shoppingListItem.update.notFound");
        Object.keys(data).forEach(key => {
            if (shoppingListToUpdate.items[shoppingListItemToUpdateIndex][key] !== undefined) {
                shoppingListToUpdate.items[shoppingListItemToUpdateIndex][key] = data[key];
            }
        });
        const updatedShoppingList = yield index_1.prisma.shoppingList.update({
            where: {
                id: data.shoppingListId
            },
            data: {
                items: shoppingListToUpdate.items
            }
        }).catch((e) => {
            throw (0, errors_1.ThrowableError)("Database error, check logs", 500, "shoppingListItem.unknown");
        });
        return updatedShoppingList;
    }
    catch (e) {
        next(e);
    }
});
exports.patchItem = patchItem;
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const data = req.body;
        shoppingListItem_1.shoppingListItemModel.deleteModel.validate(data);
        yield (0, helpers_1.getIsAuthorized)((_c = req.auth) === null || _c === void 0 ? void 0 : _c.payload.sub, data.shoppingListId, ["owner", "member"]);
        const shoppingListToUpdate = yield index_1.prisma.shoppingList.findFirst({
            where: {
                id: data.shoppingListId
            }
        }).catch(() => {
            throw (0, errors_1.ThrowableError)("Database error, check logs", 500, "shoppingListItem.unknown");
        });
        if (!shoppingListToUpdate)
            throw (0, errors_1.ThrowableError)("Shopping list with given id does not exist", 400, "shoppingList.notFound");
        const previousCount = shoppingListToUpdate.items.length;
        shoppingListToUpdate.items = shoppingListToUpdate.items.filter(item => item.id !== data.id);
        if (previousCount === shoppingListToUpdate.items.length)
            throw (0, errors_1.ThrowableError)("Shopping list item with this id does not exist", 400, "shoppingListItem.delete.notFound");
        const updatedShoppingList = yield index_1.prisma.shoppingList.update({
            where: {
                id: data.shoppingListId
            },
            data: {
                items: shoppingListToUpdate.items
            }
        }).catch((e) => {
            console.log(e);
            throw (0, errors_1.ThrowableError)("Database error, check logs", 500, "shoppingListItem.unknown");
        });
        return updatedShoppingList;
    }
    catch (e) {
        next(e);
    }
});
exports.deleteItem = deleteItem;
