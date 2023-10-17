import axios, { AxiosPromise } from "axios";
import { IPageResponse } from "./types/services";

const apiURL: string = import.meta.env.VITE_API_URL + "drivers"

export function getDrivers(): AxiosPromise<IPageResponse<IDriver[]>> {
    return axios.get(`${apiURL}/getDrivers`)
}

export function saveDriver(driver: IDriver): AxiosPromise<IDriver> {
    return axios.post(`${apiURL}/saveDriver`, driver)
}