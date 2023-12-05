import {
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector, useDeleteShoppingList, usePatchShoppingList} from "../../../../../hooks";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const DeleteMenuItem = ()=>{
    const {t}=useTranslation()
    const [opened, setOpened] = useState(false)
    const {shoppingList} = useAppSelector(state => state.shoppingList)
    const navigate = useNavigate()
    const {loading, deleteList} = useDeleteShoppingList(shoppingList?.id || "")

    const handleDelete = ()=>{
        if(!shoppingList) return
        deleteList().then(()=>{
            navigate("/shoppingLists")
        })
    }

    return(
        <>
            <MenuItem sx={{color: "error.main"}} onClick={()=>{setOpened(true)}}>{t("shopping_list_detail.actions.delete")}</MenuItem>
            <Dialog
                open={opened}
                onClose={()=>{setOpened(false)}}
            >
                <DialogTitle>
                    {t("shopping_list_detail.actions.delete_modal.title")}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => {
                        setOpened(false)
                    }} color={"info"}>{t("shopping_list_detail.actions.delete_modal.cancel")}</Button>
                    <Button color={"error"} onClick={()=>{handleDelete()}} variant={"contained"}>
                        {loading ? <CircularProgress size={20} sx={{color: "white"}}/> : t("shopping_list_detail.actions.delete_modal.delete")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
