interface IServer {
    name: string
    track: string
    online: number
    spots: number
    session: string
    drivers: {
        name: string
        car: string
    }[]
}