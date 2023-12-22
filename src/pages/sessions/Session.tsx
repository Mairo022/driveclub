import {NavLink} from "react-router-dom";

export function Session(props: ISessionProps) {
    const {session} = props

    return (
        <NavLink className="session__link" to={"./" + session.sessionID}>
            <p className="session__title">
                {session.track} ({session.type}, Drivers: {session.totalDrivers})
            </p>
            <div className="session__results">
                {session.firstID &&
                <p>1. {session.first}</p>}
                {session.secondID &&
                <p>2. {session.second}</p>}
                {session.thirdID &&
                <p>3. {session.third}</p>}
                {!session.firstID &&
                <p>DNF</p>}
            </div>
            <p className="session__date">{session.date}</p>
        </NavLink>
    )
}