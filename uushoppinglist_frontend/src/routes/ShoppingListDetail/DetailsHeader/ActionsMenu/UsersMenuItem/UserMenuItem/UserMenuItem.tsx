import {Avatar, IconButton, MenuItem, Select, Stack, Typography} from "@mui/material";
import {useState} from "react";
import {DeleteOutline} from "@mui/icons-material";
import {useAppDispatch} from "../../../../../../hooks";
import {removeAuthorizedUser} from "../../../../../../store/shoppingListSlice";

export interface UserMenuItemProps {
    id: string
    name: string
    owner:boolean
}

export const UserMenuItem = ({name, owner, id}:UserMenuItemProps)=>{
    const dispatch = useAppDispatch()
    const handleRemoveUser = ()=>{
        dispatch(removeAuthorizedUser(id))
    }
    return(
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={1}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Avatar sx={{height: 30, width: 30}} />
                <Typography fontSize={14}>{name}</Typography>
                <Typography color={"text.disabled"} fontSize={14}>{owner ? "vlastník":"člen"}</Typography>
            </Stack>
            {!owner && <IconButton onClick={handleRemoveUser} size={"small"} color={"error"}><DeleteOutline /></IconButton>}
        </Stack>
    )
}
