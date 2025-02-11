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

  const goToCompany = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/company")
    }, 1000);
  };
  

  return (
    <div className="list-container">
      <div className="login-form">
        <h2>Navigator</h2>
        <button onClick={goToGuest}>Guest List</button>
        <button onClick={goToCompany}>Company List</button>
      </div>
    </div>
  );
};

export default ClientList;
