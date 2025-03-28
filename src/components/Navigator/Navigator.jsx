import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navigator = () => {
  
  const navigate = useNavigate();

  const goTo = (location) => () => {
    navigate(location);
  };
  
  const Button = ({text, type, handler}) => (
    <button 
      className="w-4/5 p-3 mb-5 bg-[#6e8efb] text-white border-none rounded-[5px] text-[18px] cursor-pointer 
      transition duration-300 ease-in-out hover:bg-[#5a7dfb] hover:shadow-[0_0_12px_rgba(110,142,251,0.5)]"
      type={type} 
      onClick={handler}
      >
        {text}
    </button>
  )

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1e1e1e] to-[#282c34] text-white">
      <div className="bg-[#222] p-8 rounded-s-md shadow-[0_5px_15px_rgba(0,0,0,0.3)] w-[320px] text-center" >
        <h2 className="mb-4 text-xl">Navigator</h2>
        <Button text={'Hotel System'} type={'button'} handler={goTo('/admin')} />
        <Button text={'Clientele Management'} type={'button'} handler={goTo('/clientlist')} />
        <Button text={'Inventory'} type={'button'} handler={goTo('/inventory')} />
      </div>
    </div>
  );
};

export default Navigator;
