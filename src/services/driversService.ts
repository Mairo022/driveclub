import axios, { AxiosPromise } from "axios";

const apiURL: string = import.meta.env.VITE_API_URL + "drivers"

export function getDrivers(): AxiosPromise {
    return axios.get(`${apiURL}/getDrivers`)
}