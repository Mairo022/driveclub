interface ISessionInfo {
    air_temp: number
    damage: number
    date: string
    duration: string
    fuel_rate: number
    id: string
    penalties: boolean
    road_temp: number
    server: string
    track: string
    type: string
    tyre_wear_rate: number
}

interface ISessionDetails {
    car: string
    fastestLap: string
    gapToFirst: string
    id: number
    name: string
    rank: string
    sessionID: string
    totalTime: string | null
}

interface ISessionDetailsTable {
    car: string
    fastestLap: string
    gapToFirst: string
    id: number
    name: string
    rank: string
    totalTime?: string | null
}