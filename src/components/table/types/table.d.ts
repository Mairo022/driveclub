interface ITable {
    data: Array<object>
    type: tableType
}

type tableType = "online" | "drivers" | "stats" | "logs"