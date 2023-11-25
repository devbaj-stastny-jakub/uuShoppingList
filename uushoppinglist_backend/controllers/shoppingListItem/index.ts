import {NextFunction, Request, Response} from "express";
import {shoppingListItemModel} from "../../models/shoppingListItem";
import * as crypto from "crypto";
import {getIsAuthorized} from "../../helpers";
import {ThrowableError} from "../../errors";
import {prisma} from "../../index";

export const createItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        shoppingListItemModel.createModel.validate(data)
        await getIsAuthorized(req.auth?.payload.sub, data.shoppingListId as string, ["owner", "member"])
        const updatedShoppingList = await prisma.shoppingList.update({
            where: {
                id: data.shoppingListId
            },
            data: {
                items: {
                    push: {
                        id: crypto.randomBytes(12).toString("hex"),
                        name: data.name
                    }
                }
            }
        }).catch(() => {
            throw ThrowableError("Database error, check logs", 500, "shoppingListItem.unknown")
        })
        return updatedShoppingList
    } catch (e) {
        next(e)
    }
}

export const patchItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        shoppingListItemModel.updateModel.validate(data)
        await getIsAuthorized(req.auth?.payload.sub, data.shoppingListId as string, ["owner"])
        const shoppingListToUpdate = await prisma.shoppingList.findFirst({
            where: {
                id: data.shoppingListId
            }
        }).catch(() => {
            throw ThrowableError("Database error, check logs", 500, "shoppingListItem.unknown")
        })
        if (!shoppingListToUpdate) throw ThrowableError("Shopping list with given id does not exist", 400, "shoppingList.notFound")
        const shoppingListItemToUpdateIndex = shoppingListToUpdate.items.findIndex(item => item.id === data.id)
        if (shoppingListItemToUpdateIndex === -1) throw ThrowableError("Shopping list item with this id does not exist", 400, "shoppingListItem.update.notFound")
        Object.keys(data).forEach(key => {
            if (shoppingListToUpdate.items[shoppingListItemToUpdateIndex][key] !== undefined) {
                shoppingListToUpdate.items[shoppingListItemToUpdateIndex][key] = data[key]
            }
        })
        const updatedShoppingList = await prisma.shoppingList.update({
            where: {
                id: data.shoppingListId
            },
            data: {
                items: shoppingListToUpdate.items
            }
        }).catch((e) => {
            throw ThrowableError("Database error, check logs", 500, "shoppingListItem.unknown")
        })
        return updatedShoppingList
    } catch (e) {
        next(e)
    }
}

export const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body
        shoppingListItemModel.deleteModel.validate(data)
        await getIsAuthorized(req.auth?.payload.sub, data.shoppingListId as string, ["owner", "member"])
        const shoppingListToUpdate = await prisma.shoppingList.findFirst({
            where: {
                id: data.shoppingListId
            }
        }).catch(() => {
            throw ThrowableError("Database error, check logs", 500, "shoppingListItem.unknown")
        })
        if (!shoppingListToUpdate) throw ThrowableError("Shopping list with given id does not exist", 400, "shoppingList.notFound")
        const previousCount = shoppingListToUpdate.items.length
        shoppingListToUpdate.items = shoppingListToUpdate.items.filter(item => item.id !== data.id)
        if (previousCount === shoppingListToUpdate.items.length) throw ThrowableError("Shopping list item with this id does not exist", 400, "shoppingListItem.delete.notFound")
        const updatedShoppingList = await prisma.shoppingList.update({
            where: {
                id: data.shoppingListId
            },
            data: {
                items: shoppingListToUpdate.items
            }
        }).catch((e) => {
            console.log(e);
            throw ThrowableError("Database error, check logs", 500, "shoppingListItem.unknown")
        })
        return updatedShoppingList
    } catch (e) {
        next(e)
    }
}
