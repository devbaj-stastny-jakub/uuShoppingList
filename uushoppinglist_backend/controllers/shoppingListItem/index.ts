import {Request, Response} from "express";
import axios from "axios";
import {ShoppingList, User} from "../../types";
import {shoppingListItemModel} from "../../models/shoppingListItem";
import * as crypto from "crypto";
import {sls} from "../../data";
import {getIsAuthorized} from "../../helpers";

export const createItem = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const valid = shoppingListItemModel.createModel.validate(data)
        if (!valid) {
            res.status(400).send({
                errorMessages: [{
                    message: "Bad request",
                    reason: shoppingListItemModel.createModel.validate.errors
                }]
            })
            return;
        }
        const userInfo = await getUserInfo(req)
        if (!userInfo) {
            res.status(401).send({errorMessages: [{message: "Cannot get user info..."}]})
            return;
        }
        const targetList = sls.find(list=>list.id === data.shoppingListId)
        if(!targetList) {
            res.status(400).send({errorMessages: [{message: "Shopping list with this id doesnt exist"}]})
            return;
        }
        if (!getIsAuthorized(userInfo.sub, data.shoppingListId as string, ["owner", "member"])) {
            res.status(401).send({errorMessages: [{message: "You dont have permissions to create this object in specified list"}]})
            return;
        }
        const newItem = {
            id: crypto.randomBytes(24).toString("hex"),
            name: data.name,
            solved: false
        }
        return newItem
    } catch (exception) {
        res.status(500).send(exception)
    }
}

export const patchItem = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const valid = shoppingListItemModel.updateModel.validate(data)
        if (!valid) {
            res.status(400).send({
                errorMessages: [{
                    message: "Bad request",
                    reason: shoppingListItemModel.updateModel.validate.errors
                }]
            })
            return;
        }
        const userInfo = await getUserInfo(req)
        if (!userInfo) {
            res.status(401).send({errorMessages: [{message: "Cannot get user info..."}]})
            return;
        }
        const targetList = sls.find(list=>list.id === data.shoppingListId)
        if(!targetList) {
            res.status(400).send({errorMessages: [{message: "Shopping list with this id doesnt exist"}]})
            return;
        }
        if (!getIsAuthorized(userInfo.sub, data.shoppingListId as string, ["owner"])) {
            res.status(401).send({errorMessages: [{message: "You dont have permissions to update this object"}]})
            return;
        }
        const targetItem = targetList.items.find(item=>item.id === data.id)
        if(!targetItem) {
            res.status(400).send({errorMessages: [{message: "Item with this id doesnt exist"}]})
            return;
        }
        targetItem.name = data.name as string
        targetItem.solved = data.solved as boolean
        return targetItem
    } catch (exception) {
        res.status(500).send(exception)
    }
}

export const deleteItem = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const valid = shoppingListItemModel.deleteModel.validate(data)
        if (!valid) {
            res.status(400).send({
                errorMessages: [{
                    message: "Bad request",
                    reason: shoppingListItemModel.deleteModel.validate.errors
                }]
            })
            return;
        }
        const userInfo = await getUserInfo(req)
        if (!userInfo) {
            res.status(401).send({errorMessages: [{message: "Cannot get user info..."}]})
            return;
        }
        const targetList = sls.find(list=>list.id === data.shoppingListId)
        if(!targetList) {
            res.status(400).send({errorMessages: [{message: "Shopping list with this id doesnt exist"}]})
            return;
        }
        if (!getIsAuthorized(userInfo.sub, data.shoppingListId as string, ["owner", "member"])) {
            res.status(401).send({errorMessages: [{message: "You dont have permissions to delete this object"}]})
            return;
        }
        targetList.items = targetList.items.filter(item=>item.id !== data.id)
        return null
    } catch (exception) {
        res.status(500).send(exception)
    }
}

// @ts-ignore
async function getUserInfo(req: Request): Promise<User | null> {
    try {
        if (!req.auth) return null;
        const userInfoRequest = await axios.get("https://dev-ducb3de5dqthsoxl.us.auth0.com/userinfo", {
            headers: {
                Authorization: `Bearer ${req.auth.token}`
            }
        })
        return userInfoRequest.data as unknown as User
    } catch (e) {
        return null
    }
}
