import {ReactElement} from "react";
import {servers} from "./data/mockServers";
import "./style/servers.scss";
import {Link} from "react-router-dom";
import {Table} from "../../components/table/Table";

export function Servers(): ReactElement {
    return (
        <article className="servers">{
            servers.map((server, i) => (
                <div className="server" key={i}>
                    <Link className="server__join" to="#">Join</Link>
                    <img
                        className="server__dropdown"
                        src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                        alt="Arrow Icon"
                        aria-hidden="true"
                    />
                    <header className="server__header">
                        <h2 className="server__header__title">{server.name}</h2>
                        <Link className="server__header__join" to="#">Join</Link>
                    </header>
                    <p className="server__session">{server.track} ({server.session})</p>
                    <p className="server__online">Online ({server.online}/{server.spots})</p>
                    <div className="server__activity">
                        <Table data={server.drivers} type="online"/>
                    </div>
                </div>
            ))}
        </article>
    )
}