import {useEffect, useState} from "react";
import {ShoppingList} from "../types";
import {useAuth0} from "@auth0/auth0-react";
import {useGetShoppingList} from "./useGetShoppingList";
import {useAppSelector} from "./store";

export const useProfile = () => {
    const [isOwner, setIsOwner] = useState(false)
    const {profile} = useAppSelector(state => state.shoppingList)
    useEffect(() => {
        if(profile === "owner") setIsOwner(true)
    }, [profile]);
    return {isOwner}
}
