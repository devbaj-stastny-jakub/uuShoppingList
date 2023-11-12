import {Request, Response} from "express";
import axios from "axios";
import {ShoppingList, User} from "../../types";
import {shoppingListModel} from "../../models/shoppingList";
import {sls} from "../../data";
import {getIsAuthorized, getProfile} from "../../helpers";


export const getListsList = async (req: Request, res: Response) => {
    try {
        const userInfo = await getUserInfo(req)
        if (!userInfo) {
            res.status(401).send({
                inputData: null,
                errorMessages: [{message: "Cannot get user info..."}],
                result: null
            })
            return;
        }
        return {
            inputData: null,
            errorMessages: [],
            result: getAuthorisedShoppingLists(sls, userInfo)
        }
    } catch (exception) {
        res.status(500).send(exception)
    }
}

export const getList = async (req: Request, res: Response) => {
    try {
        const data = req.params.id
        const valid = shoppingListModel.identifierModel.validate(data)
        if (!valid) {
            res.status(400).send({
                inputData: data,
                errorMessages: [{message: "Bad request", reason: shoppingListModel.identifierModel.validate.errors}],
                result: null
            })
            return;
        }
        const userInfo = await getUserInfo(req)
        if (!userInfo) {
            res.status(401).send({
                inputData: data,
                errorMessages: [{message: "Cannot get user info..."}],
                result: null
            })
            return;
        }
        if (!getIsAuthorized(userInfo.sub, data, ["owner", "member"])) {
            res.status(401).send({
                inputData: data,
                errorMessages: [{message: "You dont have permissions to access this object"}],
                result: null
            })
            return;
        }
        return {
            inputData: data,
            errorMessages: [],
            result: sls[0]
        }
    } catch (exception) {
        res.status(500).send(exception)
    }
}

export const createList = async (req: Request, res: Response) => {
    try {
        const userInfo = await getUserInfo(req)
        if (!userInfo) {
            res.status(401).send({
                inputData: null,
                errorMessages: [{message: "Cannot get user info..."}],
                result: null
            })
            return;
        }
        return {
            inputData: null,
            errorMessages: [],
            result: sls[0]
        }
    } catch (exception) {
        res.status(500).send(exception)
    }
}

export const patchList = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const valid = shoppingListModel.updateModel.validate(data)
        if (!valid) {
            res.status(400).send({
                inputData: data,
                errorMessages: [{message: "Bad request", reason: shoppingListModel.updateModel.validate.errors}],
                result: null
            })
            return;
        }
        const userInfo = await getUserInfo(req)
        if (!userInfo) {
            res.status(401).send({
                inputData: data,
                errorMessages: [{message: "Cannot get user info..."}],
                result: null
            })
            return;
        }
        if (!getIsAuthorized(userInfo.sub, data.id as string, ["owner"])) {
            res.status(401).send({
                inputData: data,
                errorMessages: [{message: "You dont have permissions to update this object"}],
                result: null
            })
            return;
        }
        return {
            inputData: data,
            errorMessages: [],
            result: {...sls[0], ...data}
        }

    } catch (exception) {
        res.status(500).send(exception)
    }
}

export const deleteList = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const valid = shoppingListModel.deleteModel.validate(data)
        if (!valid) {
            res.status(400).send({
                inputData: data,
                errorMessages: [{message: "Bad request", reason: shoppingListModel.deleteModel.validate.errors}],
                result: null
            })
            return;
        }
        const userInfo = await getUserInfo(req)
        if (!userInfo) {
            res.status(401).send({
                inputData: data,
                errorMessages: [{message: "Cannot get user info..."}],
                result: null
            })
            return;
        }
        const targetList = sls.find(list => list.id === data.id)
        if (!targetList) {
            res.status(400).send({
                inputData: data,
                errorMessages: [{message: "Shopping list with this id does not exist"}],
                result: null
            })
            return;
        }
        if (!getIsAuthorized(userInfo.sub, data.id as string, ["owner"])) {
            res.status(401).send({
                inputData: data,
                errorMessages: [{message: "You dont have permissions to delete this object"}],
                result: null
            })
            return;
        }
        return {
            inputData: data,
            errorMessages: [],
            result: null
        }
    } catch (exception) {
        res.status(500).send(exception)
    }
}

function getAuthorisedShoppingLists(shoppingLists: ShoppingList[], userInfo: User): ShoppingList[] {
    // @ts-ignore
    const filteredList = shoppingLists.filter(shoppingList => {
        if (shoppingList.ownerId === userInfo.sub) return true
        return !!shoppingList.membersIds.find(id => id === userInfo.sub);
    })
    return filteredList.map(list => {
        list.profile = getProfile(userInfo.sub, list.id) as "member" | "owner"
        return list
    })
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
