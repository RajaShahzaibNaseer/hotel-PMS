import React, { useState } from "react";
import "./Agents.css";
import { useNavigate } from "react-router-dom";

const Groups = () => {
  const [formData, setFormData] = useState({
    groupName: "",
    associatedWith: "",
    fullName: "",
    email: "",
    phoneNo: "",
  });

  const navigate = useNavigate();


  const goToList = () => {
    navigate("/clientlist");
  }

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(`${e.target.name}: ${e.target.value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), 
      });
    
      const data = await response.json();
      console.log("Server Response:", data);
    } catch (error) {
      console.error("Error:", error.message);
    }
    
  };

  return (
    <div className="group-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Agent Data</h2>

        {/* Group Name */}
        <div className="input-group">
          <label>Group Name:</label>
          <input
            type="text"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Associated With */}
        <div className="input-group">
          <label>Associated With:</label>
          <input
            type="date"
            name="associatedWith"
            value={formData.associatedWith}
            onChange={handleChange}
            required
          />
        </div>

        <h2>Primary Contact Person Information</h2>

        {/* full name */}
        <div className="input-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* email */}
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* phoneNo */}
        <div className="input-group">
          <label>Phone No:</label>
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" onClick={handleSubmit}>Submit</button>
        <button onClick={goToList}>Go Back</button>
      </form>
    </div>
  );
};

export default Groups;
