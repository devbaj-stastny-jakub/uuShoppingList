import {IconButton, Menu, MenuItem} from "@mui/material";
import {MoreHorizRounded} from "@mui/icons-material";
import {useRef, useState} from "react";
import {RenameMenuItem} from "./RenameMenuItem";
import {DescriptionMenuItem} from "./DescriptionMenuItem";
import {ArchiveMenuItem} from "./ArchiveMenuItem";
import {UsersMenuItem} from "./UsersMenuItem";
import {LeaveMenuItem} from "./LeaveMenuItem";
import {useProfile} from "../../../../hooks/authorization";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {useNavigate} from "react-router-dom";
import {DeleteMenuItem} from "./DeleteMenuItem";

export const ActionsMenu = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {shoppingList} = useAppSelector(state =>state.shoppingList)
    const menuAnchorRef = useRef<any>()
    const {isOwner} = useProfile()
    const [opened, setOpened] = useState(false)
    const handleDelete = ()=>{
        navigate("/shoppingLists")
    }
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
                        <DeleteMenuItem />
                    </>
                )}
                {!isOwner && (
                    <LeaveMenuItem />
                )}
            </Menu>
        </>
    )
}
