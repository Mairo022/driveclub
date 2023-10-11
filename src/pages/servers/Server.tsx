import { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "../../components/table/Table";
import "./style/server.scss";

export function Server(props: IServerProps) {
    const server = props.server
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const openClassName = isOpen ? " open" : ""

    return (
        <div className="server">
            <Link className="server__join" to="#">Join</Link>
            <button  className="server__dropdown" onClick={() => setIsOpen(state => !state)}>
                <svg className={`server__dropdown__arrow${openClassName}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                    <path strokeWidth="3" fill="currentColor" d="M128 194.3 10 76.8l15.5-15.1L128 164.2 230.5 61.7 246 76.8 128 194.3z"/>
                </svg>
            </button>
            <header className="server__header">
                <h2 className="server__header__title">{server.name}</h2>
            </header>
            <p className="server__session">{server.track} ({server.session})</p>
            <p className="server__online">Online ({server.online}/{server.spots})</p>
            <div className={`server__activity${openClassName}`}>
                <Table data={server.drivers} type="online"/>
            </div>
        </div>
    )
}