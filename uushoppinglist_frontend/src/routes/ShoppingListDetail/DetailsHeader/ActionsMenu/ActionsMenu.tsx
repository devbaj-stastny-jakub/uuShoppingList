import {IconButton, Menu, MenuItem} from "@mui/material";
import {MoreHorizRounded} from "@mui/icons-material";
import {useRef, useState} from "react";
import {RenameMenuItem} from "./RenameMenuItem";
import {DescriptionMenuItem} from "./DescriptionMenuItem";
import {ArchiveMenuItem} from "./ArchiveMenuItem";
import {UsersMenuItem} from "./UsersMenuItem";
import {LeaveMenuItem} from "./LeaveMenuItem";
import {useProfile} from "../../../../hooks/authorization";

export const ActionsMenu = () => {
    const menuAnchorRef = useRef<any>()
    const {isOwner} = useProfile()
    const [opened, setOpened] = useState(false)
    return (
        <>
            <IconButton onClick={() => {
                setOpened(true)
            }} ref={menuAnchorRef}><MoreHorizRounded/></IconButton>
            <Menu
                id="basic-menu"
                anchorEl={menuAnchorRef.current}
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                transformOrigin={{vertical: "top", horizontal: "right"}}
                open={opened}
                onClose={() => {
                    setOpened(false)
                }}
            >
                {isOwner && (
                    <>
                        <RenameMenuItem/>
                        <DescriptionMenuItem/>
                        <ArchiveMenuItem/>
                        <UsersMenuItem/>
                        <MenuItem sx={{color: "error.main"}}>Smazat</MenuItem>
                    </>
                )}
                {!isOwner && (
                    <LeaveMenuItem />
                )}
            </Menu>
        </>
    )
}
