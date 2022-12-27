import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from '../../firebase.js'


const SignIn = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const signIn=(e)=>{
            e.preventDefault();
            signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
    console.log("User credentials: " + userCredential);
            }).catch((err)=>{console.log("Error: " + err)});
    }

  return (
    <div className='sign-in-container'>
        <form onSubmit={signIn}>
            <h1>Log In To Your Account</h1>
            <input type="email" placeholder="Enter email" value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            ></input>
            <input type="password" placeholder="Enter your password" value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            ></input>
            <button type="submit" >Log In</button>
        </form>

    </div>
  )
}

export default SignIn