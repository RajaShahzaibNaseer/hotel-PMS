import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm"; 
import AdminPage from "./components/AdminPage/AdminPage"; 
import Departments from "./components/HotelSystem/Departments";
import ConferenceRooms from "./components/HotelSystem/ConferenceRooms";
import Blocks from './components/HotelSystem/Blocks'
import Floors from "./components/HotelSystem/Floors";
import MealPlans from "./components/HotelSystem/MealPlans";
import PaxRates from "./components/HotelSystem/PaxRates";
import AuxServices from "./components/HotelSystem/AuxServices";
import JobTitles from "./components/HotelSystem/JobTitles";
import Guests from "./components/Clientele/Guests/Guests";
import Rooms from "./components/HotelSystem/Rooms";
import RoomTypes from "./components/HotelSystem/RoomTypes";
import Navigator from "./components/Navigator/Navigator";
import ClientList from "./components/Clientele/Clientele-List/Client-List";
import Company from "./components/Clientele/Company/Company";
import Agents from "./components/Clientele/Agents/Agents";
import Groups from "./components/Clientele/Groups/Groups";
import ShowGuests from "./components/Clientele/Guests/ShowGuests";
import ShowCompany from "./components/Clientele/Company/ShowCompany";
import ShowAgents from "./components/Clientele/Agents/ShowAgents";
import ShowGroups from "./components/Clientele/Groups/ShowGroups";

import Inventory from "./components/Inventory/Inventory";
import StockOnHand from "./components/Inventory/StockOnHand";
import PurchaseOrders from "./components/Inventory/PurchaseOrders";
import StockRequests from "./components/Inventory/StockRequests";
import StockTransfer from "./components/Inventory/StockTransfer";
import StockTakes from "./components/Inventory/StockTakes";
import ViewConsignment from "./components/Inventory/ViewConsignment";

import Setup from "./components/Inventory/Setup";
import Items from "./components/Inventory/SetupPages/Items";
import FinishedGoods from "./components/Inventory/SetupPages/FinishedGoods";
import Ingredients from "./components/Inventory/SetupPages/Ingredients";
import Recipes from "./components/Inventory/SetupPages/Recipes";
import Menu from "./components/Inventory/SetupPages/Menu";

import Settings from "./components/Inventory/SetupPages/InventorySettings";
import Suppliers from "./components/Inventory/SetupPages/Suppliers";
import Measurements from "./components/Inventory/SetupPages/Measurements";
import Categories from "./components/Inventory/SetupPages/Categories";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />  
      <Route path="/groups" element={<Groups />} />  
      <Route path="/agents" element= {<Agents />} />  
      <Route path="/company" element={<Company />} />  
      <Route path="/clientlist" element={<ClientList />} />  
      <Route path="/navigator" element={<Navigator />} />  
      
      <Route path="/admin" element={<AdminPage />} />  
      <Route path="/departments" element= {<Departments />} />  
      <Route path="/conferenceRooms" element={<ConferenceRooms />} />  
      <Route path="/blocks" element={<Blocks />} />  
      <Route path="/floors" element={<Floors />} />  
      <Route path="/mealplanrates" element={<MealPlans />} />  
      <Route path="/paxrates" element={<PaxRates />} />
      <Route path="/services" element={<AuxServices />} />
      <Route path="/jobs" element ={<JobTitles />} />  
      <Route path="/guests" element = {<Guests />} />  
      <Route path="/rooms" element = {<Rooms />} />  
      <Route path="/roomtypes" element = {<RoomTypes />} />  

      <Route path="/guestlist" element = {<ShowGuests />} />  
      <Route path="/companylist" element = {<ShowCompany />} />  
      <Route path="/agentlist" element ={<ShowAgents />} />  
      <Route path="/grouplist" element={<ShowGroups />} />  

      <Route path="/inventory" element={<Inventory />} />

      <Route path="/stock_on_hand" element={<StockOnHand />} /> - Integrated
      <Route path="/view_consignment" element={<ViewConsignment />} />

      <Route path="/stock_requests" element={<StockRequests />} /> - Integrated
      <Route path="/stock_transfer" element={<StockTransfer />} /> - Integrated (Ambiguous Button Function)
      <Route path="/stock_takes" element={<StockTakes />} /> - Integrated (Ambiguous Functionality)
      <Route path="/purchase_orders" element={<PurchaseOrders />} /> - Integrated

      <Route path="/setup" element={<Setup />} />
      <Route path="/recipes" element={<Recipes />} /> - Integrated
      <Route path="/menu" element={<Menu/>} /> - Integrated
      <Route path="/ingredients" element={<Ingredients />} /> - Integrated
      <Route path="/finished_goods" element={<FinishedGoods />} /> - Integrated
      <Route path="/suppliers" element={<Suppliers />} /> - Integrated
      <Route path="/settings" element={<Settings />} /> - Integrated
      <Route path="/measurement_units" element={<Measurements />} /> - Integrated
      <Route path="/categories" element={<Categories/>} /> - Integrated
      <Route path="/items" element={<Items></Items>} /> - Integrated
    </Routes>
  );
};

export default App;
