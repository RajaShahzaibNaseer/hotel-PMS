import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";  // Import LoginForm component
import AdminPage from "./components/AdminPage/AdminPage";  // Import AdminPage component
import Departments from "./components/DB-pages//Departments/Departments";
import ConferenceRooms from "./components/DB-pages/ConferenceRooms/ConferenceRooms";
import Floors from "./components/DB-pages/Floors/Floors";
import MealPlans from "./components/DB-pages/MealPlans/MealPlans";
import PaxRates from "./components/DB-pages/PaxRates/PaxRates";
import AuxServices from "./components/DB-pages/AuxServices/AuxServices";
import JobTitles from "./components/DB-pages/JobTitles/JobTitles";
import Guests from "./components/DB-pages/Guests/Guests";
import Rooms from "./components/DB-pages/Rooms/Rooms";
import RoomTypes from "./components/DB-pages/RoomTypes/RoomTypes";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} /> {/* Route for LoginForm */}
      <Route path="/admin" element={<AdminPage />} /> {/* Route for AdminPage */}
      <Route path="/departments" element= {<Departments />} />
      <Route path="/conferenceRooms" element={<ConferenceRooms />} />
      <Route path="/floors" element={<Floors />} />
      <Route path="/mealplanrates" element={<MealPlans/>} />
      <Route path="/paxrates" element={<PaxRates />} />
      <Route path="/services" element={<AuxServices />} />
      <Route path="/jobs" element ={<JobTitles />} />
      <Route path="/guests" element = {<Guests></Guests>} />
      <Route path="/rooms" element = {<Rooms></Rooms>} />
      <Route path="/roomtypes" element = {<RoomTypes></RoomTypes>} />
    </Routes>
  );
};

export default App;
