import React, { useState } from "react";
import "./Client-List.css"; // Import the dark theme CSS
import { useNavigate } from "react-router-dom";

const ClientList = () => {
  const navigate = useNavigate();

  const goToGuest = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/guests")
    });
  };

  const goToCompany = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/company")
    });
  };
  
  const goToAgents = () => {
    setTimeout(() => {
      navigate("/agents")
    });
  };

  const goToGroups = () => {
    setTimeout(() => {
      navigate("/groups")
    });
  };

  return (
    <div className="list-container">
      <div className="login-form">
        <h2>Navigator</h2>
        <button onClick={goToGuest}>Guest List</button>
        <button onClick={goToCompany}>Company List</button>
        <button onClick={goToAgents}>Agents List</button>
      </div>
    </div>
  );
};

export default ClientList;
