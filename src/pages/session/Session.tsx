import {ReactElement, useEffect, useState} from "react";
import {Table} from "../../components/table/Table";
import "./style/session.scss";
import {useLocation} from "react-router-dom";
import {getSessionDetails, getSessionInfo} from "../../services/sessionsService";
import {fullDatetimeFormat} from "../../utils/dateFormatter";
import {DriverLaps} from "./DriverLaps";
import {useFetch} from "../../hooks/useFetch";

export function Session(): ReactElement {
    const [isDataReady, setIsDataReady] = useState<boolean>(false)

    const [isDriverLapsOpen, setIsDriverLapsOpen] = useState<boolean>(false)
    const [selectedDriverID, setSelectedDriverID] = useState<string>()

    const [sessionInfo, setSessionInfo] = useState<ISessionInfo>()
    const [sessionDetails, setSessionDetails] = useState<ISessionDetailsTable[] | {}[]>([])

    const location = useLocation()
    const sessionID = location.pathname.split("/")[2]

    const [filter] = useState<IPageRequest>({
        page: 0,
        size: 0,
        sort: "rank",
        direction: "asc"
    })

    const {data, isLoading, isSuccess, isError, error} = useFetch([
        {fn: getSessionInfo, params: [sessionID]},
        {fn: getSessionDetails, params: [filter, sessionID]}
    ])

    function handleFetchedData(data: Array<any>): void {
        setSessionInfo(data[0])
        setSessionDetails(organiseSessionDetails(data[1], data[0].type))
        setIsDataReady(true)
    }

    function organiseSessionDetails(sessionDetails: ISessionDetails[], type: string): ISessionDetailsTable[] | {}[] {
        if (type === "Race") {
            return sessionDetails.map(session => ({
                "id": session.driverID,
                "rank": session.rank ?? "DNF",
                "driver": session.name,
                "car": session.car,
                "total time": session.totalTime === null ? "-" : session.totalTime,
                "gap to first": session.gapToFirst === "" ? "-" : session.gapToFirst,
                "fastest lap": session.fastestLap === "" ? "-" : session.fastestLap,
            }))
        }

        if (type === "Qualify" || type === "Practice") {
            return sessionDetails.map(session => ({
                "id": session.driverID,
                "rank": session.rank ?? "DNQ",
                "driver": session.name,
                "car": session.car,
                "fastest lap": session.fastestLap,
                "gap to first": session.gapToFirst,
            }))
        }

        return [{}]
    }

    function handleBodyClick(e: any): void {
        const className = e.target.className
        if (!className.includes("row") && !className.includes("driver") && !className.includes("close"))
            setIsDriverLapsOpen(false)
    }

    function handleTableBodyRowClick(e: any): void {
        const id: string = e.target.parentNode.getAttribute("data-id")

        if (e.button === 0) {
            setSelectedDriverID(id)
            setIsDriverLapsOpen(true)
        }
    }

    useEffect(() => {
        if (isDriverLapsOpen)
            document.addEventListener("click", handleBodyClick)

        return () => {
            if (isDriverLapsOpen)
                document.removeEventListener("click", handleBodyClick)
        }
    }, [isDriverLapsOpen])

    useEffect(() => {
        if (data) handleFetchedData(data)
    }, [isSuccess])

    return (
        <article className="session">
            {isSuccess && isDataReady && <>
                <header className="info__header">
                    <h3 className="info__header__track">{sessionInfo!.track} ({sessionInfo!.type})</h3>
                    <p className="info__header__date">{fullDatetimeFormat(sessionInfo!.date)}</p>
                </header>
                <div className="info">
                    <div className="info__conditions">
                        <div className="conditions">
                            <div className="conditions__row">
                                <p className="conditions__row__header">Air:</p>
                                <p className="conditions__row__data">{sessionInfo!.air_temp}c</p>
                            </div>
                            <div className="conditions__row">
                                <p className="conditions__row__header">Road:</p>
                                <p className="conditions__row__data">{sessionInfo!.road_temp}c</p>
                            </div>
                            <div className="conditions__row">
                                <p className="conditions__row__header">Penalties:</p>
                                <p className="conditions__row__data">{String(sessionInfo!.penalties)}</p>
                            </div>
                        </div>
                        <div className="conditions">
                            <div className="conditions__row">
                                <p className="conditions__row__header">Fuel rate:</p>
                                <p className="conditions__row__data">{sessionInfo!.fuel_rate}</p>
                            </div>
                            <div className="conditions__row">
                                <p className="conditions__row__header">Tyre wear:</p>
                                <p className="conditions__row__data">{sessionInfo!.tyre_wear_rate}</p>
                            </div>
                            <div className="conditions__row">
                                <p className="conditions__row__header">Damage:</p>
                                <p className="conditions__row__data">{sessionInfo!.damage}%</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="details">{
                    <Table data={sessionDetails} type="sessionDetails" handleBodyRowClick={handleTableBodyRowClick}/>}
                </div>
                <DriverLaps driverID={selectedDriverID} sessionID={sessionID} isOpen={isDriverLapsOpen} setIsOpen={setIsDriverLapsOpen}/>
            </>}
            {isError && <span className="error">{error}</span>}
            {isLoading && <span className="loading"></span>}
        </article>
    )
}