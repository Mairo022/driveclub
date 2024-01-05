import {useEffect, useState} from "react";
import {FETCH_STATUS} from "../data/constants";

export function useFetch(fetchService: IFetchHook | Function,
                         params: Array<any> | undefined = undefined,
                         isReadyToFetch = true,
                         dependencies: any[] = [undefined]
): IFetchHookReturn {
    const [data, setData] = useState<any>()

    const [error, setError] = useState<string>()
    const [status, setStatus] = useState<string>(FETCH_STATUS.IDLE)
    const isLoading = status === FETCH_STATUS.LOADING
    const isSuccess = status === FETCH_STATUS.SUCCESS
    const isError = status === FETCH_STATUS.ERROR

    async function fetchData(): Promise<void> {
        try {
            setStatus(FETCH_STATUS.LOADING)

            if (!Array.isArray(fetchService)) {
                const response = await fetchService(...(params ?? [undefined]))
                const data = response.data

                setData(data)
                setStatus(FETCH_STATUS.SUCCESS)
            }

            if (Array.isArray(fetchService)) {
                const responses = await Promise.all(
                    fetchService.map(async element => (
                        await element.fn(...(element.params ?? [undefined]))
                    ))
                )

                setData(responses.map(response => response.data))
                setStatus(FETCH_STATUS.SUCCESS)
            }
        } catch (e: any) {
            setStatus(FETCH_STATUS.ERROR)
            setError(e?.message)
        }
    }

    useEffect(() => {
        if (isReadyToFetch) fetchData()
    }, [isReadyToFetch, ...dependencies])

    return {data, isLoading, isSuccess, isError, error}
}