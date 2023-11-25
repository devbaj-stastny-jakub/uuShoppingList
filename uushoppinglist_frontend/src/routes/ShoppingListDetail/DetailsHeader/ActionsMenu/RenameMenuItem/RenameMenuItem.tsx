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

export const RenameMenuItem = ()=>{
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
            <MenuItem onClick={()=>{setOpened(true)}}>Přejmenovat</MenuItem>
            <Dialog
                open={opened}
                onClose={()=>{setOpened(false)}}
            >
                <DialogTitle>
                    Přejmenovat nákupní seznam
                </DialogTitle>
                <DialogContent>
                    <TextField value={name} onChange={(e)=>{setName(e.target.value)}} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpened(false)
                    }} color={"info"}>Zrušit</Button>
                    <Button color={"success"} onClick={()=>{handleRename()}} variant={"contained"}>
                        {loading ? <CircularProgress size={20} sx={{color: "white"}}/> : "Přejmenovat"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
