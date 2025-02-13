import React, { useState } from "react";
import "./Client-List.css"; // Import the dark theme CSS
import { useNavigate } from "react-router-dom";

const ClientList = () => {
  const navigate = useNavigate();

  const goToGuest = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/guestlist")
    });
  };

  const goToCompany = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/companylist")
    });
  };
  
  const goToAgents = () => {
    setTimeout(() => {
      navigate("/agentlist")
    });
  };

  const goToGroups = () => {
    setTimeout(() => {
      navigate("/grouplist")
    });
  };

  const goToMain = () =>
  {
    navigate("/navigator")
  }

  return (
    <div className="list-container">
      <div className="login-form">
        <h2>Navigator</h2>
        <button onClick={goToGuest}>Guest List</button>
        <button onClick={goToCompany}>Company List</button>
        <button onClick={goToAgents}>Agents List</button>
        <button onClick={goToGroups}>Groups List</button>
        <button onClick={goToMain}>Main Menu</button>
      </div>
    </div>
  );
};

export default ClientList;
