import {Dispatch, SetStateAction} from "react";

interface IDriverLapsProps {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
    sessionID: string
    driverID: string | undefined
}

interface IDriverLaps {
    lapID: number
    driver: string
    track: string
    laptime: string
    s1: string
    s2: string
    s3: string
    valid: boolean
}

interface IDriverLapsTable {
    id: number
    laptime: string
    s1: string
    s2: string
    s3: string
    valid: string
}
