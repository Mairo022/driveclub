import {ReactElement, useEffect, useState} from "react";
import {Table} from "../../components/table/Table";
import "./style/driverLaps.scss"
import {IDriverLaps, IDriverLapsProps, IDriverLapsTable} from "./types/driverLaps";
import {FETCH_STATUS} from "../../data/constants";
import {getDriverSessionLaps} from "../../services/lapsService";

export function DriverLaps(props: IDriverLapsProps): ReactElement {
    const {isOpen, setIsOpen, sessionID, driverID} = props

    const formattedName = (name: string): string => name.charAt(name.length-1) === "s" ? `${name}'` : `${name}'s`

    const [driver, setDriver] = useState<string>("")
    const [laps, setLaps] = useState<IDriverLapsTable[] | object[]>([{}])

    const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE)
    const isLoading = status === FETCH_STATUS.LOADING
    const isSuccess = status === FETCH_STATUS.SUCCESS
    const isError = status === FETCH_STATUS.ERROR
    const [error, setError] = useState<string | null>(null)

    async function fetchLaps(): Promise<void> {
        if (!driverID) {
            setStatus(FETCH_STATUS.ERROR)
            setError("Driver ID is missing")
            return
        }

        try {
            setStatus(FETCH_STATUS.LOADING)

            const response = await getDriverSessionLaps(sessionID, driverID)
            const driverLaps: IDriverLaps[] = response.data

            if (driverLaps) {
                setDriver(driverLaps[0].driver)
                setLaps(toDriverLapsTableFormat(driverLaps))
                setStatus(FETCH_STATUS.SUCCESS)
            }
        } catch (e: any) {
            setStatus(FETCH_STATUS.ERROR)
            setError(e?.message)
        }
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

    useEffect(() => {
        if (isOpen)
            fetchLaps()
        if (!isOpen)
            setLaps([{}])
    },[driverID, isOpen])

    return (
        <dialog open={isOpen} className="driverLaps">
            {isSuccess && <>
                <span className="close" onClick={() => {setIsOpen(false)}}>Close</span>
                <h3 className="driver">{formattedName(driver)} laps</h3>
                <div className="laps">
                    <Table data={laps} type={"sessionLaps"}/>
                </div>
            </>}
            {isError && <span className="error">{error}</span>}
            {isLoading && <span className="loading">Loading...</span>}
        </dialog>
    )
}