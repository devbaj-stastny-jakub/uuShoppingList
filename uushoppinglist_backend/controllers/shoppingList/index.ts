import {NextFunction, Request, Response} from "express";
import {shoppingListModel} from "../../models/shoppingList";
import {getIsAuthorized} from "../../helpers";
import {ThrowableError} from "../../errors";
import {prisma} from "../../index";

export const getListsList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingLists = await prisma.shoppingList.findMany({
            where: {
                OR: [
                    {
                        ownerId: req.auth?.payload.sub
                    },
                    {
                        membersIds: {
                            has: req.auth?.payload.sub
                        }
                    }
                ]
            }
        }).catch(()=>{throw ThrowableError("Database error, check logs", 500, "shoppingList.unknown")})
        return shoppingLists
    } catch (e) {
        next(e)
    }
}

export const getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.params.id
        shoppingListModel.identifierModel.validate(data)
        await getIsAuthorized(req.auth?.payload.sub, data, ["owner", "member"])
        const targetList = await prisma.shoppingList.findUnique({
            where: {
                id: data
            }
        }).catch(()=>{throw ThrowableError("Database error, check logs", 500, "shoppingList.unknown")})
        return targetList
    } catch (e) {
        next(e)
    }
}

export const createList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.auth?.payload.sub) throw ThrowableError("Cannot get user id", 401, "shoppingList.create.unauthorized")
        const createdShoppingList = await prisma.shoppingList.create({
            data: {
                ownerId: req.auth?.payload.sub,
                name: "Nový nákupní seznam",
                image: "https://as2.ftcdn.net/v2/jpg/02/37/34/63/1000_F_237346369_ktPSCiSI20SZvMGMn4HA96aDW5QVNmjx.jpg"
            }
        }).catch(()=>{throw ThrowableError("Database error, check logs", 500, "shoppingList.unknown")})
        return createdShoppingList
    } catch (e) {
        next(e)
    }
}

export const patchList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        shoppingListModel.updateModel.validate(data)
        await getIsAuthorized(req.auth?.payload.sub, data.id as string, ["owner"])
        const updatedShoppingList = await prisma.shoppingList.update(
            {
                where: {
                    id: data.id
                },
                data: {
                    ...data,
                    id: undefined
                }
            }
        ).catch(()=>{throw ThrowableError("Database error, check logs", 500, "shoppingList.unknown")})
        return updatedShoppingList
    } catch (e) {
        next(e)
    }
}

export const deleteList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        shoppingListModel.deleteModel.validate(data)
        await getIsAuthorized(req.auth?.payload.sub, data.id as string, ["owner"])
        await prisma.shoppingList.delete({
            where: {
                id: data.id
            }
        }).catch(()=>{throw ThrowableError("Database error, check logs", 500, "shoppingList.unknown")})
        return {}
    } catch (e) {
        next(e)
    }
}
