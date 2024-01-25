import axios from "./axiosConfig"
import {AxiosPromise} from "axios";

const apiURL: string = import.meta.env.VITE_API_URL + "/laps"

export function getDriverSessionLaps(sessionID: string, driverID: string): AxiosPromise {
    const url = `${apiURL}/getDriverSessionLaps?sessionID=${sessionID}&driverID=${driverID}`

    return axios.get(url)
}

export function getLap(lapID: number): AxiosPromise {
    const url = `${apiURL}/getLapStat?id=${lapID}`

    return axios.get(url)
}

export function getValidDriverLaps(driverID: string): AxiosPromise {
    const url = `${apiURL}/getValidDriverLaps?driverID=${driverID}`

    return axios.get(url)
}

export function getValidLaps(filter: string): AxiosPromise {
    const url = `${apiURL}/getLeaderboard?${filter}`

    return axios.get(url)
}