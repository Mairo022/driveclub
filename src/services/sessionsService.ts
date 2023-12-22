import axios, {AxiosPromise} from "axios";
import {buildRequestParams} from "./restUtils";

const apiURL: string = import.meta.env.VITE_API_URL + "/sessions"

export function getSessionsOverviews(filter: IPageRequest): AxiosPromise<[]> {
    const params: string = buildRequestParams(filter)
    const url = `${apiURL}/getOverviews?${params}`

    return axios.get(url)
}