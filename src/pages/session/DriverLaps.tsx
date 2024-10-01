import {ReactElement, useEffect, useState} from "react";
import {Table} from "../../components/table/Table";
import "./style/driverLaps.scss"
import {IDriverLaps, IDriverLapsProps, IDriverLapsTable} from "./types/driverLaps";
import {getDriverSessionLaps} from "../../services/lapsService";
import {Link, useNavigate} from "react-router-dom";
import {useFetch} from "../../hooks/useFetch";

export function DriverLaps(props: IDriverLapsProps): ReactElement {
    const {isOpen, setIsOpen, sessionID, driverID} = props

    const [driver, setDriver] = useState<string>("")
    const [laps, setLaps] = useState<IDriverLapsTable[] | object[]>([{}])

    const navigate = useNavigate()

    const formattedName = (name: string): string => name.charAt(name.length-1) === "s" ? `${name}'` : `${name}'s`

    const {data, isLoading, isSuccess, isError, error} = useFetch(getDriverSessionLaps, [sessionID, driverID], isOpen, [driverID])

    function handleFetchedData(data: IDriverLaps[]): void {
        setDriver(formattedName(data[0].driver))
        setLaps(toDriverLapsTableFormat(data))
    }

    function toDriverLapsTableFormat(driverLaps: IDriverLaps[]): IDriverLapsTable[] {
        return driverLaps.map(lap => ({
            id: lap.lapID,
            laptime: lap.laptime,
            s1: lap.s1,
            s2: lap.s2,
            s3: lap.s3,
            valid: lap.valid ? "Yes" : "No"
        }))
    }

    function handleTableBodyRowClick(e: any): void {
        const id: string = e.target.parentNode.getAttribute("data-id")

        if (e.button === 0) navigate("/lap/" + id)
        if (e.button === 1) window.open("/lap/" + id, "_blank")
    }

    useEffect(() => {
        if (!isOpen) setLaps([{}])
    },[isOpen])

    useEffect(() => {
        if (data) handleFetchedData(data)
    }, [data])

    return (
        <dialog open={isOpen} className={`driverLaps${isSuccess ? " loaded" : ""}`}>
            {isSuccess && <>
                <span className="close" onClick={() => {setIsOpen(false)}}>Close</span>
                <h3 className="driver">
                    <Link className="driver__link" to={`/drivers/${driverID}`}>
                        {driver}
                    </Link> laps
                </h3>
                <div className="laps">
                    <Table data={laps} type={"sessionLaps"} handleBodyRowClick={handleTableBodyRowClick}/>
                </div>
            </>}
            {isError && <span className="error">{error}</span>}
            {isLoading && <span className="loading">Loading...</span>}
        </dialog>
    )
}