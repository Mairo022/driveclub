import {ReactElement, useState} from "react";
import "./styles/topbar.scss";

export function TopBar(): ReactElement {
    const [server, setServer] = useState<string>("server1")

    const serverButtonClassname = (inputServer: string): string => (
        server === inputServer
            ? "button server active"
            : "button server"
    )

    return (
        <div className="topbar">
            <button className={serverButtonClassname("server2")}
                    onClick={() => { setServer("server2") }}
            >
                SERVER 2
            </button>
            <button className={serverButtonClassname("server1")}
                    onClick={() => { setServer("server1") }}
            >
                SERVER 1
            </button>
            <button className="button login">LOGIN</button>
        </div>
    )
}