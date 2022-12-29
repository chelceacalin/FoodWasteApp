import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import './RightContent.css'
const RightContent = () => {
    return (
        <div className="rightContent">
            <div className="rightContentMenu">
                <button>Toate produsele</button>
                <button>Produsele mele</button>
                <button> Produse rezervate</button>
            </div>
            <div className="rightContentInfo">
                Momentan nimic
            </div>
        </div>
    )
}

export default RightContent