import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    if(formData.email == "admin@gmail.com" && formData.password =="admin")
    {
      setMessage(`Welcome, Admin`);
      setTimeout(() => {
        navigate("/navigator")
      }, 1000);

    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#1e1e1e] to-[#282c34]">
      <form className="bg-[#222] p-8 rounded-[10px] shadow-[0_5px_15px_rgba(0,0,0,0.3)] w-[320px] text-center" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="mb-5 mr-5 text-left">
          <label className="block font-bold mb-1 text-[#bbb]">Email:</label>
          <input
            className="w-full p-2 bg-[#333] border border-[#444] rounded-md text-white text-lg outline-none transition duration-300 focus:border-[#6e8efb] focus:shadow-[0_0_8px_rgba(110,142,251,0.6)]"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-5 mr-5 text-left">
          <label className="block font-bold mb-1 text-[#bbb]">Password:</label>
          <input
          className="w-full p-2 bg-[#333] border border-[#444] rounded-md text-white text-lg outline-none transition duration-300 focus:border-[#6e8efb] focus:shadow-[0_0_8px_rgba(110,142,251,0.6)]"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button 
          type="submit"
          className="w-4/5 p-3 bg-[#6e8efb] text-white border-none rounded-md text-lg cursor-pointer transition ease-in-out duration-300 hover:bg-[#5a7dfb] hover:shadow-[0_0_12px_rgba(110,142,251,0.5)]"
        >
          Login
        </button>
        <p className="mt-[12px] text-sm font-[#6e8efb]">{message}</p>
      </form>
    </div>
  );
};

export default LoginForm;
