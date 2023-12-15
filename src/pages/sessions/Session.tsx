export function Session(props: any) {
    const {session} = props

    function formatDate(date: string): string {
        return new Intl.DateTimeFormat('en-GB', {
            year: "numeric",
            day: "numeric",
            month: "long",
            hour: "numeric",
            minute: "numeric",
            hour12: false,
        }).format(new Date(date)).replace(" at", "")
    }
    return (
        <>
            <p className="session__title">
                {session.track} ({session.type}, Drivers: {session.drivers})
            </p>
            <div className="session__results">
                <p>1. {session.first}</p>
                <p>2. {session.second}</p>
                <p>3. {session.third}</p>
            </div>
            <p className="session__date">{formatDate(session.date)}</p>
        </>
    )
}