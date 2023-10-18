import { ReactElement } from "react";
import {nanoid} from "nanoid";
import "./table.scss";

export function Table(props: ITable): ReactElement {
    const indexStart = getIndex(props.pagination)
    const data: Array<object> = props.data
    const type = props.type

    function getIndex(pagination: IPaginationSB | undefined): number {
        if (!pagination || pagination.number === 0) return 1
        return pagination.size * pagination.number + 1
    }

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
            <tbody className="body">{
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