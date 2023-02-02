import css from "./Cow.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Cow({ cow, money }) {

    const [time, setTime] = useState(Date.now());
    const [up, setUp] = useState(false);

    var price = cow.level ** 2 * 100;

    const imgs = ["https://appadvice.com/cdn-cgi/mirage/eaec890b32ee033953d1542683469dcff009881bb0833aa6a0a8b9f19c50cef4/1280/https://is5-ssl.mzstatic.com/image/thumb/Purple1/v4/55/de/4b/55de4b06-994a-53cd-58d7-b3f0db809904/source/256x256bb.jpg",
        "https://styles.redditmedia.com/t5_38aop/styles/communityIcon_2o616mjoz3m61.png",
        "https://m.media-amazon.com/images/I/61ljQ6oHFbL._CR0,560,961,961_UX256.jpg",
        "https://pbs.twimg.com/profile_images/734556699059687432/LZd5glw6_400x400.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNL9ekeq00uWq0cZzgUPWbnHK-giEYBzaXtw&usqp=CAU"]

    const this_img = imgs[cow.id % 5]

    const MilkCow = () => {
        axios.put("http://localhost:3000/milkCow", { id: cow.id })
    }

    const LevelUp = () => {
        setUp(!up);
        axios.put('http://localhost:3000/money', { amount: -price })
            .then(() => {
                axios.put('http://localhost:3000/addLevel', { id: cow.id })
            });
    }

    var next_milked = new Date(new Date(cow.last_milked).getTime() + 1000 * 15 * cow.level);
    var CowMilking;

    if (next_milked < new Date()) {
        CowMilking = <div className="CowNextMilked">
            <button className="CowButton" onClick={MilkCow}>Milk !</button>
        </div>;
    } else {
        CowMilking = <div className="CowNextMilked">
            Next milking in {Math.floor((next_milked.getTime() - new Date().getTime()) / 60000)} : {Math.floor((next_milked.getTime() - new Date().getTime()) / 1000) % 60}
        </div>;
    }

    var CowFeed;

    if (price > money) {
        CowFeed = <div className="CowFeed">
            <button className="CowButton" disabled>Price : {Intl.NumberFormat().format(price)} $</button>
        </div>;
    } else {
        CowFeed = <div className="CowFeed">
            <button className="CowButton" onClick={LevelUp}>Price : {Intl.NumberFormat().format(price)} $ <br />Feed !</button>
        </div>;
    }

    return <div className='CowGrid'>
        <img src={this_img} alt={cow.name} />
        <div className="CowName">{cow.name}</div>
        <div className="CowLevel">Level : {cow.level}</div>
        {CowMilking}
        {CowFeed}
    </div>;
}
