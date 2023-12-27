import {ReactElement} from "react";
import {Table} from "../../components/table/Table";
import "./style/driverLaps.scss"
import {IDriverLapsProps} from "./types/driverLaps";

export function DriverLaps(props: IDriverLapsProps): ReactElement {
    const {isOpen, setIsOpen} = props

    const formattedName = (name: string): string => name.charAt(name.length-1) === "s" ? `${name}'` : `${name}'s`

    return (
        <dialog open={isOpen} className="driverLaps">
            <span className="close" onClick={() => {setIsOpen(false)}}>Close</span>
            <h3 className="driver">{formattedName("Driver")} laps</h3>
            <div className="laps">
                <Table data={[{}]} type={"sessionLaps"}/>
            </div>
        </dialog>
    )
}