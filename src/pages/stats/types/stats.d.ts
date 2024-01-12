import {Dispatch, SetStateAction} from "react";


interface ISelectBoxProps {
    setCar: Dispatch<SetStateAction<string>>
    setTrack: Dispatch<SetStateAction<string>>
}

interface ILapLeaderboard {
    id: number
    driver: string
    laptime: string
    s1: string
    s2: string
    s3: string
    date: string
}