import express, {NextFunction, Request, Response} from 'express';
import {createList, deleteList, getList, getListsList, patchList} from "../../controllers/shoppingList";
import {auth} from "express-oauth2-jwt-bearer";
import {responseBuilder} from "../../middlewares";
const jwtCheck = auth({
    audience: 'http://uushoppinglist.com',
    issuerBaseURL: 'https://dev-ducb3de5dqthsoxl.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});
export const shoppingListRouter = express.Router()

shoppingListRouter.get("/list", jwtCheck, async (req: Request, res: Response, next: NextFunction) => {
    const shoppingListsList = await getListsList(req, res, next)
    next(shoppingListsList)
})

shoppingListRouter.get("/:id", jwtCheck, async (req: Request, res: Response, next: NextFunction) => {
    const shoppingList = await getList(req, res, next)
    next(shoppingList)
})

shoppingListRouter.post("/create", jwtCheck, async (req: Request, res: Response, next: NextFunction) => {
    const shoppingList = await createList(req, res, next)
    next(shoppingList)
})

shoppingListRouter.patch("/update", jwtCheck, async (req: Request, res: Response, next: NextFunction) => {
    const shoppingList = await patchList(req, res, next)
    next(shoppingList)
})

shoppingListRouter.delete("/delete", jwtCheck, async (req: Request, res: Response, next: NextFunction) => {
    const response = await deleteList(req, res, next)
    next(response)
})

shoppingListRouter.use(responseBuilder)
