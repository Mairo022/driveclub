import {ReactElement, useEffect, useState} from "react";
import "./style/selectBox.scss";
import { tracksCars } from "./data/mockStats";
import { nanoid } from "nanoid";
import {ISelectBoxProps, ITracksCars, ITracksCarsExtracted} from "./types/stats";

export default function SelectBox(props: ISelectBoxProps): ReactElement {
    const {cars, tracks} = extractTracksCars(tracksCars)
    const {setCar, setTrack} = props

    const [selectedTrackOption, setSelectedTrackOption] = useState<number>(1)
    const [selectedCarOption, setSelectedCarOption] = useState<number>(1000)
    const [selectedTrack, setSelectedTrack] = useState<string>("")
    const [selectedCar, setSelectedCar] = useState<string>("")

    const handleTrackOptionChange = (e: any): void => {
        setSelectedTrack(e.target.dataset.name)
        setSelectedTrackOption(parseInt(e.target.value))
    }

    const handleCarOptionChange = (e: any): void => {
        setSelectedCar(e.target.dataset.name)
        setSelectedCarOption(parseInt(e.target.value))
    }

    function extractTracksCars(data: ITracksCars[]): ITracksCarsExtracted {
        let tracks: string[] = []
        let cars: string[] = []

        data.forEach(item => {
            tracks.push(item.track)
            cars.push(...item.cars.flat())
        })
        cars = [...new Set(cars)]

        return {tracks, cars}
    }

    function handleSearch(e: any): void {
        setCar(selectedCar)
        setTrack(selectedTrack)
        e.preventDefault()
    }

    useEffect(() => {
        setSelectedCar(cars[selectedCarOption - 1000])
        setSelectedTrack(tracks[selectedTrackOption])
    }, [])

    return (
        <form onSubmit={handleSearch} className="search">
            <div className="select-box">
                <div className="select-box__current" tabIndex={1}>{
                    tracks.map((track, index) => (
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
                    tracks.map((track, index) => (
                        <li key={nanoid()}>
                            <label className="select-box__option" htmlFor={index.toString()} aria-hidden="true">{track}</label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="select-box">
                <div className="select-box__current" tabIndex={2}>{
                    cars.map((car, index) => (
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
                    cars.map((car, index) => (
                        <li key={nanoid()}>
                            <label className="select-box__option" htmlFor={(index+1000).toString()} aria-hidden="true">{car}</label>
                        </li>
                    ))}
                </ul>
            </div>
            <button className="submit" type="submit">Search</button>
        </form>
    )
}