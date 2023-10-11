import {ReactElement} from "react";
import "./styles/header.scss";

export function Header(): ReactElement {
    return (
        <header className="site_header">
            <img className="logo"
                 src="src/assets/images/logo-server.svg"
                 alt="Server Logo"
            />
            <h1 className="title">
                Driving Club
            </h1>
        </header>
    )
}