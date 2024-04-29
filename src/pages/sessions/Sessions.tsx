import {ReactElement, useEffect, useState} from "react";
import "./style/sessions.scss";
import {getSessionsOverviews} from "../../services/sessionsService";
import {Pagination} from "../../components/pagination/Pagination";
import {Session} from "./Session";
import {useLocation, useNavigate} from "react-router-dom";
import {fullDatetimeFormat} from "../../utils/dateFormatter";
import {useFetch} from "../../hooks/useFetch";

export function Sessions(): ReactElement {
    const location = useLocation()
    const navigate = useNavigate()
    const queryParams: URLSearchParams = new URLSearchParams(location.search)

    const page: number = Number(queryParams.get("page"))

    const [isDataReady, setIsDataReady] = useState<boolean>(false)
    const [isReadyToFetch, setIsReadyToFetch] = useState(false)

    const [sessions, setSessions] = useState<ISessionOverview[]>([])
    const [pagination, setPagination] = useState<IPaginationSB | undefined>()

    const filterDefaults: IPageRequest = {
        sort: "date",
        direction: "desc",
        page: 0,
        size: 14
    }

    const {data, isLoading, isSuccess, isError, error} = useFetch(
        getSessionsOverviews,
        [queryParams.toString()],
        isReadyToFetch,
        [page]
    )

    function handleFilterUpdate(update: {[key: string]: string | number}): void {
        for (const key in update) {
            queryParams.set(key, String(update[key]))
        }
        navigate({search: queryParams.toString()})
    }

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

    function handlePaging(page: number): void {
        handleFilterUpdate({page})
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

    useEffect(() => {
        setDefaultParams()
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