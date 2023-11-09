import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider,
    MenuItem, Select,
    Stack,
    TextField, Typography
} from "@mui/material";
import {useState} from "react";
import {UserMenuItem} from "./UserMenuItem";
import {useAppDispatch, useAppSelector} from "../../../../../hooks";
import {addAuthorizedUser} from "../../../../../store/shoppingListSlice";

export const UsersMenuItem = () => {
    const [opened, setOpened] = useState(false)
    const [email, setEmail] = useState("")
    const {shoppingList} = useAppSelector(state => state.shoppingList)
    const dispatch = useAppDispatch()
    const handleAddMember = () => {
        dispatch(addAuthorizedUser(`auth0|653e66f0b40aed8716e${Math.floor(Math.random()*100000)}`))
        setEmail("")
    }

    return (
        <>
            <MenuItem onClick={() => {
                setOpened(true)
            }}>Spravovat členy</MenuItem>
            <Dialog
                open={opened}
                onClose={() => {
                    setOpened(false)
                }}
            >
                <DialogTitle>
                    Členové
                </DialogTitle>
                <DialogContent>
                    <Stack spacing={1}>
                        {shoppingList && (
                            <UserMenuItem name={shoppingList.ownerId} owner={true} id={shoppingList.ownerId}/>
                        )}
                        {shoppingList && shoppingList.membersIds.map((memberId)=>(
                            <UserMenuItem key={memberId} name={memberId} owner={false} id={memberId}/>
                        ))}
                    </Stack>
                    <Divider sx={{my: 1}}/>
                    <Stack direction={"row"} spacing={1}>
                        <TextField value={email} onChange={(e) => {
                            setEmail(e.target.value)
                        }} fullWidth size={"small"} placeholder={"uzivatel@email.cz"}/>
                        <Button onClick={() => {
                            handleAddMember()
                        }} disableElevation variant={"contained"}>Přidat</Button>
                    </Stack>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </>
    )
}
