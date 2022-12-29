import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import "./LeftMenu.css"
const LeftMenu = (props) => {
    return (
        <div className="leftMenu">
            <div className="leftMenuProfile">
                <img src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" />
                <p>Welcome, NAME</p>
                <button className="button-35">Edit profile</button>
                <button className="button-35" onClick={props.addProduct}>Add product</button>
            </div>
            <hr />
            <div className="leftMenuFilter">
                <button className="button-35">Carne</button>
                <button className="button-35">Fructe</button>
                <button className="button-35">Legume</button>
            </div>
            <div className="leftMenuOptions">
                <button className="button-35" onClick={props.handleSignOut}>Sign out</button>
            </div>
        </div>
    );
}

export default LeftMenu;