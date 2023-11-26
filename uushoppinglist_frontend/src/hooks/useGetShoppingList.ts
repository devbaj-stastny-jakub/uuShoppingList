import {useEffect, useState} from "react";
import {ShoppingList} from "../types";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {backend} from "../config";
import {useAppDispatch} from "./store";
import {setError as setErrorAction} from "../store/errorSlice";

export const useGetShoppingList = (id?: string)=>{
    const [shoppingList, setShoppingList] = useState<ShoppingList | null>()
    const [error, setError] = useState(false)
    const {getAccessTokenSilently} = useAuth0()
    const dispatch = useAppDispatch()
    const handleFetch = async ()=>{
        try {
            const token = await getAccessTokenSilently()
            if(!token) return
            const response = await axios({
                method: "GET",
                url: backend.base_url + "/shoppingList/" + id,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setShoppingList(response.data.result as unknown as ShoppingList)
            setError(false)
        } catch (e: any) {
            setError(true)
            dispatch(setErrorAction(e.response.data.error.message))
        }
    }
    useEffect(() => {
        if(!id) return
        handleFetch()
    }, [id]);
    return {shoppingList, error}
}
