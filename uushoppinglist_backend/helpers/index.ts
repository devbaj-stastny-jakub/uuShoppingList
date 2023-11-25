import {ThrowableError} from "../errors";
import {prisma} from "../index";
import {ShoppingList} from "../types";

export const getProfileFetch = async (userId: string, listId: string): Promise<null | "owner" | "member"> =>{
    const targetList = await prisma.shoppingList.findUnique({
        where: {
            id: listId
        }
    })
    if(!targetList) {
        throw ThrowableError("Shopping list with this id does not exist", 400, "shoppingList.get.notfound")
    }
    if(targetList.ownerId === userId) return "owner"
    if(!!targetList.membersIds.find(id=>id===userId)) return "member"
    return null
}

export const getProfile = (userId, list: ShoppingList): null | "owner" | "member" =>{
    if(list.ownerId === userId) return "owner"
    if(!!list.membersIds.find(id=>id===userId)) return "member"
    return null
}

export const getIsAuthorized = async (userId: string | undefined = "", listId: string, profiles: ("owner" | "member")[])=>{
    const profile = await getProfileFetch(userId, listId)
    let authorized = false;
    profiles.forEach(profileL=>{
        if(profileL === profile) authorized = true
    })
    if(!authorized) {
        throw ThrowableError(undefined, 401, "shoppingList.unauthorized")
    }
}
