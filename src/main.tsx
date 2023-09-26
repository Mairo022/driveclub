import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'normalize.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Servers} from "./pages/servers/Servers";
import {TopBar} from "./components/ui/TopBar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Servers/>,
        errorElement: <h2>Error loading servers</h2>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <TopBar/>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
