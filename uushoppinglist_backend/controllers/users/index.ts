import {NextFunction, Request, Response} from "express";
import {prisma} from "../../index";
import {ThrowableError} from "../../errors";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await prisma.user.findMany({})
            .catch(() => {
                throw ThrowableError("Database error, check logs", 500, "shoppingList.unknown")
            })
        return users
    } catch (e) {
        next(e)
    }
}
