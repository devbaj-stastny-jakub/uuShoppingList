import {useEffect, useState} from "react";
import {ShoppingList} from "../types";
import {useAuth0} from "@auth0/auth0-react";
import {useGetShoppingList} from "./useGetShoppingList";

export const useAuthorized = (shoppingListId: string) => {
    const {shoppingList} = useGetShoppingList(shoppingListId)
    const {isAuthenticated, user} = useAuth0()
    const [isOwner, setIsOwner] = useState(false)
    const [isAuthorized, setIsAuthorized] = useState(false)
    useEffect(() => {
        if (!isAuthenticated || !shoppingList) return
        if (shoppingList.ownerId === user?.sub) {
            setIsAuthorized(true)
            setIsOwner(true)
        }
        shoppingList.membersIds.forEach(id => {
            if (id === user?.sub) {
                setIsAuthorized(true)
            }
        })
    }, [isAuthenticated, shoppingList]);
    return {isOwner, isAuthorized}
}
