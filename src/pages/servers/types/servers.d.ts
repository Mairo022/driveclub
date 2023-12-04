interface IServer {
    name: string
    track: string
    online: number
    spots: number
    session: string
    cars: string[]
    drivers: {
        driver: string
        car: string
        best: string
        last: string
    }[]
}

interface IServerProps {
    server: IServer
}