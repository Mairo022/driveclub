import {ReactElement} from "react";
import SelectBox from "./SelectBox";
import "./style/stats.scss"

export function Stats(): ReactElement {
    return (
        <article className="stats">
            <SelectBox/>
        </article>
    )
}