import {Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {ShoppingListItem} from "../../../types";
import {useNavigate} from "react-router-dom";

export interface ShoppingListTileProps {
    id: string
    name: string
    image: string
    ownerId: string
    membersIds: string[]
}

export const ShoppingListTile = ({ownerId, image, id, name, membersIds}:ShoppingListTileProps)=>{
    const navigate = useNavigate()
    const handleClick = ()=>{
        navigate(`/shoppingList/${id}`)
    }
    return (
        <Grid xs={4} onClick={handleClick} sx={{cursor: "pointer"}}>
            <Stack sx={{borderRadius: 2, overflow:"hidden", boxShadow: "0 0 10px #C5C5C5"}}>
                <img style={{height: 150, width: "100%", objectFit: "cover"}} src={"/placeholder.png"} alt=""/>
                <Stack spacing={0.5} p={1}>
                    <Typography fontSize={14} fontWeight={"bold"}>{name}</Typography>
                    <Typography fontSize={14} color={"#938F96"}>{ownerId}{membersIds.toString()}</Typography>
                </Stack>
            </Stack>
        </Grid>
    )
}
