interface IServer {
    name: string
    track: string
    online: number
    spots: number
    session: string
    drivers: {
        driver: string
        car: string
        best: string
        last: string
    }[]
}