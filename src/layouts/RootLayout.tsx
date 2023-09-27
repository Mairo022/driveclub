import {Fragment, ReactElement} from "react";
import {Outlet} from "react-router-dom";
import {Navbar} from "../components/ui/Navbar";
import {TopBar} from "../components/ui/TopBar";
import {Header} from "../components/ui/Header";
import "./styles/rootLayout.scss";

export function RootLayout(): ReactElement {
    return (
        <Fragment>
            <TopBar/>
            <Header/>
            <div className="container">
                <Navbar/>
                <main className="page">
                    <Outlet/>
                </main>
            </div>
        </Fragment>
    )
}