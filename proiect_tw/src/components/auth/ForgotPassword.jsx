import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


function ForgotPassword() {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const navigate = useNavigate();

  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
     setEmail("An email has been sent to your email address");
     setTimeout(function () {
        navigate('../', { replace: true })
         
    }, 5000);
  };

  return (
    <div className="login-box">
      <h2>Recover Password</h2>
      <form onSubmit={triggerResetEmail}>
        <div className="user-box"  style = {{marginTop : 65 }}>
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
        <a href="#" onClick={triggerResetEmail}  style = {{marginLeft : 65 }}>
        Send Email
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </a>
      </form>
      <br></br>
      <br>
      </br>
      <a id="alreadyHaveAccount" href="/" style = {{marginLeft : 90 }}>Go To Main Page</a>

    </div>
  );
}

export default ForgotPassword;
