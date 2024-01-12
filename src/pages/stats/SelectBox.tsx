import {ReactElement, useEffect, useState} from "react";
import "./style/selectBox.scss";
import { nanoid } from "nanoid";
import {ISelectBoxProps} from "./types/stats";
import {useFetch} from "../../hooks/useFetch";
import {getCars, getTracks} from "../../services/statsService";

export default function SelectBox(props: ISelectBoxProps): ReactElement {
    const {setCar, setTrack} = props

    const [selectedTrackOption, setSelectedTrackOption] = useState<number>(1)
    const [selectedCarOption, setSelectedCarOption] = useState<number>(1000)
    const [selectedTrack, setSelectedTrack] = useState<string>("")
    const [selectedCar, setSelectedCar] = useState<string>("")

    const {data, isLoading, isSuccess, isError, error} = useFetch([
        {fn: getCars, params: [undefined]},
        {fn: getTracks, params: [undefined]}
    ])

    const handleTrackOptionChange = (e: any): void => {
        setSelectedTrack(e.target.dataset.name)
        setSelectedTrackOption(parseInt(e.target.value))
    }

    const handleCarOptionChange = (e: any): void => {
        setSelectedCar(e.target.dataset.name)
        setSelectedCarOption(parseInt(e.target.value))
    }

    function handleSearch(e: any): void {
        setCar(selectedCar)
        setTrack(selectedTrack)
        e.preventDefault()
    }

    useEffect(() => {
        if (!data) return
        setSelectedCar(data[0][selectedCarOption - 1000])
        setSelectedTrack(data[1][selectedTrackOption])
    }, [data])


    return (<>
        {isSuccess &&
        <form onSubmit={handleSearch} className="search">
            <div className="select-box">
                <div className="select-box__current" tabIndex={1}>{
                    data[1].map((track: string, index: number) => (
                        <div className="select-box__value" key={nanoid()}>
                            <input
                                className="select-box__input"
                                type="radio"
                                id={index.toString()}
                                value={index}
                                name="track"
                                data-name={track}
                                checked={selectedTrackOption === index}
                                onChange={handleTrackOptionChange}
                            />
                            <p className="select-box__input-text">{track}</p>
                        </div>
                    ))}
                    <img
                        className="select-box__icon"
                        src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                        alt="Arrow Icon"
                        aria-hidden="true"
                    />
                </div>
                <ul className="select-box__list">{
                    data[1].map((track: string, index: number) => (
                        <li key={nanoid()}>
                            <label className="select-box__option" htmlFor={index.toString()} aria-hidden="true">{track}</label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="select-box">
                <div className="select-box__current" tabIndex={2}>{
                    data[0].map((car: string, index: number) => (
                        <div className="select-box__value" key={nanoid()}>
                            <input
                                className="select-box__input"
                                type="radio"
                                id={(index+1000).toString()}
                                value={index+1000}
                                name="car"
                                data-name={car}
                                checked={selectedCarOption === index+1000}
                                onChange={handleCarOptionChange}
                            />
                            <p className="select-box__input-text">{car}</p>
                        </div>
                    ))}
                    <img
                        className="select-box__icon"
                        src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                        alt="Arrow Icon"
                        aria-hidden="true"
                    />
                </div>
                <ul className="select-box__list">{
                    data[0].map((car: string, index: number) => (
                        <li key={nanoid()}>
                            <label className="select-box__option" htmlFor={(index+1000).toString()} aria-hidden="true">{car}</label>
                        </li>
                    ))}
                </ul>
            </div>
            <button className="submit" type="submit">Search</button>
        </form>}
        {isError && <span className="error">{error}</span>}
        {isLoading && <span className="loading">Loading...</span>}
        </>
    )
}