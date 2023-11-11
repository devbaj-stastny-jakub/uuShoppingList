import {Button, IconButton, Stack, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {ShoppingListItem} from "../../../types";
import {useNavigate} from "react-router-dom";
import {DeleteOutline} from "@mui/icons-material";
import {useProfile} from "../../../hooks/authorization";
import {useMemo} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {DeleteButton} from "./DeleteButton";

export interface ShoppingListTileProps {
    id: string
    name: string
    image: string
    ownerId: string
    membersIds: string[]
}

export const ShoppingListTile = ({ownerId, image, id, name, membersIds}:ShoppingListTileProps)=>{
    const navigate = useNavigate()
    const {user} = useAuth0()
    const isOwner = useMemo(()=>{
        return ownerId === user?.sub
    }, [])
    const handleClick = ()=>{
        navigate(`/shoppingList/${id}`)
    }
    return (
        <Grid xs={4} onClick={handleClick} sx={{cursor: "pointer"}}>
            <Stack position={"relative"} sx={{borderRadius: 2, overflow:"hidden", boxShadow: "0 0 10px #C5C5C5"}}>
                <img style={{height: 150, width: "100%", objectFit: "cover"}} src={"/placeholder.png"} alt=""/>
                {isOwner && <DeleteButton />}
                <Stack spacing={0.5} p={1}>
                    <Typography fontSize={14} fontWeight={"bold"}>{name}</Typography>
                    <Typography fontSize={14} color={"#938F96"}>{ownerId}{membersIds.toString()}</Typography>
                </Stack>
            </Stack>
        </Grid>
    )
}
