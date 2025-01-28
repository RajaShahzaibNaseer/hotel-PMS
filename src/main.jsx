import React from "react";
import ReactDOM from "react-dom/client"; // React 18+ root rendering
import App from "./App"; // Import App.js component
import { BrowserRouter as Router } from "react-router-dom"; // Import Router

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <App /> {/* Render App component inside Router */}
    </Router>
  </React.StrictMode>
);
