import {ReactElement, useEffect, useState} from "react";
import "./style/sessions.scss";
import {getSessionsOverviews} from "../../services/sessionsService";
import {Pagination} from "../../components/pagination/Pagination";
import {Session} from "./Session";
import {buildRequestParams} from "../../services/restUtils";
import {useNavigate} from "react-router-dom";
import {hasURLParams} from "../../utils/url";
import {hasAllKeys, isShallowEqualObject} from "../../utils/compareObjects";
import {fullDatetimeFormat} from "../../utils/dateFormatter";
import {useFetch} from "../../hooks/useFetch";

export function Sessions(): ReactElement {
    const [isReadyToFetch, setIsReadyToFetch] = useState<boolean>(false)
    const [isDataReady, setIsDataReady] = useState<boolean>(false)

    const [pagination, setPagination] = useState<IPaginationSB | undefined>()
    const [sessions, setSessions] = useState<ISessionOverview[]>([])

    const navigate = useNavigate()

    const [filter, setFilter] = useState<IPageRequest>({
        page: 0,
        size: 14
    })

    const {data, isLoading, isSuccess, isError, error} = useFetch(getSessionsOverviews, [filter], isReadyToFetch, [filter])

    function handleFetchedData(data: IPageResponse<Array<any>>): void {
        const sessionData = data.content

        setSessions(organiseSessionData(sessionData))
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

    function handlePaging(page: number): void {
        setPagination(prev => ({ ...prev!, number: page }))
        setFilter(filter => ({...filter, page: page}))
        navigate({search: buildRequestParams({...filter, page: page})})
    }

    function organiseSessionData(sessionData: any[]): ISessionOverview[] {
        return sessionData.map(session => {
            const detailsArr = session[5]?.split(",")
            const details: ISessionDetailsRanks = {
                first: undefined,
                firstID: undefined,
                second: undefined,
                secondID: undefined,
                third: undefined,
                thirdID: undefined,
            }

            if (detailsArr) {
                if (detailsArr.length >= 3) {
                    details["first"] = detailsArr[2]
                    details["firstID"] = detailsArr[0]
                }
                if (detailsArr.length >= 6) {
                    details["second"] = detailsArr[5]
                    details["secondID"] = detailsArr[3]
                }
                if (detailsArr.length === 9) {
                    details["third"] = detailsArr[8]
                    details["thirdID"] = detailsArr[6]
                }
            }

            return {
                sessionID: session[0],
                type: session[1],
                date: fullDatetimeFormat(session[2]),
                track: session[3],
                totalDrivers: session[4],
                ...details
            }
        })
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
        <article className="sessions">
            {isSuccess && isDataReady && <>
                <ul>{sessions.map((session, i) => (
                    <li className="session" key={i}>
                        <Session session={session}/>
                    </li>))}
                </ul>
                <Pagination pagination={pagination!} handlePaging={handlePaging}/></>
            }
            {isError && <span className="error">{error}</span>}
            {isLoading && <span className="loading">Loading...</span>}
        </article>
    )
}