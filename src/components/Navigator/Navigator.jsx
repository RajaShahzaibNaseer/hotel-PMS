import React, { useState } from "react";
import "./Navigator.css"; // Import the dark theme CSS
import { useNavigate } from "react-router-dom";

const Navigator = () => {
  const navigate = useNavigate();

  const goToHotel = () => {
    navigate("/admin")
  };

  const goToClientele = () => {
    navigate("/clientlist")
  };
  

  return (
    <div className="nav-container">
      <div className="login-form">
        <h2>Navigator</h2>
        <button onClick={goToHotel}>Hotel System</button>
        <button onClick={goToClientele}>Clientele Management</button>
      </div>
    </div>
  );
};

export default Navigator;
