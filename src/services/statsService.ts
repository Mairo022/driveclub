import axios, {AxiosPromise} from "axios";

export function getCars(): AxiosPromise {
    const url = import.meta.env.VITE_API_URL + "/cars/getAllCars"

    return axios.get(url)
}

export function getTracks(): AxiosPromise {
    const url = import.meta.env.VITE_API_URL + "/tracks/getAllTracks"

    return axios.get(url)
}