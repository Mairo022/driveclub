import {ReactElement, useEffect, useState} from "react";
import "./style/sessions.scss";
import {getSessions} from "../../services/sessionsService";
import {FETCH_STATUS} from "../../data/constants";
import {Pagination} from "../../components/pagination/Pagination";
import {Session} from "./Session";
import {buildRequestParams} from "../../services/restUtils";
import {useNavigate} from "react-router-dom";
import {AxiosResponse} from "axios";
import {hasURLParams} from "../../utils/url";
import {hasAllKeys, isShallowEqualObject} from "../../utils/compareObjects";

export function Sessions(): ReactElement {
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true)
    const [pagination, setPagination] = useState<IPaginationSB | undefined>()
    const [sessions, setSessions] = useState<ISession[]>([])

    const navigate = useNavigate()

    const [filter, setFilter] = useState<IPageRequest>({
        sort: "date",
        direction: "desc",
        page: 0,
        size: 20
    })

    const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE)
    const isLoading = status === FETCH_STATUS.LOADING
    const isSuccess = status === FETCH_STATUS.SUCCESS
    const isError = status === FETCH_STATUS.ERROR
    const [error, setError] = useState<string | null>(null)

    async function fetchSessions(): Promise<void> {
        try {
            setStatus(FETCH_STATUS.LOADING)

            const response: AxiosResponse = await getSessions(filter)
            const sessions: ISession[] = response.data.content

            if (sessions && sessions.length > 0) {
                setSessions(sessions)
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

    useEffect(() => {
        if (hasURLParams()) {
            setFilterFromURLParams()
        }
        setIsInitialLoad(false)
    }, [])

    useEffect(() => {
        if (!isInitialLoad) fetchSessions()
    }, [filter, isInitialLoad])

    return (
        <article className="sessions">
            {isSuccess && <>
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