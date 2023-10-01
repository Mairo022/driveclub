import {ReactElement} from "react";
import "./style/selectBox.scss";

export default function SelectBox(): ReactElement {
    return (
        <div className="select-box">
            <div className="select-box__current" tabIndex="1">
                <div className="select-box__value">
                    <input className="select-box__input" type="radio" id="0" value="1" name="Ben" checked="checked"/>
                    <p className="select-box__input-text">Cream</p>
                </div>
                <div className="select-box__value">
                    <input className="select-box__input" type="radio" id="1" value="2" name="Ben"/>
                    <p className="select-box__input-text">Cheese</p>
                </div>
                <img className="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                     alt="Arrow Icon" aria-hidden="true"/>
            </div>
            <ul className="select-box__list">
                <li><label className="select-box__option" htmlFor="0" aria-hidden="aria-hidden">Cream</label></li>
                <li><label className="select-box__option" htmlFor="1" aria-hidden="aria-hidden">Cheese</label></li>
                <li><label className="select-box__option" htmlFor="2" aria-hidden="aria-hidden">Milk</label></li>
                <li><label className="select-box__option" htmlFor="3" aria-hidden="aria-hidden">Honey</label></li>
                <li><label className="select-box__option" htmlFor="4" aria-hidden="aria-hidden">Toast</label></li>
            </ul>
        </div>
    )
}