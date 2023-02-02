import React, {useState} from 'react';
import css from './BuyCow.css';
import axios from 'axios';

export default function BuyCow(props) {

    const [name, setName] = useState([])

    var button;
 
    const buyCow = () => {
        axios.post("http://localhost:3000/buyCow", { name: name })
                .then(() => {
                    setName("")
                })
    }

    if (props.price > props.money) {
        button = <button onClick={buyCow} className="CowBuyButton" disabled="true">Buy a cow for {Intl.NumberFormat().format(props.price)} $</button>
    } else {
        button = <button onClick={buyCow} className="CowBuyButton">Buy a cow for {Intl.NumberFormat().format(props.price)} $</button>
    }

    return (
        <div className="BuyCow">
            <div className="CowBuyName grid_center">Name your cow : </div>
            <input className='CowBuyInput grid_center' type="text" value={name} onChange={e => setName(e.target.value)} />
            {button}
        </div>
    )
}