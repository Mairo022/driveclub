import { ReactElement, useEffect, useState } from "react";
import {Table} from "../../components/table/Table";
import { getDrivers } from "../../services/driversService";
import { Pagination } from "../../components/pagination/Pagination";
import { useLocation, useNavigate } from 'react-router-dom';
import { useFetch } from "../../hooks/useFetch";

export function Drivers(): ReactElement {
    const location = useLocation()
    const navigate = useNavigate()
    const queryParams: URLSearchParams = new URLSearchParams(location.search)

    const page: number = Number(queryParams.get("page"))

    const [isReadyToFetch, setIsReadyToFetch] = useState<boolean>(false)
    const [isDataReady, setIsDataReady] = useState<boolean>(false)

    const [drivers, setDrivers] = useState<IDriver[]>([])
    const [pagination, setPagination] = useState<IPaginationSB | undefined>()

    const filterDefaults: IPageRequest = {
        sort: "money",
        direction: "desc",
        page: 0,
        size: 20
    }

    const {data, isLoading, isSuccess, isError, error} = useFetch(getDrivers, [queryParams.toString()], isReadyToFetch, [page])

    function setDefaultParams(): void {
        const filterDefaultsKeys = Object.keys(filterDefaults) as Array<keyof IPageRequest>
        const missingParams: Array<keyof IPageRequest> = filterDefaultsKeys.filter(
            key => !queryParams.has(key) && key !== "direction"
        )

        if (missingParams.length > 0) {
            missingParams.forEach((key) => {
                queryParams.set(key, String(filterDefaults[key]))
            })

            if (missingParams.includes("sort")) {
                const sortParam = filterDefaults["sort"] + "," + filterDefaults["direction"]
                queryParams.set("sort", sortParam)
            }
            navigate({search: queryParams.toString()})
        }
        setIsReadyToFetch(true)
    }

    function handleFilterUpdate(update: {[key: string]: string | number}): void {
        for (const key in update) {
            queryParams.set(key, String(update[key]))
        }
        navigate({search: queryParams.toString()})
    }

    function handlePaging(page: number): void {
        handleFilterUpdate({page})
    }

    function handleFetchedData(data: IPageResponse<IDriverServer[]>) {
        const drivers = data.content

        setDrivers(adjustFieldNames(drivers))
        setPagination({
            size: data.size,
            number: data.number,
            totalPages: data.totalPages,
            totalElements: data.totalElements
        })

        setIsDataReady(true)
    }

    function adjustFieldNames(drivers: IDriverServer[]): IDriver[] {
        return drivers.map(({crashes_per_hundred_km, infr_per_hundred_km,...rest}) => ({
            ...rest,
            "cr/100km": crashes_per_hundred_km,
            "infr/100km": infr_per_hundred_km
        }))
    }

    useEffect(() => {
        setDefaultParams()
    }, [])

    useEffect(() => {
        if (data) handleFetchedData(data)
    }, [data])

    return (
        <article className="drivers">
            {isSuccess && isDataReady && <>
                <Table pagination={pagination!} data={ drivers } type="drivers"/>
                <Pagination pagination={pagination!} handlePaging={handlePaging}/></>
            }
            {isError && <span className="error">{error}</span>}
            {isLoading && <span className="loading">Loading...</span>}
        </article>
    )
}