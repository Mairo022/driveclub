import { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style/driver.scss";
import { getDriver } from "../../services/driversService";
import { Table } from "../../components/table/Table";
import { driverLaps } from "./data/mockLaps";
import {useFetch} from "../../hooks/useFetch";

export function Driver(): ReactElement {
    const navigate = useNavigate()
    const location = useLocation()

    const id: string = location.pathname.split("/")[2]
    const {data: driver, isLoading, isSuccess, isError, error} = useFetch(getDriver, [id])

    function adjustDriverToTable(driver: IDriverServer): IDriverTable[] {
        return [{
            money: driver.money,
            driven: driver.driven,
            wins: driver.wins,
            podiums: driver.podiums,
            poles: driver.poles,
            crashes: driver.crashes,
            infractions: driver.infr,
            "crashes/100km": driver.crashes_per_hundred_km,
            "infractions/100km": driver.infr_per_hundred_km
        }]
    }

    return (
        <article className="driver">
            <button className="back" onClick={() => navigate(-1)}>
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 10L3.29289 10.7071L2.58579 10L3.29289 9.29289L4 10ZM21 18C21 18.5523 20.5523 19 20 19C19.4477 19 19 18.5523 19 18L21 18ZM8.29289 15.7071L3.29289 10.7071L4.70711 9.29289L9.70711 14.2929L8.29289 15.7071ZM3.29289 9.29289L8.29289 4.29289L9.70711 5.70711L4.70711 10.7071L3.29289 9.29289ZM4 9L14 9L14 11L4 11L4 9ZM21 16L21 18L19 18L19 16L21 16ZM14 9C17.866 9 21 12.134 21 16L19 16C19 13.2386 16.7614 11 14 11L14 9Z" fill="#33363F"/>
                </svg>
            </button>
            {isSuccess && <>
            <div className="info">
                <h2 className="info__name">{driver.name}</h2>
                <div className="info__details">
                    <Table data={adjustDriverToTable(driver)} type="driver"/>
                </div>
            </div>
            <div className="hotlaps">
                <h3 className="hotlaps__title">Laptimes</h3>
                <Table data={driverLaps} type="driverLaps"/>
            </div></>
            }
            {isError && <span className="error">{error}</span>}
            {isLoading && <span className="loading">Loading...</span>}
        </article>
    )
}