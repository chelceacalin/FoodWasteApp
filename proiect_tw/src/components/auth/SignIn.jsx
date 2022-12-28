import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from '../../firebase.js'
import { useNavigate } from 'react-router-dom';
const SignIn = () => {
  const navigate = useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');


    const signIn=(e)=>{
            e.preventDefault();
            signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
           
              navigate('../authenticated', { replace: true });
            }).catch((err)=>{
              if(password.length<=6){
                  alert("Password must be at least 6 characters");
              }
              console.log("Error: " + err)
            
            });
    }

  return (
    <div className="login-box">
       <h2>Login</h2>
        <form onSubmit={signIn}>
      
    <div className="user-box">
    <input type="text" placeholder="Enter your email" value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            ></input>
      <label>Email</label>
    </div>


    <div className="user-box">
    <input type="password" placeholder="Enter your password" value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            ></input>
      <label>Password</label>
    </div>

    <div className="user-box">
         <a id="CreateAccount" href="/signUp" >Create an account </a>
    </div>

    <div className="user-box">
         <a id="CreateAccount" href="/forgotPassword" >Forgot Password </a>
    </div>

    <a href="#" onClick={signIn}>
         Submit
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </a>
        </form>
    </div>
  )
}

export default SignIn