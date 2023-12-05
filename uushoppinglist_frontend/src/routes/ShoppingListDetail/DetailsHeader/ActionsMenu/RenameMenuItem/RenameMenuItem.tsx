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
import {useAppDispatch, useAppSelector, usePatchShoppingList} from "../../../../../hooks";
import {editShoppingListValues, setShoppingList} from "../../../../../store/shoppingListSlice";
import {useTranslation} from "react-i18next";

export const RenameMenuItem = ()=>{
    const {t}=useTranslation()
    const [opened, setOpened] = useState(false)
    const [name, setName] = useState("")
    const {shoppingList} = useAppSelector(state => state.shoppingList)
    const dispatch = useAppDispatch()
    const {loading, data, update} = usePatchShoppingList()

    useEffect(() => {
        if(!shoppingList) return
        setName(shoppingList.name)
    }, [shoppingList]);

    const handleRename = ()=>{
        if(!shoppingList) return
        update({id: shoppingList.id, name: name}).then(()=>{
            setOpened(false)
        })
    }
    useEffect(() => {
        data && dispatch(setShoppingList(data))
    }, [data]);

    return(
        <>
            <MenuItem onClick={()=>{setOpened(true)}}>{t("shopping_list_detail.actions.rename")}</MenuItem>
            <Dialog
                open={opened}
                onClose={()=>{setOpened(false)}}
            >
                <DialogTitle>
                    {t("shopping_list_detail.actions.rename_modal.title")}
                </DialogTitle>
                <DialogContent>
                    <TextField value={name} onChange={(e)=>{setName(e.target.value)}} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpened(false)
                    }} color={"info"}>{t("shopping_list_detail.actions.rename_modal.cancel")}</Button>
                    <Button color={"success"} onClick={()=>{handleRename()}} variant={"contained"}>
                        {loading ? <CircularProgress size={20} sx={{color: "white"}}/> : t("shopping_list_detail.actions.rename_modal.rename")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
