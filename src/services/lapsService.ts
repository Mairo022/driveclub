import axios from "./axiosConfig"
import {AxiosPromise} from "axios";

const apiURL: string = import.meta.env.VITE_API_URL + "/laps"

export function getDriverSessionLaps(sessionID: string, driverID: string): AxiosPromise {
    const url = `${apiURL}/getDriverSessionLaps?sessionID=${sessionID}&driverID=${driverID}`

    return axios.get(url)
}