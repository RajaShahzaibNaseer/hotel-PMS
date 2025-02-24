import React, { useState } from "react";
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
    navigate("/agentlist");
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
    <div className="flex justify-center items-center bg-gradient-to-br from-[#1e1e1e] to-[#282c34] text-white">
      <form className="bg-[#222] p-8 rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.3)] 
        w-[320px] text-center" 
        onSubmit={handleSubmit}>
        <h2>Agent Data</h2>

        <InputField 
          label="Agency Name" 
          name="agencyName" 
          type="text" 
          value={formData.agencyName} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="Agency Full Name" 
          name="agentFullName" 
          type="text" 
          value={formData.agentFullName} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="Registration No" 
          name="registrationNo" 
          type="text" 
          value={formData.registrationNo} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="Tax Identification Number" 
          name="taxIdentificationNo" 
          type="text" 
          value={formData.taxIdentificationNo} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="Physical Address" 
          name="physicalAddress" 
          type="text" 
          value={formData.physicalAddress} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="Agent Phone No" 
          name="agencyPhoneNo" 
          type="tel" 
          value={formData.agencyPhoneNo} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="Agent Email" 
          name="agencyEmail" 
          type="email" 
          value={formData.agencyEmail} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="Website" 
          name="website" 
          type="text" 
          value={formData.website} 
          onChange={handleChange} 
          required 
        />

        <h2>Primary Contact Person Information</h2>

        <InputField 
          label="Full Name" 
          name="fullName" 
          type="text" 
          value={formData.fullName} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="Designation" 
          name="designation" 
          type="text" 
          value={formData.designation} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="Email" 
          name="email" 
          type="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="Phone No" 
          name="phoneNo" 
          type="tel" 
          value={formData.phoneNo} 
          onChange={handleChange} 
          required 
        />

        <Button text={'Submit'} type={'submit'} handler={handleSubmit} />
        <Button text={'Go Back'} type={'button'} handler={goToList} />

      </form>
    </div>
  );
};

const InputField = ({ label, name, type, value, onChange, required }) => (
  <div className="mb-5 text-left">
    <label className="block font-bold mb-[5px] text-[#bbb]">{label}:</label>
    <input
      className="w-full p-[10px] bg-[#333] border border-[#444] rounded-[5px] text-white text-[16px] outline-none transition duration-300 focus:border-[#6e8efb] focus:shadow-[0_0_8px_rgba(110,142,251,0.6)]"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

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

export default Agents;
