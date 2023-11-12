import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.js';
import "./AuthDetails.css";
import LeftMenu from "./LeftMenu.jsx";
import RightContent from "./RightContent.jsx";


const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [filter, setFilter] = useState('none');
  const [owningFilter, setOwningFilter] = useState('none');
  const [availableFilter, setAvailableFilter] = useState('none');
  const navigate = useNavigate();


  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user) {
          setAuthUser(user);
          // console.log("Logat: " +user);  
          // console.log(user);

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
    navigate('../addProduct ', { replace: true })
  }

  const navToProduseleMele = () => {

  }

  return (
    <div className="mainPageContainer">
      {authUser ? (
        <>
          {/* <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button> */}
          <LeftMenu handleSignOut={userSignOut} addProduct={navToAddProduct}
            setFilter={setFilter}
            filter={filter}
            availableFilter={availableFilter}
            setAvailableFilter={setAvailableFilter}
            user={authUser} />
          <RightContent toateprodusele={() => { navigate('../authenticated', { replace: true }) }} navToProduseleMele={navToProduseleMele}
            filter={filter}
            setOwningFilter={setOwningFilter}
            owningFilter={owningFilter}
            availableFilter={availableFilter} />
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;