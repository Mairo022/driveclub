interface IFetchHookElement {
    fn: Function,
    params: Array<any>
}

interface IFetchHook extends Array<IFetchHookElement> {}

interface IFetchHookReturn {
    data: any,
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
    error: string | undefined
}