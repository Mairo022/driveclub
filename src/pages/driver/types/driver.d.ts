interface IDriverTable {
    money: number
    wins: number
    podiums: number
    poles: number
    driven: number
    infractions: number
    crashes: number
    "infractions/100km": number
    "crashes/100km": number
}

interface IDriverLaps {
    track: string
    car: string
    laptime: string
    "Split 1": string
    "Split 2": string
    "Split 3": string
    date: string
    tc: number
    abs: number
}