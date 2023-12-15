interface ISession {
    id: string
    type: string
    date: string
    fuel_rate: number | null
    tyre_wear_rate: number | null
    air_temp: number | null
    road_temp: number | null
    track: string
    penalties: boolean | null
    duration: string | null
    server: string
}