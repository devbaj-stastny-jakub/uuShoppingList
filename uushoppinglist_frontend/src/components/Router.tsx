import React, {useEffect, useState} from 'react';
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
    Container, Snackbar,
    Stack,
    useTheme
} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";
import {ShoppingListsList} from "../routes/ShoppingListsList";
import {NavLink} from "./NavLink";
import {useAppSelector} from "../hooks";

export const Router = () => {
    const [open, setOpen] = useState(false)
    const {loginWithRedirect, isAuthenticated, logout, isLoading} = useAuth0()
    const {message} = useAppSelector(state => state.error)
    const theme = useTheme()
    useEffect(() => {
        if(!message) return
        setOpen(true)
    }, [message]);
    return (
        <BrowserRouter>
            {isLoading ? (
                <Stack width={"100%"} height={"100vh"} justifyContent={"center"} alignItems={"center"}>
                    <CircularProgress size={150} color="primary"/>
                </Stack>
            ) : (
                <>
                    <Stack sx={{backgroundColor: "text.primary"}}>
                        <Snackbar open={open} autoHideDuration={6000} onClose={()=>{setOpen(false)}}>
                            <Alert onClose={()=>{setOpen(false)}} severity="error" sx={{ width: '100%' }}>
                                {message}
                            </Alert>
                        </Snackbar>
                        <Container>
                            <Stack direction={"row"} justifyContent={"space-between"}>
                                <Stack direction={"row"}>
                                    <Stack direction={"row"} alignItems={"center"} px={2}>
                                        <NavLink text={"Domovská stránka"} to={"/"}/>
                                        {isAuthenticated && (<NavLink text={"Seznamy"} to={"/shoppingLists"}/>)}
                                    </Stack>
                                </Stack>
                                {!isAuthenticated &&
                                    <Button sx={{my: 1}} variant={"contained"} onClick={() => {
                                        loginWithRedirect()
                                    }}>
                                        Přihlásit se
                                    </Button>}
                                {isAuthenticated &&
                                    <Button sx={{my: 1}} onClick={() => {
                                        logout({logoutParams: {returnTo: window.location.origin}})
                                    }} color={"info"} variant={"text"}>
                                        Odhlásit se
                                    </Button>}
                            </Stack>
                        </Container>
                    </Stack>
                    <Routes>
                        <Route path={"/"} element={
                            <Stack>

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
    );
}
