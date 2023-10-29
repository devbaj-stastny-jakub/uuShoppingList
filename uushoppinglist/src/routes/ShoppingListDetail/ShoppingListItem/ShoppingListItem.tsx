import {Checkbox, IconButton, Stack, Typography} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2";
import {ChangeEvent} from "react";
import {deleteShoppingListItem, setShoppingListItemState} from "../../../store/shoppingListSlice";
import {useAppDispatch} from "../../../hooks";

export interface ShoppingListItemProps {
    id: string
    name: string
    solved: boolean
}

export const ShoppingListItem = ({id, solved, name}: ShoppingListItemProps) => {
    const dispatch = useAppDispatch()

    const handleShoppingListItemStateChange = (id: string, checked: boolean) => {
        dispatch(setShoppingListItemState({id: id, checked: checked}))
    }
    const handleShoppingListItemDelete = (id: string) => {
        dispatch(deleteShoppingListItem(id))
    }
    return (
        <Grid xs={12} sm={6}>
            <Stack alignItems={"center"} justifyContent={"space-between"} direction={"row"} p={1.25} border={1}
                   borderColor={"text.disabled"} borderRadius={1}>
                <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <Checkbox checked={solved} onChange={(e) => {
                        handleShoppingListItemStateChange(id, e.target.checked)
                    }} color={"primary"}/>
                    <Typography>{name}</Typography>
                </Stack>
                <IconButton onClick={()=>{handleShoppingListItemDelete(id)}} sx={{ml: "auto"}} size={"small"} color={"primary"}><DeleteOutline/></IconButton>
            </Stack>
        </Grid>
    )
}
