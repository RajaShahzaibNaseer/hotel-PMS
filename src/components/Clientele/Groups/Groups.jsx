import React, { useState } from "react";
// import "./Groups.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

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
    navigate("/grouplist");
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
      const response = await fetch(`${API_URL}/groups`, {
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
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#1e1e1e] to-[#282c34] text-white">
      <form className="bg-[#222] p-8 rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.3)] w-[320px] text-center" onSubmit={handleSubmit}>
        <h2 className="mb-5 text-xl font-semibold">Group Data</h2>
        <InputField 
          label="Group Name" 
          name="groupName" 
          type="text" 
          value={formData.groupName} 
          onChange={handleChange} 
          required 
        />
        <InputField 
          label="Associated With" 
          name="associatedWith" 
          type="text" 
          value={formData.associatedWith} 
          onChange={handleChange} 
          required 
        />
        <h2 className="mb-5 font-semibold">Primary Contact Person Information</h2>
        <InputField 
          label="Full Name" 
          name="fullName" 
          type="text" 
          value={formData.fullName} 
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

export default Groups;
