import {ReactElement} from "react";
import {drivers} from "./data/mockDrivers";
import {Table} from "../../components/table/Table";
import "./style/drivers.scss";

export function Drivers(): ReactElement {
    return (
        <article className="drivers">
            <Table data={drivers} type="drivers"/>
        </article>
    )
}