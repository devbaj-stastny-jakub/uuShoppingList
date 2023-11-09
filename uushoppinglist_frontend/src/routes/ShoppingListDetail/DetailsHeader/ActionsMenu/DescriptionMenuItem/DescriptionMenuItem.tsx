import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../hooks";
import {editShoppingListValues} from "../../../../../store/shoppingListSlice";

export const DescriptionMenuItem = ()=>{
    const [opened, setOpened] = useState(false)
    const [name, setName] = useState("")
    const {shoppingList} = useAppSelector(state => state.shoppingList)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!shoppingList) return
        setName(shoppingList.description)
    }, [shoppingList]);

    const handleRename = ()=>{
        dispatch(editShoppingListValues([{key: "description", value: name}]))
        setOpened(false)
    }

    return(
        <>
            <MenuItem onClick={()=>{setOpened(true)}}>Upravit popis</MenuItem>
            <Dialog
                open={opened}
                onClose={()=>{setOpened(false)}}
            >
                <DialogTitle>
                    Upravit popis nákupního seznamu
                </DialogTitle>
                <DialogContent>
                    <TextField multiline maxRows={5} value={name} onChange={(e)=>{setName(e.target.value)}} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpened(false)
                    }} color={"info"}>Zrušit</Button>
                    <Button color={"success"} onClick={()=>{handleRename()}} variant={"contained"}>Upravit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
