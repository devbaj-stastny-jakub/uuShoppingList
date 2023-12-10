import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {
    BrowserRouter,
    createBrowserRouter,
    Link,
    Navigate,
    Outlet, Route,
    RouterProvider,
    Routes
} from "react-router-dom";
import {ShoppingListDetail} from "../routes/ShoppingListDetail";
import {
    Alert,
    Box,
    Button, CircularProgress,
    Container, Drawer, Snackbar,
    Stack, ThemeProvider, ToggleButton, ToggleButtonGroup,
    useTheme
} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import {ShoppingListsList} from "../routes/ShoppingListsList";
import {NavLink} from "./NavLink";
import {useAppDispatch, useAppSelector} from "../hooks";
import {themeOptionsDark, themeOptionsLight} from "../config";
import {createTheme} from "@mui/material/styles";
import {setColorMode, setLanguage, toggleColorMode} from "../store/settingsSlice";
import {ColorSchemeSwitch} from "./ColorSchemeSwitch";
import useLocalStorage from "use-local-storage";
import {useTranslation} from "react-i18next";
import {LanguageSwitch} from "./LanguageSwitch";
import {NavigationMenu} from "./NavigationMenu";

export const Router = () => {
    const {colorMode, language} = useAppSelector(state => state.settings)
    const {isAuthenticated, isLoading} = useAuth0()
    const theme = useMemo(() => {
        return createTheme(colorMode === "light" ? themeOptionsLight : themeOptionsDark)
    }, [colorMode])

    const {t, i18n} = useTranslation()

    const dispatch = useAppDispatch()
    const [localColorMode, setLocalColorMode] = useLocalStorage<"light" | "dark">("colorMode", "light")
    useEffect(() => {
        setLocalColorMode(colorMode)
    }, [colorMode]);
    useLayoutEffect(() => {
        dispatch(setColorMode(localColorMode))
    }, [localColorMode]);
    const [languageSetting, setLanguageSetting] = useLocalStorage<string>("lang", "cz")
    useEffect(() => {
        setLanguageSetting(language)
        i18n.changeLanguage(language)
    }, [language]);
    useLayoutEffect(() => {
        dispatch(setLanguage(languageSetting))
    }, [languageSetting]);
    return (
        <ThemeProvider theme={theme}>
            <Stack width={"100%"} minHeight={"100vh"} sx={{backgroundColor: "background.default"}}>
                <BrowserRouter>
                    {isLoading ? (
                        <Stack width={"100%"} height={"100vh"} justifyContent={"center"} alignItems={"center"}>
                            <CircularProgress size={150} color="primary"/>
                        </Stack>
                    ) : (
                        <>
                            <NavigationMenu />
                            <Routes>
                                <Route path={"/"} element={
                                    <Stack>
                                        {t("welcome")}
                                    </Stack>
                                }/>
                                <Route path={"/shoppingLists"}
                                       element={isAuthenticated ? <ShoppingListsList/> : <Navigate to={"/"}/>}/>
                                <Route path={"/shoppingList/:id"}
                                       element={isAuthenticated ? <ShoppingListDetail/> : <Navigate to={"/"}/>}/>
                            </Routes>
                        </>
                    )}
                </BrowserRouter>
            </Stack>
        </ThemeProvider>
    );
}
