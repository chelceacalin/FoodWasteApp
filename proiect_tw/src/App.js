import "./App.css";
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import AuthDetails from "./components/main_page/AuthDetails";
import ForgotPassword from "./components/auth/ForgotPassword.jsx"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route exact path="/signUp" element={
              <>
                {<SignUp />}
              </>
            }>
            </Route>
            <Route exact path='/forgotPassword' element={<ForgotPassword />}></Route>
            <Route exact path='/authenticated' element={<AuthDetails />}></Route>
            <Route path='/' element={<SignIn />}>Index route</Route>
          </Routes>
        </Router>

      </header>
    </div>
  );
}

export default App;
