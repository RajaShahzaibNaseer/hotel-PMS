import React, { useState } from "react";
import "./Guests.css"; // Import the dark theme CSS
import { useNavigate } from "react-router-dom";

const Guests = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    identificationNo: "",
    expiryDate: "",
    phoneNo: "",
    email: "",
    residentialAddress: "",
    emergencyContact: "",
    emergencyPhone: "",
    emergencyRelationship: "",
    preferredRoomType: "",
    preferredMealPlan: "",
    specialNeeds: "",
    previousStays: "",
    loyaltyProgram: "",
    association: "",
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
      const response = await fetch("http://localhost:5000/guests", {
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
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Guest Data</h2>

        {/* Full Name */}
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

        {/* Date of Birth */}
        <div className="input-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        {/* Gender Selection */}
        <div className="input-group">
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              required
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
              required
            />
            Other
          </label>
        </div>

        {/* Nationality */}
        <div className="input-group">
          <label>Nationality:</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            required
          />
        </div>

        {/* Identification Number */}
        <div className="input-group">
          <label>Identification No:</label>
          <input
            type="text"
            name="identificationNo"
            value={formData.identificationNo}
            onChange={handleChange}
            required
          />
        </div>

        {/* Expiry Date */}
        <div className="input-group">
          <label>Expiry Date:</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Phone Number */}
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

        {/* Email */}
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

        {/* Residential Address */}
        <div className="input-group">
          <label>Residential Address:</label>
          <input
            type="text"
            name="residentialAddress"
            value={formData.residentialAddress}
            onChange={handleChange}
            required
          />
        </div>

        {/* Emergency Contact Name */}
        <div className="input-group">
          <label>Emergency Contact:</label>
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            required
          />
        </div>

        {/* Emergency Phone Number */}
        <div className="input-group">
          <label>Emergency Phone No:</label>
          <input
            type="tel"
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Emergency Relationship */}
        <div className="input-group">
          <label>Emergency Relationship:</label>
          <input
            type="text"
            name="emergencyRelationship"
            value={formData.emergencyRelationship}
            onChange={handleChange}
            required
          />
        </div>

        {/* Preferred Room Type */}
        <div className="input-group">
          <label>Preferred Room Type:</label>
          <input
            type="text"
            name="preferredRoomType"
            value={formData.preferredRoomType}
            onChange={handleChange}
            required
          />
        </div>

        {/* Preferred Meal Plan */}
        <div className="input-group">
          <label>Preferred Meal Plan:</label>
          <input
            type="text"
            name="preferredMealPlan"
            value={formData.preferredMealPlan}
            onChange={handleChange}
            required
          />
        </div>

        {/* Special Needs */}
        <div className="input-group">
          <label>Special Needs:</label>
          <input
            type="text"
            name="specialNeeds"
            value={formData.specialNeeds}
            onChange={handleChange}
          />
        </div>

        {/* Previous Stays */}
        <div className="input-group">
          <label>Previous Stays:</label>
          <input
            type="text"
            name="previousStays"
            value={formData.previousStays}
            onChange={handleChange}
          />
        </div>

        {/* Loyalty Program */}
        <div className="input-group">
          <label>Loyalty Program:</label>
          <input
            type="text"
            name="loyaltyProgram"
            value={formData.loyaltyProgram}
            onChange={handleChange}
          />
        </div>

        {/* Association */}
        <div className="input-group">
          <label>Association:</label>
          <input
            type="text"
            name="association"
            value={formData.association}
            onChange={handleChange}
          />
        </div>

        <button type="submit" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
};

export default Guests;
