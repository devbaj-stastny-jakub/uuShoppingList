import {CircularProgress, MenuItem} from "@mui/material";
import {useAppDispatch, useAppSelector, usePatchShoppingList} from "../../../../../hooks";
import {editShoppingListValues, setShoppingList} from "../../../../../store/shoppingListSlice";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

export const ArchiveMenuItem = ()=>{
    const {t}=useTranslation()
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
        <MenuItem onClick={handleArchive}>
            {loading ? <CircularProgress size={20} sx={{color: "black"}}/> : shoppingList?.isArchived ? t("shopping_list_detail.actions.unarchive"):t("shopping_list_detail.actions.archive")}
        </MenuItem>
    )
}
