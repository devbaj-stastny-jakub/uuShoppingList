import express, {Request, Response} from 'express';
import {createList, deleteList, getList, getListsList, patchList} from "../../controllers/shoppingList";
import {auth} from "express-oauth2-jwt-bearer";
const jwtCheck = auth({
    audience: 'http://uushoppinglist.com',
    issuerBaseURL: 'https://dev-ducb3de5dqthsoxl.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});
export const shoppingListRouter = express.Router()

shoppingListRouter.get("/list", jwtCheck, async (req: Request, res: Response) => {
    const shoppingListsList = await getListsList(req, res)
    return res.status(200).send(shoppingListsList)
})

shoppingListRouter.get("/:id", jwtCheck, async (req: Request, res: Response) => {
    const shoppingList = await getList(req, res)
    return res.status(200).send(shoppingList)
})

shoppingListRouter.post("/create", jwtCheck, async (req: Request, res: Response) => {
    const shoppingList = await createList(req, res)
    return res.status(200).send(shoppingList)
})

shoppingListRouter.patch("/update", jwtCheck, async (req: Request, res: Response) => {
    const shoppingList = await patchList(req, res)
    return res.status(200).send(shoppingList)
})

shoppingListRouter.delete("/delete", jwtCheck, async (req: Request, res: Response) => {
    await deleteList(req, res)
    return res.status(200).send()
})
