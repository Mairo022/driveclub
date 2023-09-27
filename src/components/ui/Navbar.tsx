import {ReactElement} from "react";
import {NavLink} from "react-router-dom";
import "./styles/navbar.scss";

export function Navbar(): ReactElement {
    return (
        <nav className="navbar">
            <NavLink className="route" to="/servers">
                <img className="route__img" src="src/assets/images/servers.svg"/>
                <p className="route__text">SERVERS</p>
            </NavLink>
            <NavLink className="route" to="/drivers">
                <img className="route__img" src="src/assets/images/drivers.svg"/>
                <p className="route__text">DRIVERS</p>
            </NavLink>
            <NavLink className="route" to="/stats">
                <img className="route__img" src="src/assets/images/stats.svg"/>
                <p className="route__text">STATS</p>
            </NavLink>
            <NavLink className="route" to="/logs">
                <img className="route__img" src="src/assets/images/logs.svg"/>
                <p className="route__text">LOGS</p>
            </NavLink>
        </nav>
    )
}