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
exports.shoppingListItemRouter = void 0;
const express_1 = __importDefault(require("express"));
const shoppingListItem_1 = require("../../controllers/shoppingListItem");
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const middlewares_1 = require("../../middlewares");
const jwtCheck = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: 'http://uushoppinglist.com',
    issuerBaseURL: 'https://dev-ducb3de5dqthsoxl.us.auth0.com/',
    tokenSigningAlg: 'RS256',
});
exports.shoppingListItemRouter = express_1.default.Router();
exports.shoppingListItemRouter.post("/create", jwtCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shoppingList = yield (0, shoppingListItem_1.createItem)(req, res, next);
    next(shoppingList);
}));
exports.shoppingListItemRouter.patch("/update", jwtCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shoppingList = yield (0, shoppingListItem_1.patchItem)(req, res, next);
    next(shoppingList);
}));
exports.shoppingListItemRouter.delete("/delete", jwtCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, shoppingListItem_1.deleteItem)(req, res, next);
    next(response);
}));
exports.shoppingListItemRouter.use(middlewares_1.responseBuilder);
