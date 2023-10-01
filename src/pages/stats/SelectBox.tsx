import { ReactElement, useState } from "react";
import "./style/selectBox.scss";
import { tracksCars } from "./data/mockStats";
import { nanoid } from "nanoid";

export default function SelectBox(): ReactElement {
    const [selectedTrackOption, setSelectedTrackOption] = useState<string>('1')
    const [selectedCarOption, setSelectedCarOption] = useState<string>('1000')
    const [selectTrackName, setSelectedTrackName] = useState<string>()
    const [selectCarName, setSelectedCarName] = useState<string>()

    const {cars, tracks} = extractTracksCars(tracksCars)

    const handleTrackOptionChange = (e): void => {
        setSelectedTrackName(e.target.dataset.name)
        setSelectedTrackOption(e.target.value)
    }

    const handleCarOptionChange = (e): void => {
        setSelectedCarName(e.target.dataset.name)
        setSelectedCarOption(e.target.value)
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

    function handleSearch(e) {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSearch} className="search">
            <div className="select-box">
                <div className="select-box__current" tabIndex="1">{
                    tracks.map((track, index) => (
                        <div className="select-box__value" key={nanoid()}>
                            <input
                                className="select-box__input"
                                type="radio"
                                id={index}
                                value={index}
                                name="track"
                                data-name={track}
                                checked={selectedTrackOption == index}
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
                            <label className="select-box__option" htmlFor={index} aria-hidden="aria-hidden">{track}</label>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="select-box">
                <div className="select-box__current" tabIndex="1">{
                    cars.map((car, index) => (
                        <div className="select-box__value" key={nanoid()}>
                            <input
                                className="select-box__input"
                                type="radio"
                                id={index+1000}
                                value={index+1000}
                                name="car"
                                data-name={car}
                                checked={selectedCarOption == index+1000}
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
                            <label className="select-box__option" htmlFor={index+1000} aria-hidden="aria-hidden">{car}</label>
                        </li>
                    ))}
                </ul>
            </div>
            <button className="submit" type="submit">Search</button>
        </form>
    )
}