import React from 'react';
import {createBrowserRouter, Link, Navigate, NavLink, Outlet, RouterProvider} from "react-router-dom";
import {ShoppingListDetail} from "../routes/ShoppingListDetail";
import {Box, Button, Container, Stack, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {useAuth0} from "@auth0/auth0-react";

export const Router = () => {
    const {loginWithRedirect, isAuthenticated, logout, isLoading} = useAuth0()
    const router = createBrowserRouter([
        {
            path: "/",
            Component: Layout,
            children: [
                {
                    path: "shoppingList/:shoppingListId",
                    element: isAuthenticated ? <ShoppingListDetail/> : <Navigate to={"/"}/>,
                }
            ]
        },

    ])
    return (
        <>
            {!isLoading && <RouterProvider router={router}/>}
        </>
    );
}

const Layout = () => {
    const {loginWithRedirect, isAuthenticated, logout, isLoading} = useAuth0()
    return (
        <>
            <Stack sx={{backgroundColor: "text.primary"}}>
                <Container>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Stack direction={"row"}>
                            <Stack direction={"row"} alignItems={"center"} px={2}>
                                <Box px={2}>
                                    <Link style={{textDecoration: "none", color: "white"}} to={"/"}>
                                        Nákupní seznam
                                    </Link>
                                </Box>
                                <Box px={2}>
                                    <Link style={{textDecoration: "none", color: "white"}} to={"/shoppingList/14"}>
                                        Nákupní seznam
                                    </Link>
                                </Box>
                            </Stack>
                        </Stack>
                        {!isAuthenticated && <Button size={"small"} variant={"contained"} onClick={() => {
                            loginWithRedirect()
                        }}>Přihlásit se</Button>}
                        {isAuthenticated && <Button sx={{my: 1}} onClick={() => {
                            logout({logoutParams: {returnTo: window.location.origin}})
                        }} color={"info"} size={"small"} variant={"text"}>Odhlásit se</Button>}
                    </Stack>
                </Container>
            </Stack>
            <Outlet/>
        </>
    )
}
