import {ReactElement, useEffect, useState} from "react";
import {FETCH_STATUS} from "../../data/constants";
import {Table} from "../../components/table/Table";
import "./style/session.scss";
import {useLocation} from "react-router-dom";
import {getSessionDetails, getSessionInfo} from "../../services/sessionsService";
import {fullDatetimeFormat} from "../../utils/dateFormatter";
import axios from "axios";

export function Session(): ReactElement {
    const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE)
    const isLoading = status === FETCH_STATUS.LOADING
    const isSuccess = status === FETCH_STATUS.SUCCESS
    const isError = status === FETCH_STATUS.ERROR
    const [error, setError] = useState<string | null>(null)

    const [sessionInfo, setSessionInfo] = useState<ISessionInfo>()
    const [sessionDetails, setSessionDetails] = useState<ISessionDetailsTable[] | {}[]>([])

    const location = useLocation()
    const sessionID = location.pathname.split("/")[2]

    const [filter] = useState<IPageRequest>({
        page: 0,
        size: 0,
        sort: "totalTime",
        direction: "asc"
    })

    async function fetchSessionDetails(): Promise<void> {
        try {
            setStatus(FETCH_STATUS.LOADING)

            const responses = await axios.all([getSessionInfo(sessionID), getSessionDetails(filter, sessionID)])

            const sessionInfo: ISessionInfo = responses[0].data
            const sessionDetails: ISessionDetails[] = responses[1].data

            if (responses && sessionInfo && sessionDetails.length > 0) {
                setSessionDetails(sessionDetailsOrganise(sessionDetails, sessionInfo.type))
                setSessionInfo(sessionInfo)
                setStatus(FETCH_STATUS.SUCCESS)
            }
        } catch (e: any) {
            setStatus(FETCH_STATUS.ERROR)
            setError(e?.message)
        }
    }

    function sessionDetailsOrganise(sessionDetails: ISessionDetails[], type: string): ISessionDetailsTable[] | {}[] {
        if (type === "Race") {
            return sessionDetails.map(session => ({
                "id": sessionID,
                "rank": session.rank,
                "driver": session.name,
                "car": session.car,
                "total time": session.totalTime,
                "gap to first": session.gapToFirst,
                "fastest lap": session.fastestLap,
            }))
        }

        if (type === "Qualify" || type === "Practice") {
            return sessionDetails.map(session => ({
                "id": sessionID,
                "rank": session.rank,
                "driver": session.name,
                "car": session.car,
                "fastest lap": session.fastestLap,
                "gap to first": session.gapToFirst,
            }))
        }

        return [{}]
    }

    useEffect(() => {
        fetchSessionDetails()
    }, [])

    return (
        <article className="session">
            {isSuccess && <>
                <div className="info">
                    <header className="info__header">
                        <h3 className="info__header__track">{sessionInfo!.track} ({sessionInfo!.type})</h3>
                        <p className="info__header__date">{fullDatetimeFormat(sessionInfo!.date)}</p>
                    </header>
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
                        </div>
                        <div className="conditions">
                            <div className="conditions__row">
                                <p className="conditions__row__header">Damage:</p>
                                <p className="conditions__row__data">{sessionInfo!.damage}%</p>
                            </div>
                            <div className="conditions__row">
                                <p className="conditions__row__header">Penalties:</p>
                                <p className="conditions__row__data">{String(sessionInfo!.penalties)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="details">{
                    <Table data={sessionDetails} type="sessionDetails"/>}
                </div>
            </>}
            {isError && <span className="error">{error}</span>}
            {isLoading && <span className="loading">Loading...</span>}
        </article>
    )
}