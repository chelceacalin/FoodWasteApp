import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import LeftMenu from "./LeftMenu.jsx";
import "./AuthDetails.css"
import RightContent from "./RightContent.jsx";
import "./FoodCard.css"
const FoodCard = (p) => {
    let statusList = ['reserved', 'available', 'sold']
    return (
        <div className="foodCard">
            <div className={`reservedStatus ${statusList[p.status]}`}>
                {p.category}
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg" />
            <p>{p.description}</p>
            <p className="textContent">Donator: {p.user.username}</p>
            <p className="textContent">Cantitate: {p.quantity.units}, {p.quantity.type}</p>
            <p className="textContent">Expiration date: {p.expDate.substring(0, 10)}</p>
            <p className="textContent">Locatie: {p.address}</p>
            <p className="textContent">Telefon: {p.user.phone}</p>
            <button>Rezerva</button>
        </div>
    )
}

export default FoodCard;