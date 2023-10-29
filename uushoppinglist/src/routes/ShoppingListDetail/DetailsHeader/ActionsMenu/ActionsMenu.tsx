import {IconButton, Menu, MenuItem} from "@mui/material";
import {MoreHorizRounded} from "@mui/icons-material";
import {useRef, useState} from "react";
import {RenameMenuItem} from "./RenameMenuItem";
import {DescriptionMenuItem} from "./DescriptionMenuItem";
import {ArchiveMenuItem} from "./ArchiveMenuItem";
import {UsersMenuItem} from "./UsersMenuItem";
import {useAuth0} from "@auth0/auth0-react";
import {useAuthorized} from "../../../../hooks/authorization";
import {LeaveMenuItem} from "./LeaveMenuItem";

export const ActionsMenu = () => {
    const menuAnchorRef = useRef<any>()
    const [opened, setOpened] = useState(false)
    const {isOwner, isAuthorized} = useAuthorized("14")
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
