import {ReactElement, useEffect, useState} from "react";
import SelectBox from "./SelectBox";
import "./style/stats.scss"
import {useFetch} from "../../hooks/useFetch";
import {getValidLaps} from "../../services/lapsService";
import {Table} from "../../components/table/Table";
import {fullDatetimeFormat} from "../../utils/dateFormatter";
import {ILapLeaderboard} from "./types/stats";
import {useNavigate} from "react-router-dom";

export function Stats(): ReactElement {
    const [isReadyToFetch, setIsReadyToFetch] = useState(false)
    const navigate = useNavigate()

    const [car, setCar] = useState<string>("")
    const [track, setTrack] = useState<string>("")

    const {data: laps, isLoading, isSuccess, isError, error} = useFetch(getValidLaps, [car, track], isReadyToFetch, [car, track])
    const lapsExist = laps && laps.length > 0

    function toLapsTableFormat(laps: ILapLeaderboard[]): ILapLeaderboard[] {
        return laps.map(lap => ({...lap, date: fullDatetimeFormat(lap.date)}))
    }

    function handleTableBodyRowClick(e: any): void {
        const id: string = e.target.parentNode.getAttribute("data-id")

        if (e.button === 0) navigate("/lap/" + id)
        if (e.button === 1) window.open("/lap/" + id, "_blank")
    }

    useEffect(() => {
        if (car && track) setIsReadyToFetch(true)
        else setIsReadyToFetch(false)
    }, [car, track])

    return (
        <article className="stats">
            <SelectBox setCar={setCar} setTrack={setTrack}/>
            {isSuccess && lapsExist &&
            <Table data={toLapsTableFormat(laps)} type="stats" handleBodyRowClick={handleTableBodyRowClick}/>}
            {isSuccess && !lapsExist  &&
            <p className="message">No laps recorded</p>}
            {isError && <span className="error">{error}</span>}
            {isLoading && <span className="loading">Loading...</span>}
        </article>
    )
}