import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
//364872884822-hu8bo91umkdk2bul4g0bfr4tvo80dl2d.apps.googleusercontent.com
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <GoogleOAuthProvider clientId="364872884822-hu8bo91umkdk2bul4g0bfr4tvo80dl2d.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
);

