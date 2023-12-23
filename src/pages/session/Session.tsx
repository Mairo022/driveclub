import {ReactElement, useEffect, useState} from "react";
import {FETCH_STATUS} from "../../data/constants";
import {Table} from "../../components/table/Table";
import {DriverLaps} from "./DriverLaps";
import "./style/session.scss";

export function Session(): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [status, setStatus] = useState<string>(FETCH_STATUS.SUCCESS)
    const isLoading = status === FETCH_STATUS.LOADING
    const isSuccess = status === FETCH_STATUS.SUCCESS
    const isError = status === FETCH_STATUS.ERROR
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

    }, [])

    return (
        <article className="session">
            {isSuccess && <>
                <div className="details">
                    <header className="details__header">
                        <h3 className="details__header__track">Spa (Qualify), 10 minutes</h3>
                        <p className="details__header__date">10 December 2023 05:11</p>
                    </header>
                    <div className="details__conditions">
                        <div className="conditions">
                            <div className="conditions__row">
                                <p className="conditions__row__header">Air:</p>
                                <p className="conditions__row__data">30c</p>
                            </div>
                            <div className="conditions__row">
                                <p className="conditions__row__header">Road:</p>
                                <p className="conditions__row__data">5c</p>
                            </div>
                        </div>
                        <div className="conditions">
                            <div className="conditions__row">
                                <p className="conditions__row__header">Tyre wear:</p>
                                <p className="conditions__row__data">1.0</p>
                            </div>
                            <div className="conditions__row">
                                <p className="conditions__row__header">Fuel rate:</p>
                                <p className="conditions__row__data">1.0</p>
                            </div>
                        </div>
                        <div className="conditions">
                            <div className="conditions__row">
                                <p className="conditions__row__header">Damage:</p>
                                <p className="conditions__row__data">100%</p>
                            </div>
                            <div className="conditions__row">
                                <p className="conditions__row__header">Penalties:</p>
                                <p className="conditions__row__data">On</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="drivers">
                    <div className="driver">
                        {/* Into Table: car, time, fastest lap, gap to first, rank */}
                        <Table data={[{}]}/>
                        <button>Dropdown</button>

                        {isOpen &&
                            <DriverLaps isOpen={isOpen}/>
                        }
                    </div>
                </div>
            </>
            }
            {isError && <span className="error">{error}</span>}
            {isLoading && <span className="loading">Loading...</span>}
        </article>
    )
}