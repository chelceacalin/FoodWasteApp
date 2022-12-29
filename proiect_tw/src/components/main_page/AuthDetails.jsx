import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
import LeftMenu from "./LeftMenu.jsx";
import "./AuthDetails.css"
import RightContent from "./RightContent.jsx";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user) {
          setAuthUser(user);
          // console.log("Logat: " +user);  
          //console.log(user);

        }

      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('../', { replace: true })
      })
      .catch((error) => console.log(error));
  };

  const navToAddProduct = () => {
    navigate('../', { replace: true })
  }

  const navToProduseleMele=()=>{

  }

  return (
    <div className="mainPageContainer">
      {authUser ? (
        <>
          {/* <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button> */}
          <LeftMenu handleSignOut={userSignOut} addProduct={navToAddProduct}   />
          <RightContent toateprodusele={()=>{  navigate('../authenticated', { replace: true })}}  navToProduseleMele={navToProduseleMele}  />
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;