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

export const DescriptionMenuItem = ()=>{
    const [opened, setOpened] = useState(false)
    const [name, setName] = useState("")
    const {shoppingList} = useAppSelector(state => state.shoppingList)
    const {loading, data, update} = usePatchShoppingList()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(!shoppingList) return
        setName(shoppingList.description)
    }, [shoppingList]);

    const handleRename = ()=>{
        if(!shoppingList) return
        update({id: shoppingList.id, description: name}).then(()=>{
            setOpened(false)
        })
    }
    useEffect(() => {
        data && dispatch(setShoppingList(data))
    }, [data]);

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
                    <Button color={"success"} onClick={()=>{handleRename()}} variant={"contained"}>
                        {loading ? <CircularProgress size={20} sx={{color: "white"}}/> : "Upravit"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
