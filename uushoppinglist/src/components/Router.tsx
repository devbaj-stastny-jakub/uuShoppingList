import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello</div>
    }
])

export const Router = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}
