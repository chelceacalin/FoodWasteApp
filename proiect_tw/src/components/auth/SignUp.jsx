import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from '../../firebase.js'


const SignUp = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
    const[address,setAddress]=useState('');
    const[phone,setPhone]=useState('');
  
    const signUp = (e) => {
      e.preventDefault();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    return (
      <div className="login-box">
         <h1>Create Account</h1>
        <form onSubmit={signUp}>
         
        <div className="user-box">
        <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
      <label>Email</label>
    </div>

<input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>



<input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></input>
<input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></input>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  };
  
  export default SignUp;