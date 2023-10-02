import {Dispatch, SetStateAction} from "react";

interface ITracksCars {
    track: string
    cars: string[]
}

interface ITracksCarsExtracted {
    tracks: string[]
    cars: string[]
}

interface ITrackStats {
    driver: string
    laptime: string
    "Split 1": string
    "Split 2": string
    "Split 3": string
}

interface ISelectBoxProps {
    setCar: Dispatch<SetStateAction<string>>
    setTrack: Dispatch<SetStateAction<string>>
}