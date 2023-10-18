interface ITable {
    data: Array<object>
    type: tableType
    pagination?: IPaginationSB
}

type tableType = "online" | "drivers" | "stats" | "logs"