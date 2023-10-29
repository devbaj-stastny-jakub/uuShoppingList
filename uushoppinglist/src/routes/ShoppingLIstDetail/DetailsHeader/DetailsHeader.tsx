import {Avatar, Stack, Typography} from "@mui/material";

export interface DetailsHeaderProps {
    name?: string
    description?: string
    image?: string
}

export const DetailsHeader = ({name, image,description}:DetailsHeaderProps) => {
    return (
        <Stack direction={{xs: "column-reverse", sm: "row"}} mt={3} spacing={2}>
            <Stack flex={1} spacing={1}>
                <Typography variant={"h4"}>{name || "---"}</Typography>
                <Stack direction={"row"} spacing={0.5}>
                    <Avatar sx={{width: 20, height: 20}}/>
                    <Avatar sx={{width: 20, height: 20}}/>
                    <Avatar sx={{width: 20, height: 20}}/>
                    <Avatar sx={{width: 20, height: 20}}/>
                </Stack>
                <Typography>{description || "---"}</Typography>
            </Stack>
            <Stack flex={1} height={200} borderRadius={2} overflow={"hidden"}>
                <img style={{height: "100%", width: "100%", objectFit: "cover"}} src={image || "/placeholder.png"} alt=""/>
            </Stack>
        </Stack>
    )
}
