import { ReactElement, useEffect, useState } from "react";
import {Table} from "../../components/table/Table";
import "./style/drivers.scss";
import { getDrivers } from "../../services/driversService";
import { FETCH_STATUS } from "../../data/constants";
import {drivers as mockDrivers} from "./data/mockDrivers";

export function Drivers(): ReactElement {
    const [fetchStatus, setFetchStatus] = useState(FETCH_STATUS.IDLE)
    const [error, setError] = useState()
    const [drivers, setDrivers] = useState<IDrivers[]>(mockDrivers)

    function adjustFieldNames(drivers: any): IDrivers[] {
        // Server gives nulls for these two, despite existing in db
        return drivers.map(({crashes_per_hundred_km, infr_per_hundred_km, ...rest}) => ({
            "infr/100km": infr_per_hundred_km,
            "cr/100km": crashes_per_hundred_km,
            ...rest
        }))
    }

    async function fetchDrivers(): Promise<void> {
        try {
            const response = await getDrivers()
            const drivers = response.data.content

            if (drivers && drivers.length > 0) {
                console.log(drivers)
                setDrivers(adjustFieldNames(drivers))
                setFetchStatus(FETCH_STATUS.SUCCESS)
            }
        } catch (e: any) {
            setFetchStatus(FETCH_STATUS.ERROR)
            setError(e?.message)
        }
    }

    useEffect(() => {
        fetchDrivers()
    }, [])

    return (
        <article className="drivers">
            <Table data={drivers} type="drivers"/>
        </article>
    )
}