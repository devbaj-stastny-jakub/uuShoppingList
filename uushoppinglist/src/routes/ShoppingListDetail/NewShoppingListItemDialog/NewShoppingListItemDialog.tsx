import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import {createShoppingListItem} from "../../../store/shoppingListSlice";
import {useAppDispatch} from "../../../hooks";

export interface NewShoppingListItemDialogProps {
    open: boolean
    handleClose: (state: boolean) => void
}

export const NewShoppingListItemDialog = ({open, handleClose}: NewShoppingListItemDialogProps) => {
    const [name, setName] = useState("")
    const dispatch = useAppDispatch()
    const handleCreateShoppingListItem = (name: string) => {
        dispatch(createShoppingListItem(name))
    }
    return (
        <Dialog open={open} onClose={()=>{handleClose(false)}}>
            <DialogTitle>
                Zadejte název položky seznamu
            </DialogTitle>
            <DialogContent>
                <TextField value={name} onChange={(e) => {
                    setName(e.target.value)
                }} fullWidth placeholder={"Název položky"}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    handleClose(false)
                }} color={"info"}>Zrušit</Button>
                <Button onClick={() => {
                    handleClose(false)
                    handleCreateShoppingListItem(name)
                    setName("")
                }} variant={"contained"} color={"success"}>Vytvořit</Button>
            </DialogActions>
        </Dialog>
    )
}
