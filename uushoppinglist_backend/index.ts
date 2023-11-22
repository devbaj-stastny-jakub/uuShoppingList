import express, { Request, Response, NextFunction } from 'express';
import {shoppingListRouter} from "./routes/shoppingList";
import {shoppingListItemRouter} from "./routes/shoppingListItem";
import cors from "cors"
import {errorHandler} from "./middlewares";
import {PrismaClient} from "@prisma/client";

const app = express();
const port = 3001;
export const prisma = new PrismaClient()

app.use(cors())
app.use(express.json({limit: "50mb"}));

app.use("/shoppingList", shoppingListRouter)
app.use("/shoppingListItem", shoppingListItemRouter)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Shopping list application is running on port ${port}.`);
});
