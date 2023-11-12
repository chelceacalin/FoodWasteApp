import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import auth, { storage } from '../../firebase.js';
import "./LeftMenu.css";
const LeftMenu = (props) => {
    const navigate = useNavigate();
    //console.log("Ce"+auth.currentUser.uid);
    let [numeUtilizator, setNumeUtilizator] = useState('');
    let [profilePic, setProfilePic] = useState(null);
    let [currentProfilePic, setCurrentProfilePic] = useState('');
    let [dataForUpdate, setDateForUpdate] = useState({});
    const getNumeUser = async () => {
        const dataFromAxios = await axios.get('http://localhost:3030/api/users/' + auth.currentUser.uid);
        setNumeUtilizator(dataFromAxios.data.username.split(" ")[0]);
        setDateForUpdate(dataFromAxios.data);
        setTimeout(setCurrentProfilePic(dataFromAxios.data.photoUrl),3000);
    }

    useEffect(() => {
        setTimeout(getNumeUser,1000);
      
    }, [])


    //console.log(numeUtilizator);
    const uploadImage = () => {
        if (profilePic == null) {
            return;
        }
        const imgRef = ref(storage, `ProfilePics/${v4() + '_' + profilePic.name}`);
        uploadBytes(imgRef, profilePic).then(() => {
            getDownloadURL(imgRef).then((res) => {

                setTimeout(   setCurrentProfilePic(res),2000);
             
                console.log(res);
                let copieDateUtilizator = JSON.parse(JSON.stringify(dataForUpdate));
                copieDateUtilizator.photoUrl = res;
                console.log(copieDateUtilizator, res);
                const linkUpdate = "http://localhost:3030/api/users/" + copieDateUtilizator.id
                axios.put(linkUpdate, copieDateUtilizator).catch(err => { console.log(err) });
            })
        })
    };
    const editProfile = () => {
        navigate("../editProfile", { replace: true, state: auth.currentUser.uid });
    }

    return (
        <div className="leftMenu">
            <div className="leftMenuProfile">
                <img src={currentProfilePic.length > 1 ? currentProfilePic : 'https://firebasestorage.googleapis.com/v0/b/proiecttw-84ef3.appspot.com/o/ProfilePics%2F1244141-200.png?alt=media&token=88ffe4ee-cb6a-4ab7-aad9-73da30ea92c2'} onClick={uploadImage} title="Click to upload image" />
                <br></br>
                <label htmlFor='file'>Select Photo</label>
                <input type="file" id='file' onChange={(event) => { setTimeout(   setProfilePic(event.target.files[0]),2000) }} />
                <p>Welcome,<span style={{ color: '#e3a1ff' }}> {numeUtilizator} </span> </p>
                <button className="button-35" onClick={editProfile}>Edit profile</button>
                <button className="button-35" onClick={props.addProduct}>Add product</button>
            </div>
            <hr />
            <div className="leftMenuFilter">
                <p>Filter</p>
                <button className="button-35" onClick={() => { props.setFilter('none') }} style={{ backgroundColor: '#999999' }}>Reset Filter</button>
                <button className="button-35" onClick={() => { props.setFilter('Meat') }} style={{ backgroundColor: props.filter === 'Meat' ? '#bff7ab' : '#ffffff' }}>Meat</button>
                <button className="button-35" onClick={() => { props.setFilter('Fruits') }} style={{ backgroundColor: props.filter === 'Fruits' ? '#bff7ab' : '#ffffff' }}>Fruits</button>
                <button className="button-35" onClick={() => { props.setFilter('Vegetables') }} style={{ backgroundColor: props.filter === 'Vegetables' ? '#bff7ab' : '#ffffff' }}>Vegetables</button>
                <p>Filter Availability</p>
                <button className="button-35" onClick={() => { props.setAvailableFilter('none') }} style={{ backgroundColor: '#999999' }}>Reset Filter</button>
                <button className="button-35" onClick={() => { props.setAvailableFilter('available') }} style={{ backgroundColor: props.availableFilter === 'available' ? '#bff7ab' : '#ffffff' }}>Available</button>
                <button className="button-35" onClick={() => { props.setAvailableFilter('reserved') }} style={{ backgroundColor: props.availableFilter === 'reserved' ? '#bff7ab' : '#ffffff' }}>Reverved</button>
                <button className="button-35" onClick={() => { props.setAvailableFilter('sold') }} style={{ backgroundColor: props.availableFilter === 'sold' ? '#bff7ab' : '#ffffff' }}>Donated</button>
            </div>
            <div className="leftMenuOptions">
                <button className="button-35" onClick={props.handleSignOut}>Sign out</button>
            </div>
        </div>
    );
}

export default LeftMenu;