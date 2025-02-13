import React, { useState } from "react";
import "./Company.css"; // Import the dark theme CSS
import { useNavigate } from "react-router-dom";

const Company = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    registrationNo: "",
    taxIdentificationNo: "",
    businessType: "",
    physicalAddress: "",
    billingAddress: "",
    officePhoneNo: "",
    officeEmail: "",
    website: "",
    fullName: "",
    designation: "",
    email: "",
    phoneNo: ""
    });

  const navigate = useNavigate();

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
      const response = await fetch("http://localhost:5000/company", {
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
    <div className="company-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Company Data</h2>

        {/* Company Name */}
        <div className="input-group">
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>

        {/* registration no */}
        <div className="input-group">
          <label>Registration no:</label>
          <input
            type="number"
            name="registrationNo"
            value={formData.registrationNo}
            onChange={handleChange}
            required
          />
        </div>

        {/* tax identification number */}
        <div className="input-group">
          <label>Tax identification number:</label>
          <input
            type="number"
            name="taxIdentificationNo"
            value={formData.taxIdentificationNo}
            onChange={handleChange}
            required
          />
        </div>

        {/* Business Type */}
        <div className="input-group">
          <label>Business type:</label>
          <input
            type="text"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            required
          />
        </div>

        {/* office phone no */}
        <div className="input-group">
          <label>Office phone No:</label>
          <input
            type="tel"
            name="officePhoneNo"
            value={formData.officePhoneNo}
            onChange={handleChange}
            required
          />
        </div>

        {/* office Email */}
        <div className="input-group">
          <label>office Email:</label>
          <input
            type="email"
            name="officeEmail"
            value={formData.officeEmail}
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

        {/* billing Address */}
        <div className="input-group">
          <label>Billing Address:</label>
          <input
            type="text"
            name="billingAddress"
            value={formData.billingAddress}
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

        <h2>Primay contact person information</h2>
        {/* full Name */}
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

        {/*Phone Number */}
        <div className="input-group">
          <label> Phone No:</label>
          <input
            type="tel"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />
        </div>

        {/* email  */}
        <div className="input-group">
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* designation */}
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
        <button type="submit" onClick={handleSubmit}>Submit</button>
        <button onClick={() => navigate("/companylist")}>Go back</button>
      </form>
    </div>
  );
};

export default Company;
