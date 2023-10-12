import {ReactElement} from "react";
import "./styles/header.scss";
import logoSVG from "../../assets/images/logo-server.svg"

export function Header(): ReactElement {
    return (
        <header className="site_header">
            <img className="logo"
                 src={logoSVG}
                 alt="Server Logo"
            />
            <h1 className="title">
                Driving Club
            </h1>
        </header>
    )
}