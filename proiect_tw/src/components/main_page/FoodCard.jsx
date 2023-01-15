import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import LeftMenu from "./LeftMenu.jsx";
import "./AuthDetails.css"
import RightContent from "./RightContent.jsx";
import "./FoodCard.css"
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import axios from "axios";
import { Product, ProductStatus } from "../../models/product.js";


const FoodCard = (p) => {
    let statusList = ['reserved', 'available', 'sold']

    let ProductId = p.product.id
    console.log(ProductId);
    const stabilesteExpirare = (date) => {
        let currentDate = new Date();
        //daca ziua de azi e mai mare ca cea a produsului atunci sigur e expirat
        if (currentDate >= date) {
            return 'textContentRed';
        }
        //altfel inseamna ca data > data1 si luam care e diferenta 
        let diffTime = date - currentDate;
        let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 4) {
            return 'textContentYellow';
        }
        return 'textContentGreen'
    }

    const rezervaProdus = (prop) => {
        console.log(prop)
        let newProduct = prop.product;
        newProduct.status = 0;
        axios.put("http://localhost:3030/api/products/" + newProduct.id, newProduct).then(() => {
            prop.stateModified();
        })
    }

    const setButtonStyle = (currentUserId, productUserId, productStatus) => {
        if (currentUserId === productUserId || productStatus === 0 || productStatus === 2) {
            console.log(currentUserId)
            console.log(productUserId)
            return true;
        }
        return false;
    }

    return (
        <div className="foodCard">
            <div className={`reservedStatus ${statusList[p.product.status]}`}>
                {p.product.category}
            </div>
            <img src={p.product.photoURL !== 'Empty' ? p.product.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg'} />
            <p>{p.product.description}</p>
            <p className="textContent">Donator: {p.user.username}</p>
            <p className="textContent">Cantitate: {p.quantity.units}, {p.quantity.type}</p>
            <p className={stabilesteExpirare(Date.parse(p.product.expDate))}>Expiration date: {p.product.expDate.substring(0, 10)}</p>
            <p className="textContent">Locatie: {p.product.address}</p>
            <p className="textContent">Telefon: {p.user.phone}</p>
            <button className={setButtonStyle(auth.currentUser.uid, p.product.idUser, p.product.status) ? 'bookingButtonDisabled' : ''} onClick={() => rezervaProdus(p)}>Rezerva</button>

            <FacebookShareButton
                url={"http://localhost:3000/authenticated/" + ProductId}
                quote={"Vizionati Produsul Meu"}
                hashtag={"#hashtag"}
                description={"aiueo"}
                className="Demo__some-network__share-button"
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <br />

        </div>
    )
}

export default FoodCard;