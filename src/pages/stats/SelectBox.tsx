import {ReactElement, useEffect, useState} from "react";
import "./style/selectBox.scss";
import {useFetch} from "../../hooks/useFetch";
import {getCars, getTracks} from "../../services/statsService";

export default function SelectBox(props: ISelectBoxProps): ReactElement {
    const {setCarTrack, car, track} = props

    const [selectedTrackOption, setSelectedTrackOption] = useState<number>(1)
    const [selectedCarOption, setSelectedCarOption] = useState<number>(1000)
    const [selectedTrack, setSelectedTrack] = useState<string>(track ?? "")
    const [selectedCar, setSelectedCar] = useState<string>(car ?? "")

    const {data, isLoading, isSuccess, isError, error} = useFetch([
        {fn: getCars, params: [undefined]},
        {fn: getTracks, params: [undefined]}
    ])

    const [cars, tracks] = data ?? [];

    const handleTrackOptionChange = (e: any): void => {
        setSelectedTrack(e.target.dataset.name)
        setSelectedTrackOption(parseInt(e.target.value))
    }

    const handleCarOptionChange = (e: any): void => {
        setSelectedCar(e.target.dataset.name)
        setSelectedCarOption(parseInt(e.target.value))
    }

    function handleSearch(e: any): void {
        setCarTrack(selectedCar, selectedTrack)
        e.preventDefault()
    }

    function setCarTrackValues() {
        if (car) setSelectedCarOption(cars.indexOf(car) + 1000)
        if (track) setSelectedTrackOption(tracks.indexOf(track))

        if (!car) setSelectedCar(cars[selectedCarOption - 1000])
        if (!track) setSelectedTrack(tracks[selectedTrackOption])
    }

    useEffect(() => {
        if (!data) return
        setCarTrackValues()
    }, [data, car, track])

    return (<>
        {isSuccess &&
        <form onSubmit={handleSearch} className="search">
            <div className="select-box">
                <div className="select-box__current" tabIndex={1}>{
                    tracks.map((track: string, index: number) => (
                        <div className="select-box__value" key={index}>
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
                    tracks.map((track: string, index: number) => (
                        <li key={index}>
                            <label className="select-box__option" htmlFor={index.toString()} aria-hidden="true">{track}</label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="select-box">
                <div className="select-box__current" tabIndex={2}>{
                    cars.map((car: string, index: number) => (
                        <div className="select-box__value" key={index}>
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
                    cars.map((car: string, index: number) => (
                        <li key={index}>
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