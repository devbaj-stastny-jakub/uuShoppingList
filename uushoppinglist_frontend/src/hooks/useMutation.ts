import axios from "axios";
import {backend} from "../config"
import {useAuth0} from "@auth0/auth0-react";
import {useState} from "react";
import {
    CreateShoppingListItemBody,
    DeleteShoppingListItemDelete,
    ShoppingList,
    UpdateShoppingListBody,
    UpdateShoppingListItemBody
} from "../types";
import {setError} from "../store/errorSlice";
import {useAppDispatch} from "./store";

export const useCreateShoppingList = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<ShoppingList | null>(null)
    const {getAccessTokenSilently} = useAuth0()
    const dispatch = useAppDispatch()
    const create = async () => {
        try {
            setLoading(true)
            const res = await axios({
                method: "POST",
                url: backend.base_url + "/shoppingList/create",
                headers: {
                    Authorization: "Bearer " + await getAccessTokenSilently()
                }
            })
            setData(res.data.result)
        } catch (e: any) {
            dispatch(setError(e.response.data.error.message))
        } finally {
            setLoading(false)
        }
    }
    return {loading, data, create}
}

export const usePatchShoppingList = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<ShoppingList | null>(null)
    const {getAccessTokenSilently} = useAuth0()
    const dispatch = useAppDispatch()
    const update = async (data: UpdateShoppingListBody) => {
        try {
            setLoading(true)
            const res = await axios({
                method: "PATCH",
                url: backend.base_url + "/shoppingList/update",
                headers: {
                    Authorization: "Bearer " + await getAccessTokenSilently()
                },
                data: data
            })
            setData(res.data.result)
        } catch (e: any) {
            dispatch(setError(e.response.data.error.message))
        } finally {
            setLoading(false)
        }
    }
    return {loading, data, update}
}

export const useDeleteShoppingList = (shoppingListId: string) => {
    const [loading, setLoading] = useState(false)
    const {getAccessTokenSilently} = useAuth0()
    const dispatch = useAppDispatch()
    const deleteList = async () => {
        try {
            setLoading(true)
            const res = await axios({
                method: "DELETE",
                url: backend.base_url + "/shoppingList/delete",
                headers: {
                    Authorization: "Bearer " + await getAccessTokenSilently()
                },
                data: {
                    id: shoppingListId
                }
            })
        } catch (e: any) {
            dispatch(setError(e.response.data.error.message))
        } finally {
            setLoading(false)
        }
    }
    return {loading, deleteList}
}

export const useCreateShoppingListItem = (body: CreateShoppingListItemBody) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<ShoppingList | null>(null)
    const {getAccessTokenSilently} = useAuth0()
    const dispatch = useAppDispatch()
    const create = async () => {
        try {
            setLoading(true)
            const res = await axios({
                method: "POST",
                url: backend.base_url + "/shoppingListItem/create",
                headers: {
                    Authorization: "Bearer " + await getAccessTokenSilently()
                },
                data: body
            })
            setData(res.data.result)
        } catch (e: any) {
            dispatch(setError(e.response.data.error.message))
        } finally {
            setLoading(false)
        }
    }
    return {loading, data, create}
}

export const usePatchShoppingListItem = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<ShoppingList | null>(null)
    const {getAccessTokenSilently} = useAuth0()
    const dispatch = useAppDispatch()
    const update = async (data: UpdateShoppingListItemBody) => {
        try {
            setLoading(true)
            const res = await axios({
                method: "PATCH",
                url: backend.base_url + "/shoppingListItem/update",
                headers: {
                    Authorization: "Bearer " + await getAccessTokenSilently()
                },
                data: data
            })
            setData(res.data.result)
        } catch (e: any) {
            dispatch(setError(e.response.data.error.message))
        } finally {
            setLoading(false)
        }
    }
    return {loading, data, update}
}

export const useDeleteShoppingListItem = () => {
    const [loading, setLoading] = useState(false)
    const {getAccessTokenSilently} = useAuth0()
    const dispatch = useAppDispatch()
    const deleteList = async (data: DeleteShoppingListItemDelete) => {
        try {
            setLoading(true)
            const res = await axios({
                method: "DELETE",
                url: backend.base_url + "/shoppingListItem/delete",
                headers: {
                    Authorization: "Bearer " + await getAccessTokenSilently()
                },
                data: data
            })
        } catch (e: any) {
            dispatch(setError(e.response.data.error.message))
        } finally {
            setLoading(false)
        }
    }
    return {loading, deleteList}
}
