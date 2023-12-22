import {ReactElement} from "react";
import {Table} from "../../components/table/Table";

export function DriverLaps(props: IDriverLapsProps): ReactElement {
    const {isOpen} = props

    return (
        <Table data={[{}]} type={"sessionLaps"}/>
    )
}