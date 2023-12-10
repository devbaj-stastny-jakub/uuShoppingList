import {useEffect, useState} from "react";
import {ShoppingList} from "../types";
import axios from "axios"
import {backend} from "../config"
import {useAuth0} from "@auth0/auth0-react";
import {setError} from "../store/errorSlice";
import {useAppDispatch} from "./store";

export const useGetShoppingLists = () => {
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([])
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()
    const {getAccessTokenSilently, user} = useAuth0()
    const handleFetch = async ()=>{
        try {
            const token = await getAccessTokenSilently()
            if(!token) return
            console.debug(token)
            const response = await axios({
                method: "GET",
                url: backend.base_url + "/shoppingList/list",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setShoppingLists(response.data.result as unknown as ShoppingList[])
        } catch (e: any) {
            dispatch(setError(e.response.data.error.message))
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        handleFetch()
    }, []);
    return {shoppingLists, loading}
}
