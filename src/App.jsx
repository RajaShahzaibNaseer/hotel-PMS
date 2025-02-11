import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm"; 
import AdminPage from "./components/AdminPage/AdminPage"; 
import Departments from "./components/HotelSystem//Departments/Departments";
import ConferenceRooms from "./components/HotelSystem/ConferenceRooms/ConferenceRooms";
import Floors from "./components/HotelSystem/Floors/Floors";
import MealPlans from "./components/HotelSystem/MealPlans/MealPlans";
import PaxRates from "./components/HotelSystem/PaxRates/PaxRates";
import AuxServices from "./components/HotelSystem/AuxServices/AuxServices";
import JobTitles from "./components/HotelSystem/JobTitles/JobTitles";
import Guests from "./components/Clientele/Guests/Guests";
import Rooms from "./components/HotelSystem/Rooms/Rooms";
import RoomTypes from "./components/HotelSystem/RoomTypes/RoomTypes";
import Navigator from "./components/Navigator/Navigator";
import ClientList from "./components/Clientele/Clientele-List/Client-List";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/clientlist" element={<ClientList></ClientList>} />
      <Route path="/navigator" element={<Navigator></Navigator>} />
      <Route path="/admin" element={<AdminPage />} />
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
