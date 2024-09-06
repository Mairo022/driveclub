import {ReactElement} from "react";
import "./style/lap.scss";
import {useFetch} from "../../hooks/useFetch";
import { getLap } from "../../services/lapsService";
import {fullDatetimeFormat} from "../../utils/dateFormatter";
import {Table} from "../../components/table/Table";
import {Link} from "react-router-dom";

export function Lap(): ReactElement {
    const id: string = location.pathname.split("/")[2]
    const {data, isLoading, isSuccess, isError, error} = useFetch(getLap, [id])

    function lapToTableFormat(lapStat: ILapStat): ILapTable {
        return {
            laptime: lapStat.lap.laptime,
            s1: lapStat.lap.s1,
            s2: lapStat.lap.s2,
            s3: lapStat.lap.s3,
            grip: String(lapStat.lap.grip) + "%",
            "Top speed": `${lapStat.lap.maximumSpeed} km/h`,
            laps: lapStat.totalLaps
        }
    }

    return (
        <article className="lap">
            {isSuccess && <>
            <header className="heading">
                <h2 className="heading__combination">
                    <Link className="heading__combination__driver" to={`/drivers/${data.lap.driver.id}`}>{data.lap.driver.name}</Link>
                    <span className="heading__combination__span"> — {data.lap.track}, {data.lap.car}</span>
                </h2>
                <p className="heading__date">{fullDatetimeFormat(data.lap.date)}</p>
            </header>
            <div className="session">
                <div className="conditions">
                    <div className="conditions__row">
                        <p className="conditions__row__header">Air:</p>
                        <p className="conditions__row__data">{data.lap.session.air_temp}c</p>
                    </div>
                    <div className="conditions__row">
                        <p className="conditions__row__header">Road:</p>
                        <p className="conditions__row__data">{data.lap.session.road_temp}c</p>
                    </div>
                    <div className="conditions__row">
                        <p className="conditions__row__header">Penalties:</p>
                        <p className="conditions__row__data">{String(data.lap.session.penalties)}</p>
                    </div>
                </div>
                <div className="conditions">
                    <div className="conditions__row">
                        <p className="conditions__row__header">Fuel rate:</p>
                        <p className="conditions__row__data">{data.lap.session.fuel_rate}</p>
                    </div>
                    <div className="conditions__row">
                        <p className="conditions__row__header">Tyre wear:</p>
                        <p className="conditions__row__data">{data.lap.session.tyre_wear_rate}</p>
                    </div>
                    <div className="conditions__row">
                        <p className="conditions__row__header">Damage:</p>
                        <p className="conditions__row__data">{data.lap.session.damage}%</p>
                    </div>
                </div>
            </div>
            <div className="lap">
                <Table data={[lapToTableFormat(data)]} type="lap"/>
            </div></>}
            {isError && <span className="error">{error}</span>}
            {isLoading && <span className="loading">Loading...</span>}
        </article>
    )
}