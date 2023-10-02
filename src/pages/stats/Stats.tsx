import {ReactElement, useState} from "react";
import SelectBox from "./SelectBox";
import "./style/stats.scss"
import {Table} from "../../components/table/Table";
import {nordFerrariStats, vallelungaFerrariStats} from "./data/mockStats";
import {ITrackStats} from "./types/stats";

export function Stats(): ReactElement {
    const [car, setCar] = useState<string>("")
    const [track, setTrack] = useState<string>("")

    function getData(): ITrackStats[] | Array<object> {
        if (car === "Ferrari 599xx" && track === "Nordschleife")
            return nordFerrariStats
        if (car === "Ferrari 599xx" && track === "Vallelunga")
            return vallelungaFerrariStats
        return [{}]
    }

    return (
        <article className="stats">
            <SelectBox setCar={setCar} setTrack={setTrack}/>
            <Table data={getData()} type="stats"/>
        </article>
    )
}