import { ReactElement, useEffect, useState } from "react";
import {Table} from "../../components/table/Table";
import "./style/drivers.scss";
import { getDrivers } from "../../services/driversService";
import { Pagination } from "../../components/pagination/Pagination";
import { useLocation, useNavigate } from 'react-router-dom';
import { buildRequestParams } from "../../services/restUtils";
import { hasAllKeys, isShallowEqualObject } from "../../utils/compareObjects";
import { hasURLParams } from "../../utils/url";
import { useFetch } from "../../hooks/useFetch";

export function Drivers(): ReactElement {
    const [isReadyToFetch, setIsReadyToFetch] = useState<boolean>(false)
    const [isDataReady, setIsDataReady] = useState<boolean>(false)

    const [drivers, setDrivers] = useState<IDriver[]>([])
    const [pagination, setPagination] = useState<IPaginationSB | undefined>()

    const location = useLocation()
    const navigate = useNavigate()

    const [filter, setFilter] = useState<IPageRequest>({
        sort: "money",
        direction: "desc",
        page: 0,
        size: 20
    })

    const {data, isLoading, isSuccess, isError, error} = useFetch(getDrivers, [filter], isReadyToFetch)

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

    function setFilterFromURLParams(): void {
        const search: string = location.search.slice(1)
        const params: string[] = search.split("&")

        const paramsObj: IPageRequest = params.map(param => {
            const split = param.split("=")

            const key = split[0]
            const value = split[1]

            if (key === "size" || key === "page") {
                const valueInt = parseInt(value)

                if (isNaN(valueInt)) {
                    return key === "size" ? {[key]: 20} : {[key]: 0}
                }

                return {[key]: valueInt}
            }

            if (key === "sort") {
                const values = value.split(",")
                const sort = values[0]
                const dir = values[1]

                if (dir !== "asc" && dir !== "desc") {
                    return {"sort": sort, "direction": "desc"}
                }

                return {"sort": sort, "direction": dir}
            }

            return {[key]: value}
        }).reduce((acc: any, obj) => ({ ...acc, ...obj }), {})

        if (!hasAllKeys(filter, paramsObj)) {
            return
        }

        if (!isShallowEqualObject(filter, paramsObj)) {
            setFilter(paramsObj)
        }
    }

    function adjustFieldNames(drivers: IDriverServer[]): IDriver[] {
        return drivers.map(({crashes_per_hundred_km, infr_per_hundred_km,...rest}) => ({
            ...rest,
            "cr/100km": crashes_per_hundred_km,
            "infr/100km": infr_per_hundred_km
        }))
    }

    function handlePaging(page: number): void {
        setPagination(prev => ({ ...prev!, number: page }))
        setFilter(filter => ({...filter, page: page}))
        navigate({search: buildRequestParams({...filter, page: page})})
    }

    useEffect(() => {
        if (hasURLParams()) {
            setFilterFromURLParams()
        }
        setIsReadyToFetch(true)
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