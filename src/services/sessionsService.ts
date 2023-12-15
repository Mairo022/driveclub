import axios, {AxiosPromise} from "axios";
import {buildRequestParams} from "./restUtils";

const apiURL: string = import.meta.env.VITE_API_URL + "/sessions"

export function getSessions(filter: IPageRequest): AxiosPromise<IPageResponse<ISession[]>> {
    const params: string = buildRequestParams(filter)
    const url = `${apiURL}/getSessions?${params}`

    return axios.get(url)
}