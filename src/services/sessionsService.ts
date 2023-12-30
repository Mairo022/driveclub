import axios from "./axiosConfig"
import {AxiosPromise} from "axios";
import {buildRequestParams} from "./restUtils";

const apiURL: string = import.meta.env.VITE_API_URL + "/sessions"

export function getSessionsOverviews(filter: IPageRequest): AxiosPromise<[]> {
    const params: string = buildRequestParams(filter)
    const url = `${apiURL}/getOverviews?${params}`

    return axios.get(url)
}

export function getSessionDetails(filter: IPageRequest, sessionID: string): AxiosPromise {
    const params: string = buildRequestParams(filter)
    const url = `${apiURL}/details/getDetails?${params}&sessionID=${sessionID}`

    return axios.get(url)
}

export function getSessionInfo(sessionID: string): AxiosPromise {
    const url = `${apiURL}/getSession?id=${sessionID}`

    return axios.get(url)
}