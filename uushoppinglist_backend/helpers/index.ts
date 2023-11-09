import {sls} from "../data";

export const getProfile = (userId: string, listId: string): null | "owner" | "member" =>{
    const targetList = sls.find(list=>list.id === listId)
    if(!targetList) return null
    if(targetList.ownerId === userId) return "owner"
    if(!!targetList.membersIds.find(id=>id===userId)) return "member"
    return null
}

export const getIsAuthorized = (userId: string, listId: string, profiles: ("owner" | "member")[])=>{
    const profile = getProfile(userId, listId)
    let authorized = false;
    profiles.forEach(profileL=>{
        if(profileL === profile) authorized = true
    })
    return authorized
}
