import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm"; 
import AdminPage from "./components/AdminPage/AdminPage"; 
import Departments from "./components/HotelSystem//Departments/Departments";
import ConferenceRooms from "./components/HotelSystem/ConferenceRooms/ConferenceRooms";
import Blocks from './components/HotelSystem/Blocks/Blocks'
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
import Company from "./components/Clientele/Company/Company";
import Agents from "./components/Clientele/Agents/Agents";
import Groups from "./components/Clientele/Groups/Groups";
import ShowGuests from "./components/Clientele/Guests/ShowGuests";
import ShowCompany from "./components/Clientele/Company/ShowCompany";
import ShowAgents from "./components/Clientele/Agents/ShowAgents";
import ShowGroups from "./components/Clientele/Groups/ShowGroups";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} /> // Ported
      <Route path="/groups" element={<Groups />} /> //Ported
      <Route path="/agents" element= {<Agents />} /> //Ported
      <Route path="/company" element={<Company />} /> //Ported
      <Route path="/clientlist" element={<ClientList />} /> //Ported
      <Route path="/navigator" element={<Navigator />} /> //Ported
      
      <Route path="/admin" element={<AdminPage />} /> //Ported
      <Route path="/departments" element= {<Departments />} /> //Ported
      <Route path="/conferenceRooms" element={<ConferenceRooms />} /> //Ported
      <Route path="/blocks" element={<Blocks />} /> //Ported
      <Route path="/floors" element={<Floors />} /> //Ported
      <Route path="/mealplanrates" element={<MealPlans />} /> //Ported
      <Route path="/paxrates" element={<PaxRates />} />
      <Route path="/services" element={<AuxServices />} />
      <Route path="/jobs" element ={<JobTitles />} /> //Ported
      <Route path="/guests" element = {<Guests />} /> //Ported
      <Route path="/rooms" element = {<Rooms />} /> //Ported
      <Route path="/roomtypes" element = {<RoomTypes />} /> //Ported

      <Route path="/guestlist" element = {<ShowGuests />} /> //Ported
      <Route path="/companylist" element = {<ShowCompany />} /> //Ported
      <Route path="/agentlist" element ={<ShowAgents />} /> //Ported
      <Route path="/grouplist" element={<ShowGroups />} /> //Ported
    </Routes>
  );
};

export default App;
