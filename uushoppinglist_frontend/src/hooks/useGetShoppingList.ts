import {useEffect, useState} from "react";
import {ShoppingList} from "../types";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {backend} from "../config";

export const useGetShoppingList = (id?: string)=>{
    const [shoppingList, setShoppingList] = useState<ShoppingList | null>()
    const {getAccessTokenSilently} = useAuth0()
    const handleFetch = async ()=>{
        try {
            const token = await getAccessTokenSilently()
            if(!token) return
            console.debug(token)
            const response = await axios({
                method: "GET",
                url: backend.base_url + "/shoppingList/" + id,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setShoppingList(response.data as unknown as ShoppingList)
        } catch (e: any) {
            console.debug(e)
        }
    }
    useEffect(() => {
        if(!id) return
        handleFetch()
    }, [id]);
    return {shoppingList}
}
