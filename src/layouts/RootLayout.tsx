import {Fragment, ReactElement} from "react";
import {Outlet} from "react-router-dom";
import {Navbar} from "../components/ui/Navbar";
import {Header} from "../components/ui/Header";
import "./styles/rootLayout.scss";

export function RootLayout(): ReactElement {
    return (
        <Fragment>
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