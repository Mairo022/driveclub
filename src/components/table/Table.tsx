import { ReactElement } from "react";
import {nanoid} from "nanoid";
import "./table.scss";

export function Table(props: ITable): ReactElement {
    const data: Array<object> = props.data
    const type = props.type

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
                        <td className={`body__row__item #`} key={nanoid()} data-label="#">{i+1}</td>{
                            Object.entries(obj).map(([key, value]: any, i) => (key !== "id" &&
                                <td className={`body__row__item ${key}`} key={i} data-label={key}>{value}</td>
                            ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}