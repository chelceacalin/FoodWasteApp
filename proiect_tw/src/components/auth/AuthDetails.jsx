import { useEffect,useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from '../../firebase.js'
import { useNavigate } from 'react-router-dom';


const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);
    const navigate = useNavigate();

   
    useEffect(() => {
      const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
          setAuthUser(user);
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
  
    return (
      <div>
        {authUser ? (
          <>
            <p>{`Signed In as ${authUser.email}`}</p>
            <button onClick={userSignOut}>Sign Out</button>
          </>
        ) : (
          <p>Signed Out</p>
        )}
      </div>
    );
  };
  
  export default AuthDetails;