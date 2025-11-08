import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./output.css";   // ✅ only this one

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
