import {Avatar, CircularProgress, IconButton, MenuItem, Select, Stack, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {DeleteOutline} from "@mui/icons-material";
import {useAppDispatch, useAppSelector, usePatchShoppingList} from "../../../../../../hooks";
import {removeAuthorizedUser, setShoppingList} from "../../../../../../store/shoppingListSlice";
import {useTranslation} from "react-i18next";

export interface UserMenuItemProps {
    id: string
    name: string
}

export const UserMenuItem = ({name, id}:UserMenuItemProps)=>{
    const {t}=useTranslation()
    const [owner, setOwner] = useState(false)
    const dispatch = useAppDispatch()
    const {shoppingList} = useAppSelector(state => state.shoppingList)
    const {data, update, loading} = usePatchShoppingList()
    const handleRemoveUser = ()=>{
        if(!shoppingList) return;
        update({
            id: shoppingList.id,
            membersIds: [...shoppingList.membersIds.filter(memberId=>memberId !== id)]
        })
    }
    useEffect(() => {
        data && dispatch(setShoppingList(data))
    }, [data]);
    useEffect(() => {
        if(shoppingList?.ownerId === id) setOwner(true)
    }, [shoppingList]);
    return(
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={1}>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Avatar sx={{height: 30, width: 30}} />
                <Typography fontSize={14}>{name}</Typography>
                <Typography color={"text.disabled"} fontSize={14}>{owner ? t("shopping_list_detail.actions.users_modal.owner"):t("shopping_list_detail.actions.users_modal.member")}</Typography>
            </Stack>
            {!owner && (loading ? <CircularProgress size={20} sx={{color: "white"}}/> : <IconButton onClick={handleRemoveUser} size={"small"} color={"error"}><DeleteOutline /></IconButton>)}
        </Stack>
    )
}
