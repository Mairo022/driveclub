import { ReactElement, useEffect, useRef } from "react";
import {nanoid} from "nanoid";
import "./table.scss";
import { useNavigate } from "react-router-dom";

export function Table(props: ITable): ReactElement {
    const indexStart = getIndex(props.pagination)
    const data: Array<object> = props.data
    const type = props.type
    const handleBodyRowClick = props.handleBodyRowClick ? props.handleBodyRowClick : handleBodyRowClickDefault

    const tableBodyRef = useRef<HTMLTableSectionElement>(null)
    const navigate = useNavigate()

    function getIndex(pagination: IPaginationSB | undefined): number {
        if (!pagination || pagination.number === 0) return 1
        return pagination.size * pagination.number + 1
    }

    function handleBodyRowClickDefault(e: any): void {
        const id: string | null = e.target.parentNode.getAttribute("data-id")

        if (id === null) return

        if (e.button === 0) navigate("./" + id)
        if (e.button === 1) window.open(window.location + "/" + id, "_blank")
    }

    useEffect(() => {
        if (type === "logs" || type === "driver" || type === "driverLaps") return

        tableBodyRef.current?.addEventListener('mouseup', handleBodyRowClick)

        return () => {
            tableBodyRef.current?.removeEventListener('mouseup', handleBodyRowClick)
        }
    }, [])

    return (
        <table className={`Table Table--${type}`}>
            <thead className="header">
                <tr className="header__row">
                    <th className="header__row__title #">#</th>{
                    Object.keys(data[0]).map((key, i) => (key !== "id" &&
                        <th className={`header__row__title ${key}`} key={i}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="body" ref={tableBodyRef}>{
                data.map((obj: any, i) => (
                    <tr className="body__row" key={nanoid()} data-id={obj?.id}>
                        <td className={`body__row__item #`} key={nanoid()} data-label="#">{indexStart+i}</td>{
                            Object.entries(obj).map(([key, value]: any, i) => (key !== "id" &&
                                <td className={`body__row__item ${key}`} key={i} data-label={key}>{value}</td>
                            ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}