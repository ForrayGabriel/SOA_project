import css from "./Weather.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Weather() {

    const [temp, setTemp] = useState(0);
    const [condition_text, setCondition_text] = useState("");
    const [condition_icon, setCondition_icon] = useState("");

    const fetchData = async () => {
        console.log("fetchDataSSSSSSSSSs")
        const weather_response = await axios.get("http://api.weatherapi.com/v1/current.json?key=40213a5ee84d4b4383a141521233101&q=Cluj&aqi=no")
        .then(function (response) {
            console.log(response.data)
            setTemp(response.data.current.temp_c)
            setCondition_text(response.data.current.condition.text)
            setCondition_icon("https:" + response.data.current.condition.icon)
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log("useEffecZZZZt")
        const interval = setInterval(() => {
            fetchData()
        }, 1000*60*15);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="Weather">
            Today's weather in Cluj : {temp} °C, {condition_text}
            <img id="image" src={condition_icon} />
        </div>
    )
}