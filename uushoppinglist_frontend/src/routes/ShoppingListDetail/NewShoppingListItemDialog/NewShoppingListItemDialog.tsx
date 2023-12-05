import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import {createShoppingListItem, setShoppingList} from "../../../store/shoppingListSlice";
import {useAppDispatch, useAppSelector, useCreateShoppingListItem} from "../../../hooks";
import {useTranslation} from "react-i18next";

export interface NewShoppingListItemDialogProps {
    open: boolean
    handleClose: (state: boolean) => void
}

export const NewShoppingListItemDialog = ({open, handleClose}: NewShoppingListItemDialogProps) => {
    const {t}=useTranslation()
    const [name, setName] = useState("")
    const dispatch = useAppDispatch()
    const {shoppingList} = useAppSelector(state => state.shoppingList)
    const {loading, data, create} = useCreateShoppingListItem({shoppingListId: shoppingList?.id || "", name: name})
    const handleCreateShoppingListItem = () => {
        create().then(() => {
            handleClose(false)
        })
    }
    useEffect(() => {
        data && dispatch(setShoppingList(data))
    }, [data]);
    return (
        <Dialog open={open} onClose={() => {
            handleClose(false)
        }}>
            <DialogTitle>
                {t("shopping_list_detail.modal.type_new_name")}
            </DialogTitle>
            <DialogContent>
                <TextField value={name} onChange={(e) => {
                    setName(e.target.value)
                }} fullWidth placeholder={t("shopping_list_detail.modal.new_name")}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    handleClose(false)
                }} color={"info"}>{t("shopping_list_detail.modal.cancel")}</Button>
                <Button onClick={() => {
                    handleClose(false)
                    handleCreateShoppingListItem()
                    setName("")
                }} variant={"contained"} color={"success"}>
                    {loading ? <CircularProgress size={20} sx={{color: "white"}}/> : t("shopping_list_detail.modal.create")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
