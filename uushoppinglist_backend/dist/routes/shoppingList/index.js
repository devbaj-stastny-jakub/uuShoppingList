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
exports.shoppingListRouter = void 0;
const express_1 = __importDefault(require("express"));
const shoppingList_1 = require("../../controllers/shoppingList");
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const middlewares_1 = require("../../middlewares");
const jwtCheck = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: 'http://uushoppinglist.com',
    issuerBaseURL: 'https://dev-ducb3de5dqthsoxl.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});
exports.shoppingListRouter = express_1.default.Router();
exports.shoppingListRouter.get("/list", jwtCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shoppingListsList = yield (0, shoppingList_1.getListsList)(req, res, next);
    next(shoppingListsList);
}));
exports.shoppingListRouter.get("/:id", jwtCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shoppingList = yield (0, shoppingList_1.getList)(req, res, next);
    next(shoppingList);
}));
exports.shoppingListRouter.post("/create", jwtCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shoppingList = yield (0, shoppingList_1.createList)(req, res, next);
    next(shoppingList);
}));
exports.shoppingListRouter.patch("/update", jwtCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const shoppingList = yield (0, shoppingList_1.patchList)(req, res, next);
    next(shoppingList);
}));
exports.shoppingListRouter.delete("/delete", jwtCheck, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, shoppingList_1.deleteList)(req, res, next);
    next(response);
}));
exports.shoppingListRouter.use(middlewares_1.responseBuilder);
