import {ReactElement} from "react/ts5.0";
import {nanoid} from "nanoid";
import "./table.scss";

export function Table(props: ITable): ReactElement {
    const data: {}[] = props.data
    const type = props.type

    return (
        <table className={`Table Table--${type}`}>
            <thead className="header">
                <tr className="header__row">{
                    Object.keys(data[0]).map((key, i) => (
                        <th className={`header__row__title ${key}`} key={i}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="body">{
                data.map(obj => (
                    <tr className="body__row" key={nanoid()}>{
                        Object.entries(obj).map(([key, value], i) => (
                            <td className={`body__row__item ${key}`} key={i} data-label={key}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}