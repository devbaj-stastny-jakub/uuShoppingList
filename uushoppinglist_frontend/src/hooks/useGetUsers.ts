import {useEffect, useState} from "react";
import {ShoppingList, User} from "../types";
import {useAuth0} from "@auth0/auth0-react";
import axios from "axios";
import {backend} from "../config";
import {setError} from "../store/errorSlice";
import {useAppDispatch} from "./store";

export const useGetUsers = ()=>{
    const [data, setData] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()
    const {getAccessTokenSilently} = useAuth0()
    const handleFetch = async ()=>{
        try {
            setLoading(true)
            const token = await getAccessTokenSilently()
            if(!token) return
            const response = await axios({
                method: "GET",
                url: backend.base_url + "/user/list",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(response.data.result as unknown as User[])
        } catch (e: any) {
            dispatch(setError(e.response.data.error.message))
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        handleFetch()
    }, []);
    return {data, loading}
}
