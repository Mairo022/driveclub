import axios from "./axiosConfig"
import { AxiosPromise } from "axios";

const apiURL: string = import.meta.env.VITE_API_URL + "/drivers"

export function getDrivers(params: string): AxiosPromise<IPageResponse<IDriver[]>> {
    const url = `${apiURL}/getDrivers?${params}`

    return axios.get(url)
}

export function getDriver(id: string): AxiosPromise<IDriver> {
    const url = `${apiURL}/getDriver?id=${id}`
    return axios.get(url)
}

export function saveDriver(driver: IDriver): AxiosPromise<IDriver> {
    return axios.post(`${apiURL}/saveDriver`, driver)
}