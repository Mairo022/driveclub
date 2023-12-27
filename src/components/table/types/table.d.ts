interface ITable {
    data: Array<object>
    type: tableType
    pagination?: IPaginationSB
    handleBodyRowClick?: (e: any) => void
}

type tableType = "online" | "drivers" | "stats" | "logs" | "driver" | "driverLaps" | "sessionLaps" | "sessionDetails"