import {Avatar, IconButton, Menu, MenuItem, Stack, Typography} from "@mui/material";
import {MoreHorizRounded} from "@mui/icons-material";
import {useRef} from "react";
import {ActionsMenu} from "./ActionsMenu";
import {useAppDispatch, useAppSelector} from "../../../hooks";

export interface DetailsHeaderProps {
    name?: string
    description?: string
    image?: string
}

export const DetailsHeader = ({name, image,description}:DetailsHeaderProps) => {
    const {shoppingList} = useAppSelector(state =>state.shoppingList)
    return (
        <Stack direction={{xs: "column-reverse", sm: "row"}} mt={3} spacing={2}>
            <Stack flex={1} spacing={1}>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <Typography variant={"h4"}>{name || "---"}</Typography>
                    <ActionsMenu />
                </Stack>
                <Stack direction={"row"} spacing={0.5}>
                    <Avatar sx={{width: 20, height: 20}}/>
                    {shoppingList && shoppingList.membersIds.map(id=>(
                        <Avatar key={id} sx={{width: 20, height: 20}}/>
                    ))}
                </Stack>
                <Typography>{description || "---"}</Typography>
            </Stack>
            <Stack flex={1} height={200} borderRadius={2} overflow={"hidden"}>
                <img style={{height: "100%", width: "100%", objectFit: "cover"}} src={image || "/placeholder.png"} alt=""/>
            </Stack>
        </Stack>
    )
}
