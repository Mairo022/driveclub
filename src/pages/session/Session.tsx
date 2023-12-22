import {ReactElement, useEffect, useState} from "react";
import {FETCH_STATUS} from "../../data/constants";
import {Table} from "../../components/table/Table";
import {DriverLaps} from "./DriverLaps";

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
                    <header>
                        <h4>Track</h4>
                        <p>Date</p>
                    </header>
                    <div>
                        <p>Air temp</p>
                        <p>Road temp</p>
                        <p>Tyre wear</p>
                        <p>Fuel rate</p>
                    </div>
                    <div>
                        <p>Type</p>
                        <p>Duration</p>
                        <p>Damage</p>
                        <p>Penalties</p>
                    </div>
                </div>
                <div className="drivers">
                    <div className="driver">
                        <h4>Driver</h4>
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