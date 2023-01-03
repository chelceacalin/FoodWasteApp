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

    const stabilesteExpirare = (date) => {
        let date1 = new Date();
        //daca ziua de azi e mai mare ca cea a produsului atunci sigur e expirat
        if (date1 >= date) {
            return 'textContentRed';
        }
        //altfel inseamna ca data > data1 si luam care e diferenta 
        let diffTime = date - date1;
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 4) {
            return 'textContentYellow';
        }
        return 'textContentGreen'
    }

    return (
        <div className="foodCard">
            <div className={`reservedStatus ${statusList[p.status]}`}>
                {p.category}
            </div>
            <img src={p.photoURL !== 'Empty' ? p.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg'} />
            <p>{p.description}</p>
            <p className="textContent">Donator: {p.user.username}</p>
            <p className="textContent">Cantitate: {p.quantity.units}, {p.quantity.type}</p>
            <p className={stabilesteExpirare(Date.parse(p.expDate))}>Expiration date: {p.expDate.substring(0, 10)}</p>
            <p className="textContent">Locatie: {p.address}</p>
            <p className="textContent">Telefon: {p.user.phone}</p>
            <button>Rezerva</button>
        </div>
    )
}

export default FoodCard;