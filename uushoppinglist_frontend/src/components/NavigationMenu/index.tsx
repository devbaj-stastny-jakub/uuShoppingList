import {
    Alert,
    Button,
    Container,
    Drawer,
    IconButton,
    Snackbar,
    Stack,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {NavLink} from "../NavLink";
import {ColorSchemeSwitch} from "../ColorSchemeSwitch";
import {LanguageSwitch} from "../LanguageSwitch";
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {useAppSelector} from "../../hooks";
import {useTranslation} from "react-i18next";
import MenuIcon from '@mui/icons-material/Menu';

export const NavigationMenu = () => {
    const {t} = useTranslation()
    const [open, setOpen] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const {loginWithRedirect, isAuthenticated, logout, isLoading} = useAuth0()
    const {message} = useAppSelector(state => state.error)
    const theme = useTheme()
    const shouldBeMobile = useMediaQuery(theme.breakpoints.down("lg"))
    useEffect(() => {
        if (!message) return
        setOpen(true)
    }, [message]);
    const navigation = (
        <Stack pb={{lg: 0, xs: 2}} sx={{backgroundColor: "primary.dark"}} height={"100%"} direction={{lg: "row"}} justifyContent={"space-between"}>
            <Stack direction={{lg: "row"}} alignItems={"center"} px={2}>
                <NavLink text={t("navmenu.home")} to={"/"}/>
                {isAuthenticated && (<NavLink text={t("navmenu.lists")} to={"/shoppingLists"}/>)}
            </Stack>
            <Stack px={{lg: 0, xs: 2}} mt={{lg: 0, xs: "auto"}} direction={{lg: "row"}} rowGap={1} spacing={2}>
                <ColorSchemeSwitch fullwidth={shouldBeMobile}/>
                <LanguageSwitch fullwidth={shouldBeMobile}/>
                {!isAuthenticated &&
                    <Button sx={{py: {lg: 0, xs: 2}}} variant={"contained"} onClick={() => {
                        loginWithRedirect()
                    }}>
                        {t("navmenu.login")}
                    </Button>}
                {isAuthenticated &&
                    <Button sx={{py: {lg: 0, xs: 2}}} onClick={() => {
                        logout({logoutParams: {returnTo: window.location.origin}})
                    }} color={"info"} variant={"text"}>
                        {t("navmenu.logout")}
                    </Button>}
            </Stack>
        </Stack>
    )
    return (
        <Stack sx={{backgroundColor: "primary.dark"}}>
            <Snackbar open={open} autoHideDuration={6000} onClose={() => {
                setOpen(false)
            }}>
                <Alert onClose={() => {
                    setOpen(false)
                }} severity="error" sx={{width: '100%'}}>
                    {message}
                </Alert>
            </Snackbar>
            <Container sx={{paddingBlock: 1}}>
                {!shouldBeMobile && navigation}
                {shouldBeMobile && (
                    <IconButton onClick={() => {
                        setOpenMenu(true)
                    }} size={"large"}>
                        <MenuIcon sx={{color: "white"}}/>
                    </IconButton>
                )}
            </Container>
            <Drawer onClose={() => {
                setOpenMenu(false)
            }} open={openMenu} anchor={"right"}>
                {shouldBeMobile && navigation}
            </Drawer>
        </Stack>
    )
}
