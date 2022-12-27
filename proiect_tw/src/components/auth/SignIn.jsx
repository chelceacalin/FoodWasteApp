import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from '../../firebase.js'


const SignIn = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const signIn=(e)=>{
            e.preventDefault();
            signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
    //console.log("User credentials: " + userCredential);
    console.log("User id: " + userCredential['user']);
    // create user id
  
            }).catch((err)=>{console.log("Error: " + err)});
    }

  return (
    <div className="login-box">
       <h2>Login</h2>
        <form onSubmit={signIn}>
        <div className="user-box">
      <input type="email" placeholder="Enter email" value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            ></input>
      <label>Username</label>

    </div>
    <div className="user-box">
    <input type="password" placeholder="Enter your password" value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            ></input>
      <label>Password</label>
    </div>


    <div className="user-box">
         <a id="CreateAccount" href="#" >Create an account </a>
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