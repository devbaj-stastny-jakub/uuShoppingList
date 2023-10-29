import {useEffect, useState} from "react";
import {ShoppingList} from "../types";
import {_shoppingListsService} from "../services";
import {useAuth0} from "@auth0/auth0-react";

export const useAuthorized = (shoppingListId: string) => {
    const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null)
    const {isAuthenticated, user} = useAuth0()
    const [isOwner, setIsOwner] = useState(false)
    const [isAuthorized, setIsAuthorized] = useState(false)
    useEffect(() => {
        const sl = _shoppingListsService.getShoppingList("")
        setShoppingList(sl)
    }, [shoppingListId]);
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
