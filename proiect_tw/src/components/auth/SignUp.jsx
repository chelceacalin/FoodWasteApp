import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from '../../firebase.js'


const SignUp = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const createAccount=(e)=>{
            e.preventDefault();
            createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
    console.log( userCredential);
            }).catch((err)=>{console.log("Error: " + err)});
    }

  return (
    <div className='sign-in-container'>
        <form onSubmit={createAccount}>
            <h1>Create An Account</h1>
            <input type="email" placeholder="Enter email" value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            ></input>
            <input type="password" placeholder="Enter your password" value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
            ></input>
            <button type="submit" >Sign Up</button>
        </form>

    </div>
  )
}

export default SignUp