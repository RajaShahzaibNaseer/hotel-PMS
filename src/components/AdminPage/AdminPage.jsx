import { useState, useEffect } from "react";
import { toFormData } from "axios";
import { Navigate, useNavigate, Link, Routes, Route } from "react-router-dom";

import Blocks from '../HotelSystem/Blocks/Blocks'
import Floors from "../HotelSystem/Floors/Floors";
import MealPlans from "../HotelSystem/MealPlans/MealPlans";
import PaxRates from "../HotelSystem/PaxRates/PaxRates";
import AuxServices from "../HotelSystem/AuxServices/AuxServices";
import JobTitles from "../HotelSystem/JobTitles/JobTitles";
import Departments from "../HotelSystem/Departments/Departments";
import Guests from "../Clientele/Guests/Guests";
import Rooms from "../HotelSystem/Rooms/Rooms";
import RoomTypes from "../HotelSystem/RoomTypes/RoomTypes";
import ConferenceRooms from "../HotelSystem/ConferenceRooms/ConferenceRooms";

const AdminPage = () => {
  
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState(<Blocks />);

  const updatePage = (component) => {
    setSelectedPage(component)
  }
  const routes = [
    { title: "Blocks", url: "/blocks", component: <Blocks /> },
    { title: "Floors", url: "/floors", component: <Floors /> },
    { title: "Rooms", url: "/rooms", component: <Rooms /> },
    { title: "Room Types", url: "/roomtypes", component: <RoomTypes /> },
    { title: "Conference Rooms", url: "/conferenceRooms", component: <ConferenceRooms /> },
    { title: "Departments", url: "/departments", component: <Departments /> },
    { title: "Jobs", url: "/jobs", component: <JobTitles /> },
    { title: "Auxiliary Services", url: "/services", component: <AuxServices /> },
    { title: "Meal Plan Rates", url: "/mealplanrates", component: <MealPlans /> },
    { title: "Pax Rates", url: "/paxrates", component: <PaxRates /> },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <nav className="w-64 p-5 flex flex-col items-center border-r border-gray-700 bg-gray-900 shadow-lg">
        <h2 className="mb-5 text-xl font-semibold">Welcome, Admin</h2>
        
        <hr className="border-gray-700 w-full my-4" />
        
        {/* Navigation Buttons */}
        <div>
          {routes.map(({ title, component }) => (
            <button
              key={title}
              className="w-full mt-2 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-white font-medium transition"
              onClick={() => updatePage(component)}
            >
              {title}
            </button>
          ))}
          <button 
            className="w-full mt-2 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-white font-medium transition"
            onClick={() => navigate('/navigator')}
            >
                Go Back
          </button>
        </div>
      </nav>
      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {selectedPage}
      </div>
      
    </div>
  );
};

export default AdminPage;