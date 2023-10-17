interface IDriver {
    id: number
    name: string
    money: number
    wins: number
    podiums: number
    poles: number
    driven: number
    infr: number
    crashes: number
    "infr/100km": number
    "cr/100km": number
}

interface IDriverServer {
    id: number
    name: string
    money: number
    wins: number
    podiums: number
    poles: number
    driven: number
    infr: number
    crashes: number
    infr_per_hundred_km: number
    crashes_per_hundred_km: number
}