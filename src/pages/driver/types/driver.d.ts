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

interface IDriverColumns {
    firstColumn: IDriverColumnOne | undefined
    secondColumn: IDriverColumnTwo | undefined
}

interface IDriverColumnOne {
    money: number
    wins: number
    podiums: number
    poles: number
}

interface IDriverColumnTwo {
    crashes: number
    infractions: number
    "crashes/100km": number
    "infractions/100km": number
}