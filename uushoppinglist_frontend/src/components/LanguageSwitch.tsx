import {setColorMode, setLanguage, toggleColorMode} from "../store/settingsSlice";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import React, {useEffect, useLayoutEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks";
import {DarkModeRounded, LightModeRounded} from "@mui/icons-material";
import useLocalStorage from "use-local-storage";
import Emoji from "react-emoji-render";
export interface LanguageSwitchProps {
    fullwidth?: boolean
}
export const LanguageSwitch = ({fullwidth = false}:LanguageSwitchProps)=>{
    const dispatch = useAppDispatch()
    const {language} = useAppSelector(state => state.settings)
    return(
        <ToggleButtonGroup
            exclusive
            fullWidth={fullwidth}
            color={"primary"}
            value={language}
            onChange={(e, val)=>{dispatch(setLanguage(val))}}
        >
            <ToggleButton value={"cz"}><Emoji>:flag_czechia:</Emoji></ToggleButton>
            <ToggleButton value={"en"}><Emoji>:flag_united_kingdom:</Emoji></ToggleButton>
        </ToggleButtonGroup>
    )
}
