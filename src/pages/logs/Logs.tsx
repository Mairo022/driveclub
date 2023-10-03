import {ReactElement} from "react";
import {Table} from "../../components/table/Table";
import {logs} from "./data/mockLogs";

export function Logs(): ReactElement {
    return (
        <article className="logs">
            <Table data={logs} type={"logs"}/>
        </article>
    )
}