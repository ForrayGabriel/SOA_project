import css from "./MilkSell.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MilkSell(props) {

    var price = props.milk * 10

    const sellMilk = async () => {
        axios.get("http://localhost:3000/sellMilk")
    }   

    return (
        <div className="MilkSell">
            <button onClick={sellMilk} className="MilkButton">Sell {Intl.NumberFormat().format(props.milk)} Liters of milk for {Intl.NumberFormat().format(price)} $</button>
        </div>
    )
}