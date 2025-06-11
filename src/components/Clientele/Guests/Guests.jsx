import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

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


  const goToList = () => {
    navigate("/guestlist");
  }

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/guests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), 
      });
    
      const data = await response.json();
      console.log("Server Response:", data);
      navigate("/guestlist");
    } catch (error) {
      console.error("Error:", error.message);
    }
    
  };

  

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-[#1e1e1e] to-[#282c34] text-white">
      <form className="bg-[#222] p-8 rounded-s-md shadow-[0_5px_15px_rgba(0,0,0,0.3)] w-[320px] text-center" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-10 ">Guest Data</h1>

        <InputField label={"Full Name"} type={'text'} name={'fullName'} value={formData.fullName} onChange={handleChange} required />
        <InputField label={"Date of Birth"} type={'date'} name={'dateOfBirth'} value={formData.dateOfBirth} onChange={handleChange} required />

        
        {/* Gender Selection */}
        <div className="mb-5 mr-5 text-left">
          <label className="block font-bold mb-1.5 text-[#bbb]">Gender:</label>
          <div className="flex gap-4">
            {["Male", "Female", "Other"].map((option) => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={formData.gender === option}
                  onChange={handleChange}
                  required
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>


        <InputField label={"Nationality"} type={'text'} name={'nationality'} value={formData.nationality} onChange={handleChange} required />
        <InputField label={"Identification No"} type={'text'} name={'identificationNo'} value={formData.identificationNo} onChange={handleChange} required />
        <InputField label={"Expiry Date"} type={'date'} name={'expiryDate'} value={formData.expiryDate} onChange={handleChange} required />
        <InputField label={"Phone No"} type={'tel'} name={'phoneNo'} value={formData.phoneNo} onChange={handleChange} required />
        <InputField label={"Email"} type={'email'} name={'email'} value={formData.email} onChange={handleChange} required />
        <InputField label={"Residential Address"} type={'text'} name={'residentialAddress'} value={formData.residentialAddress} onChange={handleChange} required />
        <InputField label={"Emergency Contact Name"} type={'text'} name={'emergencyContact'} value={formData.emergencyContact} onChange={handleChange} required />
        <InputField label={"Emergency Phone No"} type={'tel'} name={'emergencyPhone'} value={formData.emergencyPhone} onChange={handleChange} required />
        <InputField label={"Emergency Relationship"} type={'text'} name={'emergencyRelationship'} value={formData.emergencyRelationship} onChange={handleChange} required />
        <InputField label={"Preferred Room Type"} type={'text'} name={'preferredRoomType'} value={formData.preferredRoomType} onChange={handleChange} required />
        <InputField label={"Preferred Meal Plan"} type={'text'} name={'preferredMealPlan'} value={formData.preferredMealPlan} onChange={handleChange} required />
        <InputField label={"Special Needs"} type={'text'} name={'specialNeeds'} value={formData.specialNeeds} onChange={handleChange} />
        <InputField label={"Previous Stays"} type={'text'} name={'previousStays'} value={formData.previousStays} onChange={handleChange} />
        <InputField label={"Loyalty Program"} type={'text'} name={'loyaltyProgram'} value={formData.loyaltyProgram} onChange={handleChange} />
        <InputField label={"Association"} type={'text'} name={'association'} value={formData.association} onChange={handleChange} />

        <Button text={'Submit'} type={'submit'} handler={handleSubmit} />
        <Button text={'Go Back'} type={'button'} handler={goToList} />
      </form>
    </div>
  );
};

const Button = ({text, type, handler}) => (
  <button 
    className="w-full p-[12px] my-2 bg-[#6e8efb] text-white border-none rounded-[5px] text-[18px] cursor-pointer 
    transition duration-300 ease-in-out hover:bg-[#5a7dfb] hover:shadow-[0_0_12px_rgba(110,142,251,0.5)]"
    type={type} 
    onClick={handler}
    >
      {text}
  </button>
)

const InputField = ({ label, name, type, value, onChange, required }) => (
  <div className="mb-5 text-left text-white">
    <label className="block font-bold mb-1.5 text-[#bbb]">{label}:</label>
    <input
      className="w-full p-2.5 bg-[#333] border border-[#444] rounded-md 
      text-white text-[16px] outline-none transition duration-300 focus:border-[#6e8efb] 
      focus:shadow-[0_0_8px_rgba(110,142,251,0.6)]"

      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default Guests;
