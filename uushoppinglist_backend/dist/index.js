"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const shoppingList_1 = require("./routes/shoppingList");
const shoppingListItem_1 = require("./routes/shoppingListItem");
const cors_1 = __importDefault(require("cors"));
const middlewares_1 = require("./middlewares");
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const port = 3001;
exports.prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)({ credentials: true, origin: true }));
app.use(express_1.default.json({ limit: "50mb" }));
app.use("/shoppingList", shoppingList_1.shoppingListRouter);
app.use("/shoppingListItem", shoppingListItem_1.shoppingListItemRouter);
app.get('/', (req, res) => {
    res.send("Hello from express server.");
});
app.use(middlewares_1.errorHandler);
app.listen(3002, () => {
    console.log("server is running at port 3002");
});
