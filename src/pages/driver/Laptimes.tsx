import {ReactElement} from "react";
import {Table} from "../../components/table/Table";
import {useFetch} from "../../hooks/useFetch";
import {getValidDriverLaps} from "../../services/lapsService";
import {fullDatetimeFormat} from "../../utils/dateFormatter";
import {useNavigate} from "react-router-dom";
import "./style/laptimes.scss";

export function Laptimes(props: ILaptimesProps): ReactElement {
    const {driverID} = props
    const navigate = useNavigate()

    const {data: laps, isLoading, isSuccess, isError, error} = useFetch(getValidDriverLaps, [driverID])
    const lapsExist = laps && laps.length > 0

    function toLapsTableFormat(laps: ILap[]): ILap[] {
        return laps.map(lap => (
            {...lap, date: fullDatetimeFormat(lap.date)}
        ))
    }

    function handleTableBodyRowClick(e: any): void {
        const id: string = e.target.parentNode.getAttribute("data-id")

        if (e.button === 0) navigate("/lap/" + id)
        if (e.button === 1) window.open("/lap/" + id, "_blank")
    }

    return (
        <div className="laptimes">
            {isSuccess && lapsExist && <>
            <Table data={toLapsTableFormat(laps)} type="laps" handleBodyRowClick={handleTableBodyRowClick}/></>}
            {isError && <span className="error">{error}</span>}
            {isLoading && <span className="loading"></span>}
        </div>
    )
}