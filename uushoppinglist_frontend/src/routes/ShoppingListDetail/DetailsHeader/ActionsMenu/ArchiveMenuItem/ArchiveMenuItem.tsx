import {MenuItem} from "@mui/material";
import {useAppDispatch, useAppSelector, usePatchShoppingList} from "../../../../../hooks";
import {editShoppingListValues, setShoppingList} from "../../../../../store/shoppingListSlice";
import {useEffect} from "react";

export const ArchiveMenuItem = ()=>{
    const dispatch = useAppDispatch()
    const {loading, data, update} = usePatchShoppingList()
    const {shoppingList} = useAppSelector(state => state.shoppingList)
    const handleArchive = ()=>{
        if(!shoppingList) return
        update({id: shoppingList.id, isArchived: !shoppingList.isArchived})
    }
    useEffect(() => {
        data && dispatch(setShoppingList(data))
    }, [data]);
    return (
        <MenuItem onClick={handleArchive}>{shoppingList?.isArchived ? "Odarchivovat":"Archivovat"}</MenuItem>
    )
}
