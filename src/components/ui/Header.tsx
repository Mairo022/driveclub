import {ReactElement} from "react";
import "./styles/header.scss";
import logoSVG from "../../assets/images/logo-server.svg"
import {Link} from "react-router-dom";

export function Header(): ReactElement {
    return (
        <header className="site_header">
            <img className="logo"
                 src={logoSVG}
                 alt="Server Logo"
            />
            <div className="heading">
                <h1 className="heading__title">
                    Driving Club
                </h1>
                <Link className="heading__join" to="#">Join us on Discord</Link>
            </div>
        </header>
    )
}