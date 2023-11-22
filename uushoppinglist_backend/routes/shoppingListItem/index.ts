import express, {NextFunction, Request, Response} from 'express';
import {createItem, deleteItem, patchItem,} from "../../controllers/shoppingListItem";
import {auth} from "express-oauth2-jwt-bearer";
import {responseBuilder} from "../../middlewares";

const jwtCheck = auth({
    audience: 'http://uushoppinglist.com',
    issuerBaseURL: 'https://dev-ducb3de5dqthsoxl.us.auth0.com/',
    tokenSigningAlg: 'RS256',
});

export const shoppingListItemRouter = express.Router()

shoppingListItemRouter.post("/create", jwtCheck, async (req: Request, res: Response, next: NextFunction) => {
    const shoppingList = await createItem(req, res, next)
    next(shoppingList)
})

shoppingListItemRouter.patch("/update", jwtCheck, async (req: Request, res: Response, next: NextFunction) => {
    const shoppingList = await patchItem(req, res, next)
    next(shoppingList)
})

shoppingListItemRouter.delete("/delete", jwtCheck, async (req: Request, res: Response, next: NextFunction) => {
    const response = await deleteItem(req, res, next)
    next(response)
})

shoppingListItemRouter.use(responseBuilder)
