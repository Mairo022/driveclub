import { ReactElement, useEffect, useState } from "react";
import {Table} from "../../components/table/Table";
import "./style/drivers.scss";
import { getDrivers } from "../../services/driversService";
import { FETCH_STATUS } from "../../data/constants";
import { AxiosResponse } from "axios";
import { Pagination } from "../../components/pagination/Pagination";

export function Drivers(): ReactElement {
    const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE)
    const [error, setError] = useState<string | null>(null)
    const [drivers, setDrivers] = useState<IDriver[]>([])
    const [pagination, setPagination] = useState<IPaginationSB | undefined>()

    const isLoading = status === FETCH_STATUS.LOADING
    const isSuccess = status === FETCH_STATUS.SUCCESS
    const isError = status === FETCH_STATUS.ERROR

    const [filter, setFilter] = useState<IPageRequest>({
        sort: "money",
        direction: "desc",
        page: 0,
        size: 12
    })

    function adjustFieldNames(drivers: IDriverServer[]): IDriver[] {
        return drivers.map(({crashes_per_hundred_km, infr_per_hundred_km,...rest}) => ({
            ...rest,
            "cr/100km": crashes_per_hundred_km,
            "infr/100km": infr_per_hundred_km
        }))
    }

    async function fetchDrivers(): Promise<void> {
        try {
            setStatus(FETCH_STATUS.LOADING)

            const response: AxiosResponse = await getDrivers(filter)
            const drivers: IDriverServer[] = response.data.content

            if (drivers && drivers.length > 0) {
                setDrivers(adjustFieldNames(drivers))
                setPagination({
                    size: response.data.size,
                    number: response.data.number,
                    totalPages: response.data.totalPages,
                    totalElements: response.data.totalElements
                })
                setStatus(FETCH_STATUS.SUCCESS)
            }
        } catch (e: any) {
            setStatus(FETCH_STATUS.ERROR)
            setError(e?.message)
        }
    }

    function handlePaging(page: number): void {
        setPagination(prev => ({ ...prev!, number: page }))
        setFilter(filter => ({...filter, page: page}))
    }

    useEffect(() => {
        fetchDrivers()
    }, [filter])

    return (
        <article className="drivers">
            {isSuccess && <>
                <Table pagination={pagination!} data={ drivers } type="drivers"/>
                <Pagination pagination={pagination!} handlePaging={handlePaging}/></>
            }
            {isError && <span className="error">{error}</span>}
            {isLoading && <span className="loading">Loading...</span>}
        </article>
    )
}