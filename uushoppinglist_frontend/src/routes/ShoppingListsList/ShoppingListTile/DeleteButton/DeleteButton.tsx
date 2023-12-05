import {DeleteOutline} from "@mui/icons-material";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {MouseEventHandler, useState} from "react";
import {useAppDispatch, useDeleteShoppingList} from "../../../../hooks";
import {deleteShoppingList} from "../../../../store/shoppingListsListSlice";
import {useTranslation} from "react-i18next";

export interface DeleteButtonProps {
    id: string
}

export const DeleteButton = ({id}: DeleteButtonProps) => {
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const {deleteList, loading} = useDeleteShoppingList(id)
    const [opened, setOpened] = useState(false)
    const handleClick = (e: any) => {
        e.stopPropagation()
        setOpened(true)
    }
    const handleDelete = async (e: any)=>{
        e.stopPropagation()
        await deleteList().then(()=>{
            dispatch(deleteShoppingList(id))
        })
    }
    return (
        <>
            <Button onClick={handleClick} variant={"contained"}
                    sx={{p: 1, minWidth: 0, position: "absolute", top: 10, right: 10}}>
                <DeleteOutline/>
            </Button>
            <Dialog
                open={opened}
                onClose={() => {
                    setOpened(false)
                }}
            >
                <DialogTitle>
                    {t("shopping_lists.modal.delele_message")}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={(e) => {
                        e.stopPropagation()
                        setOpened(false)
                    }} color={"info"}>{t("shopping_lists.cancel")}</Button>
                    <Button color={"error"} onClick={handleDelete} variant={"contained"}>{t("shopping_lists.modal.delete")}</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
