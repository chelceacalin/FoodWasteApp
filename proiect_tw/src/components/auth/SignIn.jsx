import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import jwt_decode from "jwt-decode";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();



let signInWithGoogleAPP=()=>{
  signInWithPopup(auth,provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
     const token = credential.accessToken;

    // // The signed-in user info.
    const user = result.user;
    console.log(auth.currentUser.uid,auth.currentUser.email,auth.currentUser.displayName);


    let slicedSub=auth.currentUser.uid;
    const urlToCheckIfExistsAlready = "http://localhost:3030/api/newUserSub/" + slicedSub;
    console.log("Url: "+urlToCheckIfExistsAlready);
     let exists = 0;

       axios
              .get(urlToCheckIfExistsAlready, {})
              .then((data) => {
               // console.log(data.data);
                if (data.data.id > 0) {
                  exists = 1;
                  console.log("Exists already: " + exists);
                } else {
                  exists = 0;
                  if (exists === 0) {
                   console.log("Exists Account Created: " + exists);
                    const addRecordEndpoint =
                      "http://localhost:3030/api/newUserSub/";
                    axios
                      .post(addRecordEndpoint, { sub: slicedSub })
                      .then(function (response) { })
                      .catch(function (error) {
                        alert("Error when creating new user " + error.message);
                      });

                    const addRecordEndpoint_USERS =
                      "http://localhost:3030/api/users/";
                    let accountUser = {
                      id: slicedSub,
                      email: auth.currentUser.email,
                      username: auth.currentUser.displayName,
                      address: "",
                      phone: "",
                      photoUrl: "",
                    };
                    axios
                      .post(addRecordEndpoint_USERS, accountUser)
                      .then(function (response) {
                        alert("Account Created");
                      })
                      .catch(function (error) { });
                  } else {
                    console.log("Should be created, exists: " + exists);
                  }
                }
              })
              .catch((err) => {
                console.log("Didn't Find: " + err);
              });

   // console.log(auth.currentUser.uid);
    navigate("../authenticated", { replace: true });
    }).catch((error) => {
    console.log("Err:" +error);
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
}




  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("../authenticated", { replace: true });
      })
      .catch((err) => {
        if (password.length <= 6) {
          alert("Password must be at least 6 characters");
        }
        console.log("Error: " + err);
      });
  };

  return (
    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={signIn}>
        <div className="user-box">
          <input
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <label>Email</label>
        </div>

        <div className="user-box">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <label>Password</label>
        </div>

        <div className="user-box">
          <a id="CreateAccount" href="/signUp">
            Create an account{" "}
          </a>
        </div>

        <div className="user-box">
          <a id="CreateAccount" href="/forgotPassword">
            Forgot Password{" "}
          </a>
        </div>

        <a href="#" onClick={  signIn}>
          Submit
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </a>
        <a href="#" onClick={  signInWithGoogleAPP} style={{marginLeft:25}}>
          Login With Google
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </a>
      </form>
    </div>
  );
};

export default SignIn;
