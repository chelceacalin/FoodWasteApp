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
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
const FoodCard = (p) => {
    let statusList = ['reserved', 'available', 'sold']

    let ProductId = p.product.id
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

        try {
            console.log(prop)
            let newProduct = prop.product;
            newProduct.status = 0;
            axios.put("http://localhost:3030/api/products/" + newProduct.id, newProduct).then(() => {
                prop.stateModified();
            })


            let obj = {
                cineRezerva: auth.currentUser.uid,
                deLaCine: newProduct.idUser,
                productId: newProduct.id
            }

            axios.post("http://localhost:3030/api/reservations/", obj).then(() => {
            }).catch(err => { console.log(err) });
            console.log("ID PRODUS:" + newProduct.id, newProduct.idUser);
        }
        catch (err) {
            console.log(err);
        }

    }

    const vindeProdus = (e) => {
        let newProduct = p.product;
        if (e.target.checked) {
            newProduct.status = ProductStatus.SOLD;
        } else {
            newProduct.status = ProductStatus.RESERVED;
        }
        axios.put("http://localhost:3030/api/products/" + newProduct.id, newProduct).then(() => {
            p.stateModified();
        })
    }

    const setButtonStyle = (currentUserId, productUserId, productStatus) => {
        if (currentUserId === productUserId || productStatus === ProductStatus.RESERVED || productStatus === ProductStatus.SOLD) {
            return true;
        }
        return false;
    }

    const setButtonTooltipMessage = (currentUserId, productUserId, productStatus) => {
        if (currentUserId === productUserId) {
            return "You can't book your own products!"
        } else if (productStatus === ProductStatus.RESERVED) {
            return "The product is already reserved!"
        }
        else if (productStatus === ProductStatus.SOLD) {
            return "The product is already sold!"
        }
        else {
            return "Book this product"
        }
    }

    return (
        <div className="foodCard">
            <div className={`reservedStatus ${statusList[p.product.status]}`}>
                {p.product.category + ' - ' + statusList[p.product.status][0].toUpperCase() + statusList[p.product.status].substring(1)}
            </div>
            <img src={p.product.photoURL !== 'Empty' ? p.product.photoURL : 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg'} />
            <p>{p.product.description}</p>
            <p className="textContent">Donor: {p.user.username}</p>
            <p className="textContent">Quantity: {p.quantity.units}, {p.quantity.type}</p>
            <p className={stabilesteExpirare(Date.parse(p.product.expDate))}>Expiration date: {p.product.expDate.substring(0, 10)}</p>
            <p className="textContent">Location: {p.product.address}</p>
            <p className="textContent"> Phone:    {p.user.phone}</p>
            <div className="sellingContent" style={{
                visibility: (p.product.status === ProductStatus.RESERVED ||
                    p.product.status === ProductStatus.SOLD)
                    && auth.currentUser.uid === p.product.idUser ? 'visible' : 'hidden'
            }}>
                <label>Reservation complete?</label>
                <input type={'checkbox'} onChange={(e) => { vindeProdus(e) }} checked={p.product.status == ProductStatus.SOLD ? true : false}></input>
            </div>
            <Tippy content={setButtonTooltipMessage(auth.currentUser.uid, p.product.idUser, p.product.status)}>
                <div>
                    <button className={setButtonStyle(auth.currentUser.uid, p.product.idUser, p.product.status) ? 'bookingButtonDisabled' : ''} onClick={() => rezervaProdus(p)}>Reserve</button>
                </div>
            </Tippy>
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