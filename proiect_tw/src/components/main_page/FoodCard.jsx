import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import LeftMenu from "./LeftMenu.jsx";
import "./AuthDetails.css"
import RightContent from "./RightContent.jsx";
import "./FoodCard.css"
const FoodCard = () => {
    return (
        <div className="foodCard">
            <div className="reservedStatus">
                TipMancare
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg" />
            <p>Titlu Mancare</p>
            <p>Donator: User1234
                Cantitate: 2 u.m: kg
                Expiration date: 20/10/22
                Locatie: Bucuresti Sector 6
                Telefon: 0766778899</p>
            <button>Rezerva</button>
        </div>
    )
}

export default FoodCard;