import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ShoppingListDetail} from "../routes/ShoppingLIstDetail";
import {Container, Stack, Tab, Tabs} from "@mui/material";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello</div>
    },
    {
        path: "/shoppingList/:shoppingListId",
        element: <ShoppingListDetail />
    }
])

export const Router = () => {
    return (
        <>
            <Stack sx={{backgroundColor: "text.primary"}}>
                <Container>
                    <Tabs>
                        <Tab sx={{backgroundColor: "primary.main", color: "primary.contrastText"}} label={"Nákupní seznamy"} />
                        <Tab label={"Nákupní seznamy"} />
                        <Tab label={"Nákupní seznamy"} />
                    </Tabs>
                </Container>
            </Stack>
            <RouterProvider router={router} />
        </>
    );
}
