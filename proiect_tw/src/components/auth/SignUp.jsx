import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import auth from "../../firebase.js";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const InsertUserIntoDb = async (ID, email, username, address, phone) => {

    const addRecordEndpoint = "http://localhost:3030/api/users/";

    let accountUser = {
      id: ID,
      email: email,
      username: username,
      address: address,
      phone: phone,
      photoUrl: ""
    };

    axios.post(addRecordEndpoint, accountUser)
      .then(function (response) {
        alert("Account Created");
      })
      .catch(function (error) {
      });

  }

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        InsertUserIntoDb(userCredential.user.uid, email, username, address, phone);
        console.log(userCredential.user.uid);
        navigate('../authenticated', { replace: true })
      }).then(() => {
      })
      .catch((error) => {
        if (username.length < 5) {
          alert("Username Length must be greater than 5 characters")
        }
        if (phone.length !== 10) {
          alert("Phone Length must be 10 characters");
        }
        if (password.length < 6) {
          alert("Password Length must be at least 6 characters");
        }
        console.log(error);
      });
  };

  return (
    <div className="login-box">
      <h1 id="textColorForLoginCreate">Create Account</h1>
      <form onSubmit={signUp}>
        <div className="user-box">
          <input
            type="text"
            placeholder="Enter your username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Email</label>
        </div>

        <div className="user-box">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>

          <label>Username</label>
        </div>

        <div className="user-box">
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>

          <label>Address</label>
        </div>

        <div className="user-box">
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>

          <label>Phone Number</label>
        </div>

        <div className="user-box">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>

          <label>Password</label>
        </div>


        <a href="#" onClick={signUp}>
          Sign Up
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </a>

        <br></br>
        <br></br>
        <br></br>
        <a id="alreadyHaveAccount" href="/">Already have an account?</a>

      </form>
    </div>
  );
};

export default SignUp;
