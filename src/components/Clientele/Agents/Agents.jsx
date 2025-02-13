import React, { useState } from "react";
import "./Agents.css";
import { useNavigate } from "react-router-dom";

const Agents = () => {
  const [formData, setFormData] = useState({
    agencyName: "",
    agentFullName: "",
    registrationNo: "",
    taxIdentificationNo: "",
    physicalAddress: "",
    agencyEmail: "",
    agencyPhoneNo: "",
    website: "",
    fullName: "",
    designation: "",
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
    <div className="agent-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Agent Data</h2>

        {/* Agency Name */}
        <div className="input-group">
          <label>Agency Name:</label>
          <input
            type="text"
            name="agencyName"
            value={formData.agencyName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Agent Full Name */}
        <div className="input-group">
          <label>Agent Full Name:</label>
          <input
            type="text"
            name="agentFullName"
            value={formData.agentFullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Registration No */}
        <div className="input-group">
          <label>Registration No:</label>
          <input
            type="text"
            name="registrationNo"
            value={formData.registrationNo}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tax Identification Number */}
        <div className="input-group">
          <label>Tax Identification Number:</label>
          <input
            type="text"
            name="taxIdentificationNo"
            value={formData.taxIdentificationNo}
            onChange={handleChange}
            required
          />
        </div>

        {/* Physical Address */}
        <div className="input-group">
          <label>Physical Address:</label>
          <input
            type="text"
            name="physicalAddress"
            value={formData.physicalAddress}
            onChange={handleChange}
            required
          />
        </div>

        {/* Agent Phone Number */}
        <div className="input-group">
          <label>Agent Phone No:</label>
          <input
            type="tel"
            name="phoneNo"
            value={formData.agencyPhoneNo}
            onChange={handleChange}
            required
          />
        </div>

        {/* agent Email */}
        <div className="input-group">
          <label>Agent Email:</label>
          <input
            type="email"
            name="email"
            value={formData.agencyEmail}
            onChange={handleChange}
            required
          />
        </div>

        {/* website */}
        <div className="input-group">
          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={formData.website}
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

        {/* Designation */}
        <div className="input-group">
          <label>Designation:</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
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

export default Agents;
