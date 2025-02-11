import React, { useState } from "react";
import "./Navigator.css"; // Import the dark theme CSS
import { useNavigate } from "react-router-dom";

const Navigator = () => {
  const navigate = useNavigate();

  const goToHotel = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/admin")
    }, 1000);
  };

  const goToClientele = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/clientlist")
    }, 1000);
  };
  

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Navigator</h2>
        <button onClick={goToHotel}>Hotel System</button>
        <button onClick={goToClientele}>Clientele Management</button>
      </div>
    </div>
  );
};

export default Navigator;
