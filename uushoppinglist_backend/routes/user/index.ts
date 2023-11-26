import express, {NextFunction, Request, Response} from 'express';
import {auth} from "express-oauth2-jwt-bearer";
import {responseBuilder} from "../../middlewares";
import {getUsers} from "../../controllers/users";
const jwtCheck = auth({
    audience: 'http://uushoppinglist.com',
    issuerBaseURL: 'https://dev-ducb3de5dqthsoxl.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});
export const userRouter = express.Router()

userRouter.get("/list", jwtCheck, async (req: Request, res: Response, next: NextFunction) => {
    const usersList = await getUsers(req, res, next)
    next(usersList)
})

userRouter.use(responseBuilder)
