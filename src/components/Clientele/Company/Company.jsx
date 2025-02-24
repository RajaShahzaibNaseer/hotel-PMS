import React, { useState } from "react";
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

  const goToList = () => {
    navigate("/companylist")
  }

  const Button = ({text, type, handler}) => (
    <button 
      className="w-[80%] p-[12px] bg-[#6e8efb] text-white border-none rounded-[5px] text-[18px] cursor-pointer 
      transition duration-300 ease-in-out hover:bg-[#5a7dfb] hover:shadow-[0_0_12px_rgba(110,142,251,0.5)]"
      type={type} 
      onClick={handler}
      >
        {text}
    </button>
  )

  const InputField = ({ label, name, type, value, onChange, required }) => (
    <div className="mb-5 mr-5 text-left">
      <label className="block font-bold mb-1.5 text-[#bbb]">{label}:</label>
      <input
        className="w-full p-[10px] bg-[#333] border border-[#444] rounded-s-md 
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

  return (
    <div className="flex justify-center items-center h-auto bg-gradient-to-br from-[#1e1e1e] to-[#282c34]">
      <form className="bg-[#222] p-8 rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.3)] 
        w-[320px] text-center" 
        onSubmit={handleSubmit}>
        <h2>Company Data</h2>

        <InputField 
          label="Company Name" 
          name="companyName" 
          type="text" 
          value={formData.companyName} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="Registration No" 
          name="registrationNo" 
          type="number" 
          value={formData.registrationNo} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="Tax identification number" 
          name="taxIdentificationNo" 
          type="number" 
          value={formData.taxIdentificationNo} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="Business type" 
          name="businessType" 
          type="text" 
          value={formData.businessType} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="Office Phone No" 
          name="officePhoneNo" 
          type="tel" 
          value={formData.officePhoneNo} 
          onChange={handleChange} 
          required 
        />

        <InputField 
          label="office Email" 
          name="officeEmail" 
          type="email" 
          value={formData.officeEmail} 
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
          label="Billing Address" 
          name="billingAddress" 
          type="text" 
          value={formData.billingAddress} 
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

        <h2>Primay contact person information</h2>

        <InputField 
          label="Full Name" 
          name="fullName" 
          type="text" 
          value={formData.fullName} 
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

        <InputField 
          label="Email" 
          name="email" 
          type="email" 
          value={formData.email} 
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

        <Button type={'submit'} text={'Submit'} handler={handleSubmit} />
        <Button type={'button'} text={'Go Back'} handler={goToList} />

      </form>
    </div>
  );
};

export default Company;
