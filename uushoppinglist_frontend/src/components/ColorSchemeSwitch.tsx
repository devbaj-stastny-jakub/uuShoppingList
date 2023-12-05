import {setColorMode, toggleColorMode} from "../store/settingsSlice";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import React, {useEffect, useLayoutEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {DarkModeRounded, LightModeRounded} from "@mui/icons-material";
import useLocalStorage from "use-local-storage";

export const ColorSchemeSwitch = ()=>{
    const dispatch = useAppDispatch()
    const {colorMode} = useAppSelector(state => state.settings)
    return(
        <ToggleButtonGroup
            exclusive
            color={"primary"}
            value={colorMode}
            onChange={(e, val)=>{dispatch(toggleColorMode())}}
        >
            <ToggleButton value={"light"}><LightModeRounded sx={{color: "primary.light"}} /></ToggleButton>
            <ToggleButton value={"dark"}><DarkModeRounded sx={{color: "primary.light"}} /></ToggleButton>
        </ToggleButtonGroup>
    )
}
