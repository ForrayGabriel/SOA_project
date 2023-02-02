import React, { useState, useEffect } from 'react';
import axios from "axios";

import TopBar from '../components/TopBar';
import Cow from '../components/Cow';
import MilkSell from '../components/MilkSell';
import Weather from '../components/Weather';

import css from './HomePage.css';
import BuyCow from '../components/BuyCow';

const TopBarIn = React.lazy(() => import('app2/Welcome'));

function HomePage() {

  const disconnect = () => {
    // Remove the token from the localStorage
    localStorage.removeItem("token");
    // Redirect the user to the login page
    window.location.href = '/'
  }

  const [cows, setCows] = useState([])
  const [time, setTime] = useState(Date.now());
  const [money, setMoney] = useState(0)
  const [milk, setMilk] = useState(0)
  const [cowPrice, setCowPrice] = useState(0)

  const fetchData = async () => {
    const cows_response = await axios.get("http://localhost:3000/getCows").then(function (response) {
      setCows(response.data)
      setCowPrice(response.data.length * 1000);
      return response.data;
    }).catch(function (error) {
      console.log("Premiere errueru", error);
    });
    const milk_response = await axios.get("http://localhost:3000/milk").then(function (response) {
      setMilk(response.data)
    }).catch(function (error) {
      console.log(error);
    });
    const money_response = await axios.get("http://localhost:3000/money").then(function (response) {
      setMoney(response.data)
    }).catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
        .then((res) => { })
        .catch((e) => {
          console.log("ERROR", e.message)
        });
    }, 100);
    return () => clearInterval(interval);
  }, [])

  return (
    <div>
      <TopBar money={money} milk={milk} />

      <button onClick={disconnect}>Disconnect</button><br />
      <div>
        <Weather />
      </div>
      <div className="HomePageGrid">
        <MilkSell milk={milk} />
        <BuyCow price={cowPrice} money={money}/>
      </div>

      <div>
        {cows.map((cow) => (
          <Cow cow={cow} money={money} />
        ))}
      </div>

      


    </div>
  );
}
export default HomePage;