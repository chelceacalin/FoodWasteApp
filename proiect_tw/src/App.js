import "./App.css";
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import AuthDetails from "./components/auth/AuthDetails";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SignIn/>
       {/* <SignUp/>
        <AuthDetails/> */}
      </header>
    </div>
  );
}

export default App;
