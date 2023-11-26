import {
    Autocomplete,
    Avatar,
    Button, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider,
    MenuItem, Select,
    Stack,
    TextField, Typography
} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import {UserMenuItem} from "./UserMenuItem";
import {useAppDispatch, useAppSelector, useGetUsers, usePatchShoppingList} from "../../../../../hooks";
import {addAuthorizedUser, setShoppingList} from "../../../../../store/shoppingListSlice";
import {User} from "@auth0/auth0-react";

export const UsersMenuItem = () => {
    const [selectedUser, setSelecteduser] = useState<{label: string, value: string} | null>(null)
    const [opened, setOpened] = useState(false)
    const {data: patchData, update, loading: patchLoading} = usePatchShoppingList()
    const {data, loading} = useGetUsers()
    const {shoppingList} = useAppSelector(state => state.shoppingList)
    const dispatch = useAppDispatch()
    const handleAddMember = () => {
        if(!shoppingList) return;
        if(!selectedUser) return;
        update({
            id: shoppingList.id,
            membersIds: [...shoppingList.membersIds, selectedUser.value]
        }).then(()=>{
            setSelecteduser(null)
        })
    }
    useEffect(() => {
        patchData && dispatch(setShoppingList(patchData))
    }, [patchData]);
    const authorizedUsers = useMemo(() => {
        if (!data || !shoppingList) return []
        const allLocalUsers = [shoppingList.ownerId, ...shoppingList.membersIds]
        const users = data.filter((item: User) => {
            const id = item.user_id
            if (allLocalUsers.find((localId) => localId === id)) return true
            return false
        })
        return users
    }, [data, shoppingList]);
    const autoCompleteUsers = useMemo(()=>{
        const users = data.filter(usr=>{
            if(authorizedUsers.find((authUser)=>authUser.user_id === usr.user_id)) return false
            return true
        })
        return users
    }, [data, authorizedUsers])
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
                        {authorizedUsers.map((user) => (
                            <UserMenuItem key={user.id} name={user.name} id={user.user_id}/>
                        ))}
                    </Stack>
                    <Divider sx={{my: 1}}/>
                    <Stack direction={"row"} spacing={1}>
                        <Autocomplete
                            disablePortal
                            value={selectedUser}
                            id="combo-box-demo"
                            fullWidth
                            sx={{minWidth: 250}}
                            placeholder={"uzivatel@email.cz"}
                            onChange={(e, val)=>{
                                setSelecteduser(val as unknown as {label: string, value: string})
                            }}
                            options={
                                autoCompleteUsers.map(user => {
                                    return {
                                        label: user.name,
                                        value: user.user_id
                                    }
                                })}
                            renderInput={(params) => <TextField  {...params} />}
                        />
                        <Button onClick={() => {
                            handleAddMember()
                        }} disableElevation variant={"contained"}>
                            {patchLoading ? <CircularProgress size={20} sx={{color: "white"}}/> : "Přidat"}
                        </Button>
                    </Stack>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
        </>
    )
}
