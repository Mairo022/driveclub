interface ISelectBoxProps {
    setCarTrack: (car: string, track: string) => void
}

interface ILapLeaderboard {
    id: number
    driver: string
    laptime: string
    s1: string
    s2: string
    s3: string
    date: string
}