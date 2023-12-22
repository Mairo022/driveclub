interface ISessionProps {
    session: ISessionOverview
}

interface ISessionOverview extends ISessionDetails {
    sessionID: string
    date: string
    track: string
    type: string
    totalDrivers: number
}

interface ISessionDetails {
    first: undefined | string
    firstID: undefined | string
    second: undefined | string
    secondID: undefined | string
    third: undefined | string
    thirdID: undefined | string
}