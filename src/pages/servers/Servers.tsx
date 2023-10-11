import { ReactElement } from "react";
import {servers} from "./data/mockServers";
import "./style/servers.scss";
import { Server } from "./Server";

export function Servers(): ReactElement {
    return (
        <article className="servers">{
            servers.map((server, i) => (
                <Server server={server} key={i}/>
            ))}
        </article>
    )
}