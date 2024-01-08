interface ILapStat {
    driver: IDriverServer
    session: ISessionInfo
    lap: ILapAPI
    totalLaps: number
}

interface ILapAPI {
    car: string
    crashesCars: string
    crashesEnv: string
    cuts: number
    date: string
    grip: number
    id: number
    laptime: string
    maximumSpeed: number
    pitTime: string
    pitlaneTime: string
    s1: string
    s2: string
    s3: string
    track: string
    valid: boolean
}

interface ILapTable {
    laptime: string
    s1: string
    s2: string
    s3: string
    grip: string
    "Top speed": string
    laps: number
}