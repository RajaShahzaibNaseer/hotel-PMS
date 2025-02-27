import React, { useState } from "react";
// import "./Client-List.css"; // Import the dark theme CSS
import { useNavigate } from "react-router-dom";

const ClientList = () => {
  const navigate = useNavigate();

  const goToGuest = () => {
    navigate("/guestlist")
  };

  const goToCompany = () => {
    navigate("/companylist")
  };
  
  const goToAgents = () => {
    navigate("/agentlist")
  };

  const goToGroups = () => {
    navigate("/grouplist")
  };

  const goToMain = () =>
  {
    navigate("/navigator")
  }

  const Button = ({text, type, url}) => {
    const navigate = useNavigate();

    return (
      <button 
        className="w-4/5 p-3 mb-5 bg-[#6e8efb] text-white border-none rounded-[5px] text-[18px] cursor-pointer 
        transition duration-300 ease-in-out hover:bg-[#5a7dfb] hover:shadow-[0_0_12px_rgba(110,142,251,0.5)]"
        type={type} 
        onClick={() => {navigate(`${url}`)}}
        >
          {text}
      </button>
  )}

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1e1e1e] to-[#282c34] text-white">
      <div className="bg-[#222] p-8 rounded-s-md shadow-[0_5px_15px_rgba(0,0,0,0.3)] w-[320px] text-center" >
        <h2 className="mb-4 text-xl">Navigator</h2>
        <Button text={'Guest List'} type={'button'} url={"/guestlist"} />
        <Button text={'Company List'} type={'button'} url={"/companylist"} />
        <Button text={'Agents List'} type={'button'} url={"/agentlist"} />
        <Button text={'Groups List'} type={'button'} url={"/grouplist"} />
        <Button text={'Main Menu'} type={'button'} url={"/navigator"} />        
      </div>
    </div>
  );
};

export default ClientList;
