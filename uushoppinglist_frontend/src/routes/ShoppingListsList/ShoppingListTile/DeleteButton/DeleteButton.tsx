import {DeleteOutline} from "@mui/icons-material";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {MouseEventHandler, useState} from "react";

export const DeleteButton = () => {
    const [opened, setOpened] = useState(false)
    const handleClick = (e: any) => {
        e.stopPropagation()
        setOpened(true)
    }
    const handleDelete = (e:any) => {
        e.stopPropagation()
        console.debug("delete")
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
                    Opravdu si přejete smazat nákupní seznam?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={(e) => {
                        e.stopPropagation()
                        setOpened(false)
                    }} color={"info"}>Zrušit</Button>
                    <Button color={"error"} onClick={handleDelete} variant={"contained"}>Smazat</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
