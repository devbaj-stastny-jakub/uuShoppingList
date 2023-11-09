import express, {Request, Response} from 'express';
import {createItem, deleteItem, patchItem,} from "../../controllers/shoppingListItem";
import {auth} from "express-oauth2-jwt-bearer";

const jwtCheck = auth({
    audience: 'http://uushoppinglist.com',
    issuerBaseURL: 'https://dev-ducb3de5dqthsoxl.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

export const shoppingListItemRouter = express.Router()

shoppingListItemRouter.post("/create", jwtCheck, async (req: Request, res: Response) => {
    const shoppingList = await createItem(req, res)
    return res.status(200).send(shoppingList)
})

shoppingListItemRouter.patch("/update", jwtCheck, async (req: Request, res: Response) => {
    const shoppingList = await patchItem(req, res)
    return res.status(200).send(shoppingList)
})

shoppingListItemRouter.delete("/delete", jwtCheck, async (req: Request, res: Response) => {
    await deleteItem(req, res)
    return res.status(200).send()
})
