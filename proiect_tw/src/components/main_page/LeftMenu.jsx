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
                <p>Welcome, </p>
                <button className="button-35">Edit profile</button>
                <button className="button-35" onClick={props.addProduct}>Add product</button>
            </div>
            <hr />
            <div className="leftMenuFilter">
                <p>Filtreaza</p>
                <button className="button-35" onClick={() => { props.setFilter('none') }} style={{ backgroundColor: '#999999' }}>Reset Filter</button>
                <button className="button-35" onClick={() => { props.setFilter('Carne') }}>Carne</button>
                <button className="button-35" onClick={() => { props.setFilter('Fructe') }}>Fructe</button>
                <button className="button-35" onClick={() => { props.setFilter('Legume') }}>Legume</button>
                <p>Filtreaza disponibilitatea</p>
                <button className="button-35" onClick={() => { props.setAvailableFilter('none') }} style={{ backgroundColor: '#999999' }}>Reset Filter</button>
                <button className="button-35" onClick={() => { props.setAvailableFilter('available') }}>Disponibile</button>
                <button className="button-35" onClick={() => { props.setAvailableFilter('reserved') }}>Rezervate</button>
                <button className="button-35" onClick={() => { props.setAvailableFilter('sold') }}>Vandute</button>
            </div>
            <div className="leftMenuOptions">
                <button className="button-35" onClick={props.handleSignOut}>Sign out</button>
            </div>
        </div>
    );
}

export default LeftMenu;