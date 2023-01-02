import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import "./LeftMenu.css"
import axios from "axios";
const LeftMenu = (props) => {
    const navigate = useNavigate();
    //console.log("Ce"+auth.currentUser.uid);
    let [numeUtilizator, setNumeUtilizator] = useState('')

    const getNumeUser = async () => {
        const dataFromAxios = await axios.get('http://localhost:3030/api/users/' + auth.currentUser.uid);
        //console.log(dataFromAxios.data.username.split(" ")[0]);
        setNumeUtilizator(dataFromAxios.data.username.split(" ")[0]);
    }

    useEffect(() => {
        getNumeUser();
    }, [])

    //console.log(numeUtilizator);

    const editProfile=()=>{
        navigate("../editProfile", { replace: true,state: auth.currentUser.uid});
    }

    return (
        <div className="leftMenu">
            <div className="leftMenuProfile">
                <img src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" />
                <p>Welcome,<span style={{ color: '#e3a1ff' }}> {numeUtilizator} </span> </p>
                <button className="button-35" onClick={editProfile}>Edit profile</button>
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