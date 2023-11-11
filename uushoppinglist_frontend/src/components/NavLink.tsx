import React, {useState} from "react";
import {NavLink as RouterNavLink} from "react-router-dom";
import {Stack, useTheme} from "@mui/material";

export interface NavLinkProps {
    text: string
    to: string
}

export const NavLink = ({text, to}: NavLinkProps) => {
    const [active, setActive] = useState(false)
    const theme = useTheme()
    return (
        <Stack justifyContent={"center"} height={"100%"} px={2}
               sx={{backgroundColor: active ? "primary.main" : "transparent", transition: "all 0.2s ease"}}>
            <RouterNavLink
                style={({isActive}) => {
                    setActive(isActive);
                    return {
                        color: theme.palette.primary.contrastText,
                        textDecoration: "none"
                    }
                }} to={to}>
                {text}
            </RouterNavLink>
        </Stack>
    )
}
