import {ITracksCars, ITrackStats} from "../types/stats";

export const tracksCars: ITracksCars[] = [
    {
        track: "Vallelunga",
        cars: ["Ferrari 599xx", "BMW E34 M5", "Pagani Zonda R"]
    },
    {
        track: "Nordschleife",
        cars: ["Ferrari 599xx", "BMW E34 M5", "Pagani Zonda R", "Ford Sierra Cosworth RS500 GrA 1990"]
    }
]

export const nordFerrariStats: ITrackStats[] = [
    {
        driver: "Afterburn",
        laptime: "6.20.209",
        "Split 1": "1.40.108",
        "Split 2": "2.08.755",
        "Split 3": "2.31.346",
        date: "2023-09-25 00:44",
        tc: 0,
        abs: 1
    },
    {
        driver: "Existenz",
        laptime: "6.21.000",
        "Split 1": "1.40.188",
        "Split 2": "2.09.766",
        "Split 3": "2.31.046",
        date: "2023-09-24 14:44",
        tc: 0,
        abs: 1
    },
    {
        driver: "Sean",
        laptime: "6.23.403",
        "Split 1": "1.40.294",
        "Split 2": "2.10.059",
        "Split 3": "2.33.050",
        date: "2023-09-24 01:22",
        tc: 0,
        abs: 1
    }
]

export const vallelungaFerrariStats: ITrackStats[] = [
    {
        driver: "Afterburn",
        laptime: "1.31.375",
        "Split 1": "0.29.275",
        "Split 2": "0.34.888",
        "Split 3": "0.27.212",
        date: "2023-09-25 18:18",
        tc: 0,
        abs: 1
    },
    {
        driver: "Sean",
        laptime: "1.31.653",
        "Split 1": "0.29.444",
        "Split 2": "0.34.984",
        "Split 3": "0.27.225",
        date: "2023-09-25 18:14",
        tc: 0,
        abs: 1
    }
]