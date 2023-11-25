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

export const DeleteMenuItem = ()=>{
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
            <MenuItem sx={{color: "error.main"}} onClick={()=>{setOpened(true)}}>Smazat</MenuItem>
            <Dialog
                open={opened}
                onClose={()=>{setOpened(false)}}
            >
                <DialogTitle>
                    Smazat nákupní seznam
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => {
                        setOpened(false)
                    }} color={"info"}>Zrušit</Button>
                    <Button color={"error"} onClick={()=>{handleDelete()}} variant={"contained"}>
                        {loading ? <CircularProgress size={20} sx={{color: "white"}}/> : "Smazat"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
