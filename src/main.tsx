import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'normalize.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Servers} from "./pages/servers/Servers";
import {RootLayout} from "./layouts/RootLayout";
import {Drivers} from "./pages/drivers/Drivers";
import {Stats} from "./pages/stats/Stats";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                path: "/",
                Component: Servers,
                errorElement: <h2>Error loading servers</h2>,
            },
            {
                path: "/servers",
                Component: Servers,
                errorElement: <h2>Error loading servers</h2>,
            },
            {
                path: "/drivers",
                Component: Drivers,
                errorElement: <h2>Error loading drivers</h2>,
            },
            {
                path: "/stats",
                Component: Stats,
                errorElement: <h2>Error loading drivers</h2>,
            },
            {
                path: "*",
                element: <><h1>404</h1><h2>Not Found</h2></>
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
