import React, { useState } from "react";
import "./Client-List.css"; // Import the dark theme CSS
import { useNavigate } from "react-router-dom";

const ClientList = () => {
  const navigate = useNavigate();

  const goToGuest = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/guests")
    }, 1000);
  };

  const goToClientele = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/")
    }, 1000);
  };
  

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Navigator</h2>
        <button onClick={goToGuest}>Guest List</button>
        <button onClick={goToClientele}>Clientele Management</button>
      </div>
    </div>
  );
};

export default ClientList;
