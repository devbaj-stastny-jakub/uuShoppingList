import {Checkbox, IconButton, Stack, Typography} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import {ChangeEvent, useEffect} from "react";
import {deleteShoppingListItem, setShoppingList, setShoppingListItemState} from "../../../store/shoppingListSlice";
import {useAppDispatch, useAppSelector, useDeleteShoppingListItem, usePatchShoppingListItem} from "../../../hooks";

export interface ShoppingListItemProps {
    id: string
    name: string
    solved: boolean
}

export const ShoppingListItem = ({id, solved, name}: ShoppingListItemProps) => {
    const dispatch = useAppDispatch()
    const {loading, data, update} = usePatchShoppingListItem()
    const {deleteList} = useDeleteShoppingListItem()
    const {shoppingList} = useAppSelector(state => state.shoppingList)
    const handleShoppingListItemStateChange = (id: string, checked: boolean) => {
        if(!shoppingList?.id) return
        update({id: id, shoppingListId: shoppingList.id, solved: checked})
    }
    useEffect(() => {
        data && dispatch(setShoppingList(data))
    }, [data]);

    const handleShoppingListItemDelete = (id: string) => {
        if(!shoppingList?.id) return
        deleteList({shoppingListId: shoppingList.id, id}).then(()=>{
            dispatch(deleteShoppingListItem(id))
        })
    }
    return (
        <Grid xs={12} sm={6}>
            <Stack alignItems={"center"} justifyContent={"space-between"} direction={"row"} p={1.25} border={1}
                   borderColor={"text.disabled"} borderRadius={1}>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Checkbox checked={solved} onChange={(e) => {
                        handleShoppingListItemStateChange(id, e.target.checked)
                    }} color={"primary"}/>
                    <Typography color={"text.primary"}>{name}</Typography>
                </Stack>
                <IconButton onClick={()=>{handleShoppingListItemDelete(id)}} sx={{ml: "auto"}} size={"small"} color={"primary"}><DeleteOutline/></IconButton>
            </Stack>
        </Grid>
    )
}
